from planner import create_study_plan, generate_schedule
from storage import save_plan
pages = int(input("Enter total number of pages to study: "))
days = int(input("Enter number of days available: "))
plan = create_study_plan(pages, days)
schedule = generate_schedule(plan["total_pages"], plan["days"])
print("Daily study schedule:")
for index, pages_today in enumerate(schedule, start=1):
    print("Day", index, ":", pages_today, "pages")
plan["schedule"] = schedule
save_plan("study_plan.json", plan)
print("Study plan saved to study_plan.json")
