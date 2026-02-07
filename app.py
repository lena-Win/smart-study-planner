from flask import Flask
from planner import calculate_daily_study
app = Flask(__name__)
@app.route("/")
def home():
    return "Smart Study Planner works"
@app.route("/plan/<int:pages>/<int:days>")
def plan(pages, days):
    result = calculate_daily_study(pages, days)
    return f"Learn: {result} pages per day"
if __name__ == "__main__":
    app.run(debug=True)
