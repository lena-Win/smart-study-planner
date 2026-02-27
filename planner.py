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
def create_study_plan(pages, days):
    daily = calculate_daily_study(pages, days)
    return {
        "total_pages": pages,
        "days": days,
        "dayly_pages": daily
    }
def generate_schedule(total_pages, days):
    daily = total_pages // days 
    remainder = total_pages % days
    schedule = []
    for day in range(1, days + 1):
        pages_today = daily 
        if day <= remainder:
            pages_today += 1 
        schedule.append(pages_today)
    return schedule
def build_exam_plans(exams):
    plans = []
    for exam in exams:
        daily_pages = calculate_daily_study(
            exam["pages"],
            exam["days_left"]
        )
        plans.append({
            "subject": exam["subject"],
            "daily_pages": daily_pages,
            "days_left": exam["days_left"]
        })
    return plans    

        
