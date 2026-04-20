import json
import os
FILE_NAME = "study_plan.json"
def load_subjects():
    if not os.path.exists(FILE_NAME):
        return[]
    with open(FILE_NAME, "r") as f:
        try:
            return json.load(f)
        except:
            return []
def save_subjects(subjects):
    with open(FILE_NAME, "w") as f:
        json.dump(subjects, f, indent=4)
