import sqlite3
import os
DB_NAME = "studyplanner.db"
def get_connection():
    print("DB PATH:", os.path.abspath(DB_NAME))
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn
def init_db():
    conn = get_connection()
    print("Creating table...")
    conn.execute("""
     CREATE TABLE IF NOT EXISTS subjects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject TEXT NOT NULL,
        pages_today INTEGER NOT NULL,
        difficulty TEXT NOT NULL,
        priority TEXT NOT NULL
    )
    """)
    conn.commit()
    conn.close()
    print("Table ready")