// Data Structure for Subjects and Students
import {set,ref } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
import {initializeConnection} from "../connection.js"

// Initialize Firebase
const {app,db}=initializeConnection();

let subjects = {
    'subCode1': {
        name: 'Mathematics',
        faculty: 'Dr. Alice Green',
        password: 'math123',
        students: ['RF123', 'RF124']
    },
    'subCode2': {
        name: 'Physics',
        faculty: 'Dr. Bob Brown',
        password: 'phy123',
        students: ['RF125', 'RF126']
    }

    
};

let students = {
    'RF123': { name: 'John Doe', rollno: '12345', parentMail: 'john@example.com' },
    'RF124': { name: 'Jane Doe', rollno: '12346', parentMail: 'jane@example.com' },
    'RF125': { name: 'James Smith', rollno: '12347', parentMail: 'james@example.com' },
    'RF126': { name: 'Emily Johnson', rollno: '12348', parentMail: 'emily@example.com' }
};


function addSubjectToDB(subCode,subject){
const path=ref(db,"Subjects/"+subCode);
set(path, subject)
    .then(() => {
        console.log("Data added successfully!");
    })
    .catch((error) => {
        console.error("Error adding data: ", error);
    });
}

// Display the subjects in the subjects section
function displaySubjects() {
    const container = document.getElementById("subjectsContainer");
    container.innerHTML = ""; // Clear the container before adding subjects again

    // Dynamically create cards for each subject
    Object.keys(subjects).forEach((subCode) => {
        const subject = subjects[subCode];
        const subjectCard = document.createElement("div");
        subjectCard.className = "subject-card";
        subjectCard.innerHTML = `
            <h3>${subject.name}</h3>
            <p><strong>Faculty:</strong> ${subject.faculty}</p>
            <p><strong>Students:</strong> ${subject.students.map(rfid => students[rfid].name).join(", ")}</p>
            <button class="delete-subject" data-subcode="${subCode}">Delete</button>
        `;
        container.appendChild(subjectCard);
    });

    // Attach event listeners for delete buttons
    const deleteButtons = document.querySelectorAll(".delete-subject");
    deleteButtons.forEach(button => {
        button.addEventListener("click", function() {
            const subCode = button.getAttribute("data-subcode");
            deleteSubject(subCode); // Delete the subject when clicked
        });
    });
}

// Show the form to add a new subject
function showAddSubjectForm() {
    document.getElementById("subjectForm").style.display = "block"; // Show form
    populateStudentCheckboxes(); // Populate checkboxes with students
}

// Hide the add subject form
function hideAddSubjectForm() {
    document.getElementById("subjectForm").style.display = "none"; // Hide form
}

// Populate the students' checkboxes in the add subject form
function populateStudentCheckboxes() {
    const checkboxesContainer = document.getElementById("studentsCheckboxes");
    checkboxesContainer.innerHTML = ""; // Clear previous checkboxes

    // Add checkbox for each student
    Object.keys(students).forEach(rfid => {
        const student = students[rfid];
        const checkboxLabel = document.createElement("div");
        checkboxLabel.className = "studentCheckbox";
        checkboxLabel.innerHTML = `
            <input type="checkbox" id="student_${rfid}" value="${rfid}">
            <label for="student_${rfid}">${student.name}</label>
        `;
        checkboxesContainer.appendChild(checkboxLabel);
    });
}

// Add the new subject to the subjects object
function addSubject() {
    const subCode = document.getElementById("subCode").value;
    const subName = document.getElementById("subName").value;
    const facName = document.getElementById("facName").value;

    // Collect selected students
    const selectedStudents = [];
    Object.keys(students).forEach(rfid => {
        const checkbox = document.getElementById(`student_${rfid}`);
        if (checkbox && checkbox.checked) {
            selectedStudents.push(rfid);
        }
    });

    // Create new subject and add it to the subjects object
    subjects[subCode] = { name: subName, faculty: facName, password: '', students: selectedStudents };
    addSubjectToDB(subCode,subjects[subCode]);
    // Refresh the subjects list
    displaySubjects();
    hideAddSubjectForm(); // Hide form
}

// Delete a subject
function deleteSubject(subCode) {
    delete subjects[subCode];
    displaySubjects(); // Refresh subject list
}

// Event Listeners for Switching Between Sections
document.getElementById("sectionSelector").addEventListener("change", function() {
    const selectedSection = document.getElementById("sectionSelector").value;

    // Display the selected section and hide the other one
    if (selectedSection === "subjects") {
        document.getElementById("subjectsSection").style.display = "block";
        document.getElementById("studentsSection").style.display = "none";
        displaySubjects(); // Display subjects when switching to the subjects section
    } else {
        document.getElementById("studentsSection").style.display = "block";
        document.getElementById("subjectsSection").style.display = "none";
        displayStudents(); // Display students when switching to the students section
    }
});

// Display the students in the students section
function displayStudents() {
    const studentsList = document.getElementById("studentsList");
    studentsList.innerHTML = ""; // Clear the list before adding students again

    // Dynamically create rows for each student
    Object.keys(students).forEach(rfid => {
        const student = students[rfid];
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${rfid}</td>
            <td>${student.name}</td>
            <td>${student.rollno}</td>
            <td>${student.parentMail}</td>
            <td><button class="delete-student" data-rfid="${rfid}">Delete</button></td>
        `;

        studentsList.appendChild(row);
    });

    // Attach event listeners for delete student buttons
    const deleteStudentButtons = document.querySelectorAll(".delete-student");
    deleteStudentButtons.forEach(button => {
        button.addEventListener("click", function() {
            const rfid = button.getAttribute("data-rfid");
            deleteStudent(rfid); // Delete the student when clicked
        });
    });
}

// Delete a student from the list
function deleteStudent(rfid) {
    delete students[rfid];
    displayStudents(); // Refresh student list
}

// Show the form to add a new student
function showAddStudentForm() {
    document.getElementById("studentForm").style.display = "block"; // Show form
}

// Hide the add student form
function hideAddStudentForm() {
    document.getElementById("studentForm").style.display = "none"; // Hide form
}

// Add a new student to the students object
function addStudent() {
    const rfid = document.getElementById("rfid").value;
    const name = document.getElementById("name").value;
    const rollno = document.getElementById("rollno").value;
    const parentMail = document.getElementById("mail").value;

    // Create new student and add to the students object
    students[rfid] = { name, rollno, parentMail };

    // Refresh the students list
    displayStudents();
    hideAddStudentForm(); // Hide form
}

// Event listeners for adding students and subjects
document.getElementById("addNewSubjectBtn").addEventListener("click", showAddSubjectForm);
document.getElementById("cancelAddSubjectBtn").addEventListener("click", hideAddSubjectForm);
document.getElementById("addSubjectBtn").addEventListener("click", addSubject);

document.getElementById("addNewStudentBtn").addEventListener("click", showAddStudentForm);
document.getElementById("cancelAddStudentBtn").addEventListener("click", hideAddStudentForm);
document.getElementById("addStudentBtn").addEventListener("click", addStudent);

// Initialize page by displaying subjects section
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("subjectsSection").style.display = "block"; // Show subjects section initially
    displaySubjects(); // Display subjects
});
