import random
import math
import statistics

def clamp(val, min_val, max_val):
    return max(min_val, min(max_val, val))

def calc_orig(att, int_marks, cgpa, backlog, fee, lms, sch, year):
    R_att = 1 - (att / 100.0)
    R_int = 1 - (int_marks / 100.0)
    R_sem = 1 - (cgpa / 10.0) + (0.1 * backlog)
    R_sem = clamp(R_sem, 0.0, 1.0)
    R_fee = 0.0 if fee == 'paid' else (0.5 if fee == 'delayed' else 1.0)
    R_lms = 1.0 - lms
    R_sch = 0.0 if sch == 'yes' else 1.0
    R_year = 1.0 - (year / 4.0)
    
    DropoutScore = 0.25*R_att + 0.20*R_int + 0.20*R_sem + 0.15*R_fee + 0.10*R_lms + 0.05*R_sch + 0.05*R_year
    P = 1.0 / (1.0 + math.exp(-5.0 * (DropoutScore - 0.5))) * 100.0
    return P

def generate_student():
    quality = clamp(random.gauss(0.6, 0.2), 0.0, 1.0)
    year = random.randint(1, 4)
    att = clamp(int(random.gauss(40 + 55 * quality, 10)), 35, 100)
    int_marks = clamp(int(random.gauss(35 + 60 * quality, 10)), 30, 100)
    cgpa = round(clamp(random.gauss(4.5 + 5.0 * quality, 0.7), 4.0, 9.8), 2)
    if quality > 0.7: backlog = 0
    elif quality < 0.4: backlog = random.randint(1, 6)
    else: backlog = random.randint(0, 2)
    
    p = random.random()
    if p < 0.6 + 0.3 * quality: fee = 'paid'
    elif p < 0.85 + 0.1 * quality: fee = 'delayed'
    else: fee = 'unpaid'
    
    lms = clamp(round(random.gauss(quality - 0.05, 0.15), 2), 0.0, 1.0)
    sch = 'yes' if (cgpa > 8.5 and random.random() < 0.3) or random.random() < 0.05 else 'no'
    
    return att, int_marks, cgpa, backlog, fee, lms, sch, year, quality

probs = []
for _ in range(10000):
    student = generate_student()
    probs.append(calc_orig(*student[:-1]))

print(f"Mean: {statistics.mean(probs):.2f}, Median: {statistics.median(probs):.2f}")
print(f"<20: {sum(p < 20 for p in probs)}")
print(f"20-40: {sum(20 <= p < 40 for p in probs)}")
print(f"40-60: {sum(40 <= p < 60 for p in probs)}")
print(f"60-80: {sum(60 <= p < 80 for p in probs)}")
print(f">80: {sum(p >= 80 for p in probs)}")
