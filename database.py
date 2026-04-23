import sqlite3
import os
DB_NAME = "studyplanner.db"
def get_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn
def init_db():
    conn = get_connection()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS subjects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT NOT NULL,
            subject TEXT NOT NULL,
            pages_today INTEGER NOT NULL,
            difficulty TEXT NOT NULL,
            priority TEXT NOT NULL
    )
    """)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS analytics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            event TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
    )
    """)
    conn.commit()
    conn.close()
def track_event(event_name):
    conn = get_connection()
    conn.execute(
        "INSERT INTO analytics (event) VALUES (?)",
        (event_name,)
    )
    conn.commit()
    conn.close()
