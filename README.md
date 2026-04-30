# Study Zen
Study Zen is a Python console application that helps students plan their study time efficiently by breaking learning material into manageable daily tasks.

## Project goal
The goal of this project is to build a simple system but extensible study planning system that calculates daily study workload and helps manage multiple exams based on urgency and available time.

## Features (initial version)
- Calculate daily number of pages to study
- Generate a day-by-day study schedule
- Support multiple exams at the same time
- Assign exam priority based on days left (HIGH / MEDIUM / LOW)
- Save study plans to a JSON file
- Modular project structure (separated logic, storage and main app)

## Technologies Used
- Python
- Git / GitHub 
- JSON for persistent storage
- Command-line interface (CLI)

## How It Works 
The user provides the total number of pages and available days. The application calculates the daily workload and generates a study schedule. For multiple exams, the system calculates daily pages per subject and assigns priorities based on the remaining time.

## How to run
1. Clone the repository
2. Make sure Python 3 is installed 
3. Run "python main.py"
4. Follow the instructions displayed in the terminal

## Example Output 
"Daily study schedule:
Day 1: 3 pages
Day 2: 3 pages
...
Exam overview:
Biology | 12.0 pages/day | 10 days left | PRIORITY: MEDIUM
Math | 4.0 pages/day | 20 days left | PRIORITY: MEDIUM
CS | 2.0 pages/day | 30 days left | PRIORITY: LOW"

## Status 
This project is under active development and is being expanded step by step as a learning-focused CS project.

