from fastapi import FastAPI
import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

app = FastAPI()

course_engine = create_engine("postgresql://postgres:warp@localhost/reactdb")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=course_engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

df = pd.read_csv(
    "/home/amazon/dataset/coursera_courses.csv",
    on_bad_lines="skip",
    encoding="utf-8"
)

df = df.dropna(subset=["course_title", "course_description", "course_difficulty"])

df = df[["course_title", "course_description", "course_difficulty"]].reset_index(drop=True)

df['id'] = range(1, len(df) + 1)

df = df[['id', 'course_title', 'course_description', 'course_difficulty']]
table_name = "sqlcourses"
df.to_sql(table_name, course_engine, if_exists="replace", index=False)
