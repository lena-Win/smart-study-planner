def calculate_daily_study(pages, days):
    if days <= 0:
        return "Invalid number of days"
    return pages / days
def calculate_total_daily_load(subjects):
    total = 0
    for subject in subjects:
        total += subject
    return total