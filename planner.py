def calculate_daily_study(pages, days):
    if days <= 0:
        return "Invalid number of days"
    return pages / days
def calculate_total_daily_load(subjects):
    total = 0
    for subject in subjects:
        total += subject
    return total
def calculate_priority(days_left):
    if days_left <= 7:
        return "HIGH"
    elif days_left <= 30:
        return "MEDIUM"
    else:
        return "LOW"
def calculate_daily_study(pages, days):
    if pages <= 0 or days <= 0:
        raise ValueError("Pages and days must be positive numbers")
    return pages / days 

