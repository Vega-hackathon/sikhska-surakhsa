const fs = require('fs');

const TARGET_ROWS = 10843;
const NUM_IMPERFECT = 182;

const COLLEGES = [
    ["Vellore Institute of Technology", "vit.ac.in"],
    ["SRM Institute of Science and Technology", "srmist.edu.in"],
    ["Manipal Institute of Technology", "manipal.edu"],
    ["PES University", "pes.edu"],
    ["RV College of Engineering", "rvce.edu.in"],
    ["BMS College of Engineering", "bmsce.ac.in"],
    ["Thapar Institute of Engineering and Technology", "thapar.edu"],
    ["KIIT University", "kiit.ac.in"],
    ["Amity University", "amity.edu"],
    ["Lovely Professional University", "lpu.in"],
    ["MIT World Peace University", "mitwpu.edu.in"],
    ["NMAM Institute of Technology", "nmamit.nitte.edu.in"],
    ["MS Ramaiah Institute of Technology", "msrit.edu"],
    ["Dayananda Sagar College of Engineering", "dayanandasagar.edu"],
    ["SVKM'S Dwarkadas J. Sanghvi College of Engineering", "djscoe.edu"],
    ["Haldia Institute of Technology", "hithaldia.ac.in"]
];

const FIRST_NAMES = [
    "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Ayaan",
    "Krishna", "Ishaan", "Shaurya", "Atharva", "Aaryan", "Dhruv", "Kabir",
    "Ritik", "Rohan", "Rahul", "Amit", "Sumit", "Anjali", "Priya", "Sneha",
    "Neha", "Pooja", "Aarti", "Riya", "Nidhi", "Shreya", "Aditi", "Kavya",
    "Khushi", "Ananya", "Yash", "Dev", "Aryan", "Karthik", "Sanjay", "Manoj",
    "Suresh", "Ramesh", "Mukesh", "Raj", "Shyam", "Akash", "Abhinav", "Abhishek",
    "Pranav", "Shruti", "Swati", "Sonam", "Vivek", "Vikas"
];

const LAST_NAMES = [
    "Sharma", "Gupta", "Kumar", "Singh", "Patel", "Desai", "Shah", "Joshi",
    "Verma", "Tiwari", "Pandey", "Yadav", "Chaudhary", "Mishra", "Reddy",
    "Rao", "Patil", "Kulkarni", "Deshmukh", "Iyer", "Menon", "Nair", "Das",
    "Chatterjee", "Banerjee", "Mukherjee", "Bose", "Sengupta", "Rajput",
    "Chauhan", "Thakur"
];

function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function standardNormal() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return num;
}

function gauss(mean, stdev) {
    return mean + (standardNormal() * stdev);
}

function clamp(val, min_val, max_val) {
    return Math.max(min_val, Math.min(max_val, val));
}

function calcDropoutProb(att, int_marks, cgpa, backlog, fee, lms, sch, year) {
    let R_att = 1 - (att / 100.0);
    let R_int = 1 - (int_marks / 100.0);

    let R_sem = 1 - (cgpa / 10.0);
    R_sem = R_sem + (0.1 * backlog);
    R_sem = clamp(R_sem, 0.0, 1.0);

    let R_fee;
    if (fee === 'paid') R_fee = 0.0;
    else if (fee === 'delayed') R_fee = 0.5;
    else R_fee = 1.0;

    let R_lms = 1.0 - lms;
    let R_sch = (sch === 'yes') ? 0.0 : 1.0;
    let R_year = 1.0 - (year / 4.0);

    let DropoutScore = 0.25 * R_att + 0.20 * R_int + 0.20 * R_sem + 0.15 * R_fee + 0.10 * R_lms + 0.05 * R_sch + 0.05 * R_year;

    // Introduce Non-Linear Interactions
    if (R_att > 0.4 && backlog > 1) {
        DropoutScore += 0.15 * R_att * (backlog / 5.0);
    }
    if (cgpa > 8.0 && fee === 'delayed') {
        DropoutScore -= 0.05;
    }
    if (R_lms > 0.6) {
        DropoutScore += 0.1 * Math.pow(R_lms, 2);
    }
    if (fee === 'unpaid' && sch === 'no') {
        DropoutScore += 0.1;
    }

    // Add meaningful target noise
    let noise = gauss(0, 0.08); // Normal distribution noise
    DropoutScore += noise;

    // Sigmoid transformation (shifted center for better distribution)
    let P = 1.0 / (1.0 + Math.exp(-6.0 * (DropoutScore - 0.42))) * 100.0;

    // Add minor uniform noise to final probability to fuzz literal separability boundaries
    P += randFloat(-1.5, 1.5);

    return Number(clamp(P, 0.1, 99.9).toFixed(2));
}

const used_uids = new Set();
function generateUid() {
    while (true) {
        let p1 = String(randInt(100000, 999999));
        let p2 = String(randInt(100000, 999999));
        let uid = p1 + p2;
        let uniqueDigits = new Set(uid).size;
        if (uniqueDigits >= 4 && !used_uids.has(uid)) {
            used_uids.add(uid);
            return uid;
        }
    }
}

function generateRow(quality = null) {
    if (quality === null) {
        if (Math.random() < 0.3) {
            // High risk student population
            quality = clamp(gauss(0.25, 0.15), 0.0, 1.0);
        } else {
            // Normal student population
            quality = clamp(gauss(0.65, 0.15), 0.0, 1.0);
        }
    }

    let uid = generateUid();

    let fname = randomChoice(FIRST_NAMES);
    let lname = randomChoice(LAST_NAMES);
    let student_name = `${fname} ${lname}`;

    let [college, domain] = randomChoice(COLLEGES);

    let rand_digits = randInt(10, 999);
    let college_email = `${fname.toLowerCase()}.${lname.toLowerCase()}${rand_digits}@${domain}`;

    let current_year = randInt(1, 4);
    let sem_offset = randomChoice([0, 1]);
    let current_semester = (current_year - 1) * 2 + 1 + sem_offset;

    let attendance_rate = clamp(Math.round(gauss(40 + 55 * quality, 10)), 35, 100);
    let avg_internal = clamp(Math.round(gauss(35 + 60 * quality, 10)), 30, 100);
    let cgpa = Number(clamp(gauss(4.5 + 5.0 * quality, 0.7), 4.0, 9.8).toFixed(2));

    let backlog_count;
    if (quality > 0.7) {
        backlog_count = 0;
    } else if (quality < 0.4) {
        backlog_count = randInt(1, 6);
    } else {
        backlog_count = randInt(0, 2);
    }

    let base_fee_prob = Math.random();
    let fee_status;
    if (base_fee_prob < 0.6 + 0.3 * quality) {
        fee_status = 'paid';
    } else if (base_fee_prob < 0.85 + 0.1 * quality) {
        fee_status = 'delayed';
    } else {
        fee_status = 'unpaid';
    }

    let normalized_engagement = clamp(Number(gauss(quality - 0.05, 0.15).toFixed(2)), 0.0, 1.0);

    let scholarship_status;
    if (cgpa > 8.5 && Math.random() < 0.3) {
        scholarship_status = 'yes';
    } else if (Math.random() < 0.05) {
        scholarship_status = 'yes';
    } else {
        scholarship_status = 'no';
    }

    let prob = calcDropoutProb(attendance_rate, avg_internal, cgpa, backlog_count, fee_status, normalized_engagement, scholarship_status, current_year);

    return [
        uid, student_name, college_email, college,
        current_year, current_semester, attendance_rate, avg_internal,
        cgpa, backlog_count, fee_status, normalized_engagement,
        scholarship_status, prob
    ];
}

let rows = [];
const NUM_PERFECT = TARGET_ROWS - NUM_IMPERFECT;

for (let i = 0; i < NUM_PERFECT; i++) {
    rows.push(generateRow());
}

// Ensure unique random sampling for duplicates
let duplicates = [];
let sampled_indices = new Set();
while (duplicates.length < 62) {
    let idx = randInt(0, rows.length - 1);
    if (!sampled_indices.has(idx)) {
        sampled_indices.add(idx);
        // deep copy just in case, though it's flat
        duplicates.push([...rows[idx]]);
    }
}
rows.push(...duplicates);

for (let i = 0; i < 60; i++) {
    let row = generateRow();
    let null_col = randomChoice([7, 9, 11, 12]);
    row[null_col] = '';
    rows.push(row);
}

for (let i = 0; i < 60; i++) {
    let row = generateRow();
    let noise_type = randomChoice(["att_high", "att_low", "engagement_high", "engagement_low"]);
    if (noise_type === "att_high") {
        row[6] = randInt(101, 150);
    } else if (noise_type === "att_low") {
        row[6] = randInt(-20, -1);
    } else if (noise_type === "engagement_high") {
        row[11] = Number(randFloat(1.1, 2.0).toFixed(2));
    } else if (noise_type === "engagement_low") {
        row[11] = Number(randFloat(-0.5, -0.1).toFixed(2));
    }
    rows.push(row);
}

// Shuffle rows
for (let i = rows.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [rows[i], rows[j]] = [rows[j], rows[i]];
}

const headers = [
    "student_uid", "student_name", "college_email", "college_name",
    "current_year", "current_semester", "attendance_rate", "avg_internal",
    "cgpa", "backlog_count", "fee_status", "normalized_engagement",
    "scholarship_status", "dropout_probability_percent"
];

function escapeCSV(val) {
    if (val === null || val === undefined) return "";
    let s = String(val);
    if (s.includes(",") || s.includes('"') || s.includes("\n")) {
        s = '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
}

let csvContent = headers.map(escapeCSV).join(",") + "\n";
for (let r of rows) {
    csvContent += r.map(escapeCSV).join(",") + "\n";
}

fs.writeFileSync('student_dropout_dataset_india.csv', csvContent, 'utf-8');

console.log(`Generated ${rows.length} rows successfully in student_dropout_dataset_india.csv`);
