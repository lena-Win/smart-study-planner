from flask import Flask, render_template, request, send_file
from planner import calculate_daily_study, calculate_priority
from pdf_export import export_plan_to_pdf
app = Flask(__name__)
subjects = []
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
    return render_template("index.html", plan=sorted_subjects)
@app.route("/download")
def download():
    pdf_file = export_plan_to_pdf(subjects)
    return send_file(pdf_file, as_attachment=True)
if __name__ == "__main__":
    app.run(debug=True)
