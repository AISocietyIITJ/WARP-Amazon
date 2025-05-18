from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = 'postgresql://postgres:warp@localhost/reactdb'

user_engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=user_engine)

Base = declarative_base() 

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
