from flask import Flask, render_template, request
from planner import calculate_daily_study
app = Flask(__name__)
@app.route("/", methods=["GET", "POST"])
def home():
    plan = []
    if request.method == "POST":
        subject = request.form.get("subject")
        pages = int(request.form.get("pages"))
        days = int(request.form.get("days"))
        difficulty = request.form.get("difficulty")
        pages_today = calculate_daily_study(pages, days)
        plan.append({
        "subject": subject,
        "pages_today": pages_today,
        })
    return render_template("index.html", plan=plan)
if __name__ == "__main__":
    app.run(debug=True)
