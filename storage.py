def save_plan(filename, content):
    with open(filename, "w") as file:
        file.write(content)
        import json
        def save_plan(filename, plan):
            with open(filename, "w") as file:
                json.dump(plan, file)
import json
def load_plan(filename):
    with open(filename, "r") as file:
        return json.load(file)
