from flask import Flask, render_template, request, send_file, redirect, url_for
from planner import calculate_daily_study, calculate_priority
from pdf_export import export_plan_to_pdf
import uuid
from database import init_db, get_connection, track_event
app = Flask(__name__)
init_db()
@app.route("/", methods=["GET", "POST"])
def home():
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
            conn.execute(
                """
                INSERT INTO subjects (subject, pages_today, difficulty, priority)
                VALUES (?, ?, ?, ?)
                """, 
                (subject, pages_today, difficulty, priority)
            )
            conn.commit()
            track_event("add_subject")
            conn.close()
            return redirect(url_for("home"))
    conn = get_connection()
    subjects = conn.execute("SELECT * FROM subjects").fetchall()
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
    track_event("delete_subject")
    conn.close()
    return redirect("/")
@app.route("/download")
def download():
    conn = get_connection()
    subjects = conn.execute("SELECT * FROM subjects"). fetchall()
    conn.close
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
        "SELECT COUNT(*) FROM analytics WHWRE event = ' delete_subject'"
    ). fetchone()[0]
    total_downloads = conn.execute(
        "SELECT COUNT(*) FROM analytics WHERE event = 'download_pdf'"
    ). fetchone()[0]
    conn.close()
    return render_template(
        "analytics.html",
        visits=total_visits,
        adds=total_adds,
        delete=total_downloads,
        download=total_downloads
    )
if __name__ == "__main__":
    app.run(debug=True)
