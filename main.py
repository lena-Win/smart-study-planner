from planner import create_study_plan, generate_schedule
def main():
    pages = int(input("Enter total number of pages to study: "))
    days = int(input("Enter number of days available: "))
    plan = create_study_plan(pages, days)
    schedule = generate_schedule(plan["total_pages"], plan["days"])
    print("Daily study schedule:")
    for index, pages_today in enumerate(schedule, start=1):
        print("Day", index, ":", pages_today, "pages")
if __name__ == "__main__":
    main()
