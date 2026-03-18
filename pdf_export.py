from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import os
def export_plan_to_pdf(plan):
    filename = os.path.join(os.getcwd(), "study_plan.pdf")
    c = canvas.Canvas(filename, pagesize=letter)
    y = 750
    for item in plan:
        line = f"{item["subject"]} - {item["pages_today"]} pages ({item["priority"]})"
        c.drawString(100, y, line)
        y -= 25
    c.save()  
    return filename  