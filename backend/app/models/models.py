from fastapi import FastAPI
import pandas as pd
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base

app = FastAPI()

engine = create_engine("postgresql://postgres:warp@localhost/reactdb")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "sqlusers"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)

class Course(Base):
    __tablename__ = "sqlcourses"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    course_title = Column(String, index=True, nullable=False)
    course_difficulty = Column(String, index=True, nullable=False)
    course_description = Column(String, unique=True, index=True, nullable=False)

class History(Base):
    __tablename__ = "userhistory"
    user_id = Column(Integer, ForeignKey('sqlusers.id'),index=True,nullable=False)
    query_id = Column(Integer,primary_key=True,index=True,autoincrement=True)
    query = Column(String,index=True, nullable=False)
