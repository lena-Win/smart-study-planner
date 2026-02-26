import json
def save_plan(filename, plan):
    with open(filename, "w") as file:
        json.dump(plan, file, indent=4)
def load_plan(filename):
    with open(filename, "r") as file:
        return json.load(file)
