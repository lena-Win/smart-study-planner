import tkinter as tk
from planner import create_study_plan, generate_schedule_with_dates
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
window = tk.Tk()    
window.title("Smart Study Planner") 
window.geometry("400x400")  
tk.Label(window, text="Total pages to study").pack() 
pages_entry = tk.Entry(window)
pages_entry.pack()
tk.Label(window, text="Number of days").pack()
days_entry = tk.Entry(window)
days_entry.pack()
tk.Button(window, text="Generate plan", command=genetate_plan).pack(pady=10)
output_text = tk.Text(window, height=15)
output_text.pack()
window.mainloop()
