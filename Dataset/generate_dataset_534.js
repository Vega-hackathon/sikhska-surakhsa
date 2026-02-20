const fs = require('fs');

const TARGET_ROWS = 534;

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

const DEPARTMENTS = [
    "Computer Science and Engineering",
    "Electronics and Communication Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical and Electronics Engineering",
    "Information Technology"
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

// Generate all possible unique names and shuffle them to pick exactly 534
let allNames = [];
for (let fname of FIRST_NAMES) {
    for (let lname of LAST_NAMES) {
        allNames.push({ fname, lname });
    }
}
// Shuffle names
for (let i = allNames.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [allNames[i], allNames[j]] = [allNames[j], allNames[i]];
}

let nameIndex = 0;
const used_emails = new Set();

function generateRow() {
    // Generate an archetype to keep strict meaningful data relationships
    // 25% excellent students, 55% average, 20% struggling
    let archetypeRand = Math.random();
    let archetype;
    if (archetypeRand < 0.25) archetype = "excellent";
    else if (archetypeRand < 0.80) archetype = "average";
    else archetype = "struggling";

    let uid = generateUid();

    // Pick unique name
    let { fname, lname } = allNames[nameIndex++];
    let student_name = `${fname} ${lname}`;

    let [college, domain] = randomChoice(COLLEGES);
    let department = randomChoice(DEPARTMENTS);

    // Generate unique email
    let college_email;
    while (true) {
        let rand_digits = randInt(10, 9999);
        college_email = `${fname.toLowerCase()}.${lname.toLowerCase()}${rand_digits}@${domain}`;
        if (!used_emails.has(college_email)) {
            used_emails.add(college_email);
            break;
        }
    }

    let current_year = randInt(1, 4);
    let sem_offset = randomChoice([0, 1]);
    let current_semester = (current_year - 1) * 2 + 1 + sem_offset;

    // Meaningful correlated data based on archetype
    let attendance_rate, avg_internal, cgpa, backlog_count, fee_status, normalized_engagement, scholarship_status;

    if (archetype === "excellent") {
        attendance_rate = randInt(85, 100);
        avg_internal = randInt(80, 100);
        cgpa = Number(randFloat(8.5, 9.8).toFixed(2));
        backlog_count = 0;
        fee_status = "paid";
        normalized_engagement = Number(randFloat(0.8, 1.0).toFixed(2));
        scholarship_status = Math.random() < 0.3 ? 'yes' : 'no'; // some excellent get scholarship
    } else if (archetype === "average") {
        attendance_rate = randInt(65, 84);
        avg_internal = randInt(60, 79);
        cgpa = Number(randFloat(6.5, 8.49).toFixed(2));
        backlog_count = randInt(0, 2); // 0, 1, or 2 backlogs
        let feeRoll = Math.random();
        fee_status = feeRoll < 0.8 ? "paid" : "delayed";
        normalized_engagement = Number(randFloat(0.5, 0.79).toFixed(2));
        scholarship_status = 'no';
    } else { // struggling
        attendance_rate = randInt(40, 64);
        avg_internal = randInt(35, 59);
        cgpa = Number(randFloat(4.0, 6.49).toFixed(2));
        backlog_count = randInt(1, 5);
        let feeRoll = Math.random();
        if (feeRoll < 0.4) fee_status = "delayed";
        else if (feeRoll < 0.8) fee_status = "unpaid";
        else fee_status = "paid"; // occasionally struggling students still pay on time
        normalized_engagement = Number(randFloat(0.1, 0.49).toFixed(2));
        scholarship_status = 'no';
    }

    return [
        uid, student_name, college_email, college, department,
        current_year, current_semester, attendance_rate, avg_internal,
        cgpa, backlog_count, fee_status, normalized_engagement,
        scholarship_status
    ];
}

let rows = [];
for (let i = 0; i < TARGET_ROWS; i++) {
    rows.push(generateRow());
}

const headers = [
    "student_uid", "student_name", "college_email", "college_name", "department",
    "current_year", "current_semester", "attendance_rate", "avg_internal",
    "cgpa", "backlog_count", "fee_status", "normalized_engagement",
    "scholarship_status"
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

fs.writeFileSync('student_dropout_dataset_india_534.csv', csvContent, 'utf-8');

console.log(`Generated ${rows.length} purely clean and meaningful rows successfully with departments in student_dropout_dataset_india_534.csv`);
