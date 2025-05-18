from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext
from pydantic import BaseModel
from database import user_database, course_database
from models.models import Base,User, Course, History
import os
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from transformers import AutoModelForCausalLM, AutoTokenizer
from sentence_transformers import SentenceTransformer, util
import torch

app = FastAPI()
latest_result = None


class InputText(BaseModel):
    text: str 

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],                                                                                                                                                    
    allow_methods=["*"],
    allow_headers=["*"],                                                                                                                                            
)



Base.metadata.create_all(bind=user_database.user_engine)
Base.metadata.create_all(bind=course_database.course_engine)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserHistory(BaseModel):
    user_id: str
    query: str
    response: str


# @app.post("/signup/")
# def create_user(user: UserCreate, db: Session = Depends(user_database.get_db)):
#     try:
#         db_user = db.query(User).filter(User.email == user.email).first()
#         if db_user:
#             raise HTTPException(status_code=400, detail="Email already registered")

#         hashed_password = get_password_hash(user.password)
#         new_user = User(
#             username=user.username,
#             email=user.email,

#             hashed_password=hashed_password
#         )
#         db.add(new_user)
#         db.commit()
#         db.refresh(new_user)

#         return {"message": "User created successfully"}

#     except Exception as e:
#         print("Signup error:", e)
#         raise HTTPException(status_code=500, detail=str(e))

@app.post("/signup/")
def create_user(user: UserCreate, db: Session = Depends(user_database.get_db)):
    try:
        print("Signup request received for:", user.email)

        db_user = db.query(User).filter(User.email == user.email).first()
        if db_user:
            print("Email already registered")
            raise HTTPException(status_code=400, detail="Email already registered")

        hashed_password = get_password_hash(user.password)
        new_user = User(
            username=user.username,
            email=user.email,
            hashed_password=hashed_password
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        print("User created successfully:", new_user.email)
        return {"message": "User created successfully"}

    except Exception as e:
        print("Signup error:", e)
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/login/")
def login(user: UserLogin, db: Session = Depends(user_database.get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found") 

    if not pwd_context.verify(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid password")  

    return {"message": "Login successful"}


bert_model_name = "/home/amazon/fine_tuned_bge_m3_coursera"
bert_model = SentenceTransformer(bert_model_name)

qwen_model_name = "Qwen/Qwen2.5-14B-Instruct"
qwen_tokenizer = AutoTokenizer.from_pretrained(qwen_model_name, trust_remote_code=True)
qwen_model = AutoModelForCausalLM.from_pretrained(
    qwen_model_name,
    device_map="auto",
    load_in_8bit=True,  
    torch_dtype=torch.float16
)

difficulty = ["Beginner", "Intermediate", "Advanced"]

def fetch_courses_from_db(db: Session):
    courses = db.query(Course).all()
    return [course.course_title for course in courses]

def extract_course_info(user_input, db: Session):
    course_names = fetch_courses_from_db(db)

    device = "cuda" if torch.cuda.is_available() else "cpu"

    user_embedding = bert_model.encode(user_input, convert_to_tensor=True).to(device)
    course_embeddings = bert_model.encode(course_names, convert_to_tensor=True).to(device)
    difficulty_embeddings = bert_model.encode(difficulty, convert_to_tensor=True).to(device)

    best_course = course_names[util.pytorch_cos_sim(user_embedding, course_embeddings).argmax()]
    best_difficulty = difficulty[util.pytorch_cos_sim(user_embedding, difficulty_embeddings).argmax()]
    
    return best_difficulty, best_course


def save_history(data:UserHistory, db:Session):
        info = History(user_id=data.user_id, query=data.query)
        db.add(info)
        db.commit()
        db.refresh(info)


@app.get("/")
def home():
    return {"message": "BERT → PostgreSQL → Qwen-14B (8-bit) API Running"}

@app.post("/output/")
def recommend_course(input_data: InputText, db: Session = Depends(course_database.get_db)):
    difficulty, course = extract_course_info(input_data.text, db)

    prompt = (f"The user wants a course related to '{input_data.text}'. Based on analysis, "
              f"recommend the best course: '{course}' (Difficulty: {difficulty}). "
              f"Explain why this course is a good fit.")

    qwen_input = qwen_tokenizer(prompt, return_tensors="pt").input_ids.to("cuda" if torch.cuda.is_available() else "cpu")
    qwen_output = qwen_model.generate(qwen_input, max_new_tokens=150)
    qwen_response = qwen_tokenizer.decode(qwen_output[0], skip_special_tokens=True)

    result = {
        "recommended_course": course,
        "difficulty_level": difficulty,
        "llm_reasoning": qwen_response
    }
    global latest_result
    latest_result = result  

    return result

@app.get("/output/")
def output():
    if not latest_result:
        return {"error": "No recommendation generated yet."}
    return latest_result

