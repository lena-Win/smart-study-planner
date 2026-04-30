import tkinter as tk
from tkinter import ttk
from planner import create_study_plan, generate_schedule_with_dates, calculate_priority, generate_daily_plan
subjects = []
def genetate_plan():
    pages = int(pages_entry.get())
    days = int(days_entry.get())
    plan = create_study_plan(pages, days)
    schedule = generate_schedule_with_dates(plan["total_pages"], plan["days"])
    output_text.delete("1.0", tk.END)
    for day in schedule:
        output_text.insert(
            tk.END,
            f"{day['date']}: {day['pages']} pages\n"
        )
def add_subject():
    subject = subject_entry.get()
    difficulty = difficulty_var.get()
    try:
        pages = int(pages_entry.get())
        days = int(days_entry.get())
    except ValueError:
        output_text.insert(tk.END, "Enter numbers for pages and days\n")
        return
    priority = calculate_priority(days)
    subjects.append({
        "subject": subject,
        "pages": pages,
        "days_left": days,
        "difficulty": difficulty,
        "priority":priority
    })
    subjects_list.insert(
        tk.END,
        f"{subject} | {difficulty} | {pages} pages | {days} days | PRIORITY: {priority}"
    )
    subject_entry.delete(0, tk.END)
    pages_entry.delete(0, tk.END)
    days_entry.delete(0, tk.END)
def generate_best_plan():
    output_text.delete("1.0", tk.END)  
    plan = generate_daily_plan(subjects)
    for item in plan:
        output_text.insert(
            tk.END,
            f"{item["subject"]} -> {item["pages_today"]} pages today | priority  {item["priority"]}\n"
                                    
        )     
window = tk.Tk()    
window.title("Study Zen") 
window.geometry("500x650")  
tk.Label(window, text="Total pages to study").pack() 
pages_entry = tk.Entry(window)
pages_entry.pack()
tk.Label(window, text="Number of days").pack()
days_entry = tk.Entry(window)
days_entry.pack()
tk.Button(window, text="Generate plan", command=genetate_plan).pack(pady=10)
output_text = tk.Text(window, height=15)
output_text.pack()
tk.Button(window, text="Add subject", command=add_subject).pack()
tk.Label(window, text="Subject").pack()
subject_entry = tk.Entry(window)
subject_entry.pack()
difficulty_var = tk.StringVar()
tk.Label(window, text="Difficulty").pack()
difficulty_menu = ttk.Combobox(
    window,
    textvariable=difficulty_var,
    values=["EASY", "MEDIUM", "HARD"]
)
difficulty_menu.pack()
subjects_list = tk.Listbox(window, width=50, height=8)
subjects_list.pack(pady=10)
tk.Button(window, text="Best plan today", command=generate_best_plan).pack(padx=10)
window.mainloop()
