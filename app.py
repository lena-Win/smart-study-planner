from flask import Flask, render_template, request, send_file
from planner import calculate_daily_study, calculate_priority
from pdf_export import export_plan_to_pdf
from storage import load_subjects, save_subjects
app = Flask(__name__)
subjects = load_subjects()
@app.route("/", methods=["GET", "POST"])
def home():
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
            subjects.append({
                "subject": subject,
                "pages_today": pages_today,
                "difficulty": difficulty,
                "priority": priority

            })
            save_subjects(subjects)
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
@app.route("/download")
def download():
    pdf_file = export_plan_to_pdf(subjects)
    return send_file(pdf_file, as_attachment=True)
if __name__ == "__main__":
    app.run(debug=True)
