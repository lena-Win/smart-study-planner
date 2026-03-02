from planner import create_study_plan, generate_schedule_with_dates
from storage import save_plan
pages = int(input("Enter total number of pages to study: "))
days = int(input("Enter number of days available: "))
plan = create_study_plan(pages, days)
schedule = generate_schedule_with_dates(plan["total_pages"], plan["days"])
print("Daily study schedule:")
for day in schedule:
    print(day["date"], ":", day["pages"], "pages")
plan["schedule"] = schedule
save_plan("study_plan.json", plan)
print("Study plan saved to study_plan.json")
exams = [
    {"subject": "Biology", "pages": 120, "days_left": 10},
    {"subject": "Math", "pages": 80, "days_left": 20},
    {"subject": "CS", "pages": 60, "days_left": 30}
]
from planner import build_exam_plans
exam_plans = build_exam_plans(exams)
print("Exam overview:")
for exam in exam_plans:
    print(
        f"{exam['subject']} | "
        f"{exam['daily_pages']:.1f} pages/day | "
        f"{exam['days_left']} days left | "
        f"PRIORITY: {exam['priority']}"
    )

