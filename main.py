from planner import calculate_daily_study
pages = int(input("Enter total numbers of pages to study: "))
days = int(input("Enter number of days available: "))
dayly_pages = calculate_daily_study(pages, days)
print("You should study", dayly_pages, "pages per day.")

