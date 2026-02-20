import csv
import random
import math
import uuid

TARGET_ROWS = 10843
NUM_IMPERFECT = 182

COLLEGES = [
    ("Vellore Institute of Technology", "vit.ac.in"),
    ("SRM Institute of Science and Technology", "srmist.edu.in"),
    ("Manipal Institute of Technology", "manipal.edu"),
    ("PES University", "pes.edu"),
    ("RV College of Engineering", "rvce.edu.in"),
    ("BMS College of Engineering", "bmsce.ac.in"),
    ("Thapar Institute of Engineering and Technology", "thapar.edu"),
    ("KIIT University", "kiit.ac.in"),
    ("Amity University", "amity.edu"),
    ("Lovely Professional University", "lpu.in"),
    ("MIT World Peace University", "mitwpu.edu.in"),
    ("NMAM Institute of Technology", "nmamit.nitte.edu.in"),
    ("MS Ramaiah Institute of Technology", "msrit.edu"),
    ("Dayananda Sagar College of Engineering", "dayanandasagar.edu"),
    ("SVKM'S Dwarkadas J. Sanghvi College of Engineering", "djscoe.edu"),
    ("Haldia Institute of Technology", "hithaldia.ac.in"),
    ("Nirma University", "nirmauni.ac.in"),
    ("Heritage Institute of Technology", "heritageit.edu"),
]

FIRST_NAMES = ["Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Ayaan", "Krishna", "Ishaan", "Shaurya", "Atharva", "Aaryan", "Dhruv", "Kabir", "Ritik", "Rohan", "Rahul", "Amit", "Sumit", "Anjali", "Priya", "Sneha", "Neha", "Pooja", "Aarti", "Riya", "Nidhi", "Shreya", "Aditi", "Kavya", "Khushi", "Ananya", "Yash", "Dev", "Aryan", "Karthik", "Sanjay", "Manoj", "Suresh", "Ramesh", "Mukesh", "Raj", "Shyam", "Akash", "Abhinav", "Abhishek", "Pranav", "Shruti", "Swati", "Sonam", "Vivek", "Vikas"]

LAST_NAMES = ["Sharma", "Gupta", "Kumar", "Singh", "Patel", "Desai", "Shah", "Joshi", "Verma", "Tiwari", "Pandey", "Yadav", "Chaudhary", "Mishra", "Reddy", "Rao", "Patil", "Kulkarni", "Deshmukh", "Iyer", "Menon", "Nair", "Das", "Chatterjee", "Banerjee", "Mukherjee", "Bose", "Sengupta", "Rajput", "Chauhan", "Thakur"]


def calc_dropout_prob(att, int_marks, cgpa, backlog, fee, lms, sch, year):
    R_att = 1 - (att / 100.0)
    R_int = 1 - (int_marks / 100.0)
    
    R_sem = 1 - (cgpa / 10.0)
    R_sem = R_sem + (0.1 * backlog)
    R_sem = max(0.0, min(1.0, R_sem))
    
    if fee == 'paid':
        R_fee = 0.0
    elif fee == 'delayed':
        R_fee = 0.5
    else:
        R_fee = 1.0
        
    R_lms = 1.0 - lms
    R_sch = 0.0 if sch == 'yes' else 1.0
    R_year = 1.0 - (year / 4.0)
    
    DropoutScore = 0.25*R_att + 0.20*R_int + 0.20*R_sem + 0.15*R_fee + 0.10*R_lms + 0.05*R_sch + 0.05*R_year
    
    # Introduce Non-Linear Interactions
    if R_att > 0.4 and backlog > 1:
        DropoutScore += 0.15 * R_att * (backlog / 5.0)
    if cgpa > 8.0 and fee == 'delayed':
        DropoutScore -= 0.05
    if R_lms > 0.6:
        DropoutScore += 0.1 * (R_lms ** 2)
    if fee == 'unpaid' and sch == 'no':
        DropoutScore += 0.1

    # Add meaningful target noise
    noise = clamp(random.gauss(0, 0.08), -0.25, 0.25) # Normal distribution noise
    DropoutScore += noise

    # Sigmoid transformation (shifted center)
    P = 1.0 / (1.0 + math.exp(-6.0 * (DropoutScore - 0.42))) * 100.0
    
    # Add minor uniform noise
    P += random.uniform(-1.5, 1.5)
    
    return round(clamp(P, 0.1, 99.9), 2)


def clamp(val, min_val, max_val):
    return max(min_val, min(max_val, val))

used_uids = set()

def generate_uid():
    while True:
        uid = f"{random.randint(100000000000, 999999999999)}"
        if len(set(uid)) >= 4 and uid not in used_uids:
            used_uids.add(uid)
            return uid
            
def generate_row(quality=None):
    if quality is None:
        if random.random() < 0.3:
            quality = clamp(random.gauss(0.25, 0.15), 0.0, 1.0)
        else:
            quality = clamp(random.gauss(0.65, 0.15), 0.0, 1.0)
        
    uid = generate_uid()
    
    fname = random.choice(FIRST_NAMES)
    lname = random.choice(LAST_NAMES)
    student_name = f"{fname} {lname}"
    
    college, domain = random.choice(COLLEGES)
    
    rand_digits = random.randint(10, 999)
    college_email = f"{fname.lower()}.{lname.lower()}{rand_digits}@{domain}"
    
    current_year = random.randint(1, 4)
    sem_offset = random.choice([0, 1])
    current_semester = (current_year - 1) * 2 + 1 + sem_offset
    
    attendance_rate = clamp(int(random.gauss(40 + 55 * quality, 10)), 35, 100)
    avg_internal = clamp(int(random.gauss(35 + 60 * quality, 10)), 30, 100)
    cgpa = round(clamp(random.gauss(4.5 + 5.0 * quality, 0.7), 4.0, 9.8), 2)
    
    if quality > 0.7:
        backlog_count = 0
    elif quality < 0.4:
        backlog_count = random.randint(1, 6)
    else:
        backlog_count = random.randint(0, 2)
        
    base_fee_prob = random.random()
    if base_fee_prob < 0.6 + 0.3 * quality:
        fee_status = 'paid'
    elif base_fee_prob < 0.85 + 0.1 * quality:
        fee_status = 'delayed'
    else:
        fee_status = 'unpaid'
        
    normalized_engagement = clamp(round(random.gauss(quality - 0.05, 0.15), 2), 0.0, 1.0)
    
    if cgpa > 8.5 and random.random() < 0.3:
        scholarship_status = 'yes'
    elif random.random() < 0.05:
        scholarship_status = 'yes'
    else:
        scholarship_status = 'no'
        
    prob = calc_dropout_prob(attendance_rate, avg_internal, cgpa, backlog_count, fee_status, normalized_engagement, scholarship_status, current_year)
    
    return [
        str(uid), student_name, college_email, college, 
        current_year, current_semester, attendance_rate, avg_internal, 
        cgpa, backlog_count, fee_status, normalized_engagement, 
        scholarship_status, prob
    ]

rows = []
NUM_PERFECT = TARGET_ROWS - NUM_IMPERFECT

for i in range(NUM_PERFECT):
    rows.append(generate_row())
    

duplicates = random.sample(rows, 62)
rows.extend(duplicates)


for _ in range(60):
    row = generate_row()
    null_col = random.choice([7, 9, 11, 12]) 
    row[null_col] = ''
    rows.append(row)


for _ in range(60):
    row = generate_row()
    noise_type = random.choice(["att_high", "att_low", "engagement_high", "engagement_low"])
    if noise_type == "att_high":
        row[6] = random.randint(101, 150)
    elif noise_type == "att_low":
        row[6] = random.randint(-20, -1)
    elif noise_type == "engagement_high":
        row[11] = round(random.uniform(1.1, 2.0), 2)
    elif noise_type == "engagement_low":
        row[11] = round(random.uniform(-0.5, -0.1), 2)
    rows.append(row)
    
random.shuffle(rows)

headers = [
    "student_uid", "student_name", "college_email", "college_name",
    "current_year", "current_semester", "attendance_rate", "avg_internal",
    "cgpa", "backlog_count", "fee_status", "normalized_engagement",
    "scholarship_status", "dropout_probability_percent"
]

with open('student_dropout_dataset_india.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(headers)
    for r in rows:
        writer.writerow(r)

print(f"Generated {len(rows)} rows successfully.")
