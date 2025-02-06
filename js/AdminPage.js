// Data Structure for Subjects and Students
import {set,ref,get,remove } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
import {initializeConnection} from "../connection.js"

// Initialize Firebase
const {app,db}=initializeConnection();



 //{
//     'subCode1': {
//         name: 'Mathematics',
//         faculty: 'Dr. Alice Green',
//         password: 'math123',
//         students: ['RF123', 'RF124']
//     },
//     'subCode2': {
//         name: 'Physics',
//         faculty: 'Dr. Bob Brown',
//         password: 'phy123',
//         students: ['RF125', 'RF126']
//     }

    
// };

var students={};


// Fetch all subjects from the database
var subjects={};



async function retrieveStudents() {
    const dbRef = ref(db, "Students");
    try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            students = snapshot.val();  // Get all subjects data
            console.log("All students retrieved:", students);
              // Now that subjects are fetched, display them
        } else {
            console.log("No students available.");
            // Handle case when no subjects are found
        }
    } catch (error) {
        console.error("Error fetching students:", error);
    }
}
   

async function retrieveSubjects() {
    const dbRef = ref(db, "Subjects");
    try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            subjects = snapshot.val();  // Get all subjects data
            console.log("All subjects retrieved:", subjects);
            

        } else {
            console.log("No subjects available.");

        }
    } catch (error) {
        console.error("Error fetching subjects:", error);
    }
}
    

        


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

function addStudentToDB(rfid,student){
    const path=ref(db,"Students/"+rfid);
    set(path, student)
        .then(() => {
            console.log("Data added successfully!");
        })
        .catch((error) => {
            console.error("Error adding data: ", error);
        });
    }


function displaySubjects() {
    const container = document.getElementById("subjectsContainer");
    container.innerHTML = ""; // Clear the container before adding subjects again

    // Dynamically create cards for each subject
    Object.keys(subjects).forEach((subCode) => {
        const subject = subjects[subCode];
        const subjectCard = document.createElement("div");
        subjectCard.className = "subject-card";
        
        // Map students, skipping those not present in the students object
        const studentNames = subject.students
            .map(rfid => students[rfid] ? students[rfid].name : null) // Check if student exists
            .filter(name => name !== null) // Filter out null values
            .join(", "); // Join the names into a string

        subjectCard.innerHTML = `
            <h3>${subCode}-${subject.name}</h3>
            <p><strong>Faculty:</strong> ${subject.faculty}</p>
            <p><strong>Students:</strong> ${studentNames}</p>
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
    const password= document.getElementById("pwd").value;

    // Collect selected students
    const selectedStudents = [];
    Object.keys(students).forEach(rfid => {
        const checkbox = document.getElementById(`student_${rfid}`);
        if (checkbox && checkbox.checked) {
            selectedStudents.push(rfid);
        }
    });

    // Create new subject and add it to the subjects object
    subjects[subCode] = { name: subName, faculty: facName, password: password, students: selectedStudents };
    addSubjectToDB(subCode,subjects[subCode]);
    // Refresh the subjects list
    displaySubjects();
    hideAddSubjectForm(); // Hide form
}

// Delete a subject
function deleteSubject(subCode) {
    delete subjects[subCode];
    displaySubjects(); // Refresh subject list
    remove(ref(db,"Subjects/"+subCode));
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



async function deleteStudent(rfid) {
    const studentRef = ref(db, "Students/"+rfid);
    try {
        await remove(studentRef);

        if (students[rfid]) {
            delete students[rfid];
            console.log(`Student ${rfid} deleted locally from students object.`);
        }

            for (const subjectId in subjects) {
                const studentsList = subjects[subjectId].students || {};

                if (studentsList.includes(rfid)) {
                    subjects[subjectId].students=studentsList.filter(id => id !== rfid);
                        console.log('Removed student ${rfid} locally from subject ${subjectId}');
                    const studentsInSubjectRef = ref(db, "Subjects/"+subjectId+"/students");
                    set(studentsInSubjectRef,subjects[subjectId].students);

   
                }
            }

            displayStudents();
        

        console.log(`Student ${rfid} deleted from the database and locally.`);
    } catch (error) {
        console.error("Error deleting student:", error);
    }
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

    addStudentToDB(rfid,students[rfid]);
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
   
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      window.location.href = "../index.html"; // Redirect to login page
    }


    retrieveStudents().then(function() {
       return retrieveSubjects();
    }).then(function () {
        displaySubjects();
    }).catch(function(error) {
        console.error("Error in retrieving students:", error);
    });

});
