from pdf_export import export_plan_to_pdf
plan = [
    {"subject": "Math", "pages_today": 5},
    {"subject": "Biology", "pages_today": 3}
]
export_plan_to_pdf(plan)
print("PDF created")