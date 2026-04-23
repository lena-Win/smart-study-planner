from flask import Flask, render_template, request, send_file, redirect, url_for, session
from planner import calculate_daily_study, calculate_priority
from pdf_export import export_plan_to_pdf
import uuid
from database import init_db, get_connection, track_event
from werkzeug.security import generate_password_hash, check_password_hash
app = Flask(__name__)
app.secret_key = "supersecretkey444"
init_db()
@app.route("/", methods=["GET", "POST"])
def home():
    if "user_id" not in session:
        return redirect("/login")
    track_event("page_visit")
    if request.method == "POST":
        subject = request.form.get("subject")
        pages = request.form.get("pages")
        days = request.form.get("days")
        difficulty = request.form.get("difficulty")
        if subject and pages and days:
            pages = int(pages)
            days = int(days)
            pages_today = calculate_daily_study(pages, days)
            priority = calculate_priority(days)
            conn = get_connection()
            conn.execute("""
                INSERT INTO subjects (user_id, subject, pages_today, difficulty, priority)
                VALUES (?, ?, ?, ?, ?)
                """, (
                    session["user_id"],
                    subject, 
                    pages_today, 
                    difficulty, 
                    priority
            ))
            conn.commit()
            conn.close()
            track_event("add_subject")
            return redirect(url_for("home"))
    conn = get_connection()
    subjects = conn.execute("SELECT * FROM subjects WHERE user_id = ?").fetchall()
    conn.close()
    priority_order = {
        "HIGH": 3,
        "MEDIUM": 2,
        "LOW": 1
    }
    sorted_subjects = sorted(
        subjects,
        key=lambda x: (priority_order[x["priority"]], x["pages_today"]),
        reverse=True
    )
    total_subjects = len(subjects)
    total_pages_today = sum(s["pages_today"] for s in subjects)
    high_priority_count = sum(
        1 for s in subjects if s ["priority"] == "HIGH"
    )
    return render_template(
        "index.html", 
        plan=sorted_subjects,
        total_subjects=total_subjects,
        total_pages_today=total_pages_today,
        high_priority_count=high_priority_count
    )
@app.route("/delete/<int:item_id>")
def delete(item_id):
    conn = get_connection()
    conn.execute("DELETE FROM subjects WHERE id = ?", (item_id,))
    conn.commit()
    conn.close()
    track_event("delete_subject")
    return redirect("/")
@app.route("/download")
def download():
    conn = get_connection()
    subjects = conn.execute("SELECT * FROM subjects WHERE user_id = ?"). fetchall()
    conn.close()
    pdf_file = export_plan_to_pdf(subjects)
    track_event("download_pdf")
    return send_file(pdf_file, as_attachment=True)
@app.route("/analytics")
def analytics():
    conn = get_connection()
    total_visits = conn.execute(
        "SELECT COUNT(*) FROM analytics WHERE event = 'page_visit'"
    ). fetchone()[0]
    total_adds = conn.execute(
        "SELECT COUNT(*) FROM analytics WHERE event = 'add_subject'"
    ). fetchone()[0]
    total_deletes = conn.execute(
        "SELECT COUNT(*) FROM analytics WHERE event = 'delete_subject'"
    ). fetchone()[0]
    total_downloads = conn.execute(
        "SELECT COUNT(*) FROM analytics WHERE event = 'download_pdf'"
    ). fetchone()[0]
    conn.close()
    return render_template(
        "analytics.html",
        visits=total_visits,
        adds=total_adds,
        deletes=total_deletes,
        downloads=total_downloads
    )
@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        hashed = generate_password_hash(password)
        conn = get_connection()
        try:
            conn.execute(
                "INSERT INTO users (username, password) VALUES (?, ?)",
                (username, hashed)
            )
            conn.commit()
        except:
            return "User already exists"
    return render_template("register.html")
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        conn = get_connection()
        user = conn.execute(
            "SELECT *FROM users WHERE username = ?",
            (username,)
        ).fetchone()
        conn.close()
        if user and check_password_hash(user["password"], password):
            session["user_id"] = user["id"]
            session["username"] = user["username"]
            return redirect("/")
        return "Inwalid login"
    return render_template("login.html")
@app.route("/logout")
def logout():
    session.clear()
    return redirect("/login")
if __name__ == "__main__":
    app.run(debug=True)
