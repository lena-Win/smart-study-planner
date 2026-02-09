from planner import calculate_daily_study
pages = int(input("Enter total numbers of pages to study: "))
days = int(input("Enter number of days available: "))
daily_pages = calculate_daily_study(pages, days)
print("You should study", daily_pages, "pages per day.")
from planner import calculate_total_daily_load
subjects = [daily_pages, 5, 3]
total = calculate_total_daily_load(subjects)
print(f"Total daily study load: {total:.2f}")
from storage import save_plan
plan_text = f"Daily study load: {daily_pages}\n"
save_plan("study_plan.txt", plan_text)
print(f"You should study {daily_pages:.2f} pages per day.")
from planner import calculate_priority
days_left = int(input("Enter days left until exam: "))
priority = calculate_priority(days_left)
print("Exam priority:", priority)
