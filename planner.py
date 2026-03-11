from datetime import date, timedelta
DIFFICULTY_WEIGHTS = {
    "EASY": 1,
    "MEDIUM": 1.5,
    "HARD": 2
}
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
    elif days_left <= 21:
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
        base_daily = calculate_daily_study(
            exam["pages"],
            exam["days_left"]
        )
        weight = DIFFICULTY_WEIGHTS.get(exam["difficulty"], 1)
        daily_pages =  base_daily * weight
        priority = calculate_priority(exam["days_left"])
        plans.append({
            "subject": exam["subject"],
            "daily_pages": daily_pages,
            "days_left": exam["days_left"],
            "priority": priority,
            "difficulty": exam["difficulty"]
        })
    return plans    
def generate_schedule_with_dates(total_pages, days):
    daily = total_pages // days 
    remainder = total_pages % days
    schedule = []
    start_date = date.today()
    for i in range(days):
        pages_today = daily
        if i < remainder:
            pages_today += 1
        current_date = start_date + timedelta(days=i)    
        schedule.append({
            "date": current_date.isoformat(),
            "pages": pages_today
        })
    return schedule 
def generate_daily_plan(subjects):
    plan = []
    for subject in subjects:
        pages = subject["pages"]
        days = subject["days_left"]
        difficulty = subject["difficulty"]
        pages_per_day = pages // days
        if difficulty == "HARD":
            pages_per_day = max(1, pages_per_day - 1)
        elif difficulty == "EASY":
            pages_per_day += 1
        plan.append({
            "subject": subject["subject"],
            "pages_today": pages_per_day,
            "priority": subject["priority"]
        }) 
    plan.sort(key=lambda x: x["priority"], reverse=True)    
    return plan 