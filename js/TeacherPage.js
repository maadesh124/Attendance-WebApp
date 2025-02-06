import {set,ref,get,remove } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
import {initializeConnection} from "../connection.js"
 //import { subCode,subject} from "../dummydb.js";
 //import {subCode} from "./login.js"

const {app,db}=initializeConnection();


// await set(ref(db,"Attendance/2025-02-06"),attendance);

 var subject={};
 var subCode;
var students = {};
let dayAttendance = {};
let date = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
console.log(date);



async function getSubject(){
    var snap=await get(ref(db,"Subjects/"+subCode)) ;
    if(snap.exists())
    subject=snap.val();
    return subject;
}
// Function to retrieve the attendance for the day from Firebase
async function retrieveAttendanceForDate(date) {
    const attendanceRef = ref(db,'Attendance/'+subCode+'/'+ date);

  var snapshot= await get(attendanceRef)
        if (snapshot.exists()) {
            dayAttendance = snapshot.val(); // Retrieve the attendance from Firebase
        } else {
            dayAttendance = {}; // No attendance data, set empty object
        }
        //initializeCheckboxes(); // Update checkbox states after retrieving data
  return dayAttendance;
}

// Function to save the attendance for the day to Firebase
function saveAttendanceForDate(date, attendance) {
    const attendanceRef = ref(db,'Attendance/'+subCode+'/'+ date);
    set(attendanceRef,attendance).then(() => {
        console.log("Attendance saved successfully!");
        alert("Attendance has been saved!");
    }).catch(error => {
        console.error("Error saving attendance: ", error);
    });
}


async function getStudentByRfid(rfid) {
    var snap=await get(ref(db,"Students/"+rfid));
    if(snap.exists())
    return snap.val();
    return null;
}


async function getStudents(attendance) {
   subject= await getSubject();
   console.log(subject);
    for (const rfid of subject["students"]) {
        const student = await getStudentByRfid(rfid);
        if (student) {
            students[rfid] = student;  // Add the student to the students object
        }
    }
    
    console.log(students);
    return students;
}


function displayStudents() {
    const tbody = document.querySelector("#attendanceTable tbody");
    tbody.innerHTML = ""; // Clear any existing rows

    // Loop through the dayAttendance object
    Object.keys(students).forEach(rfid => {
        const student = students[rfid];

        if (student) {
            // Create a new row for the student
            const row = document.createElement("tr");

            // Create columns for the student's details
            const nameCell = document.createElement("td");
            nameCell.textContent = student.name; // Assuming student object has a 'name' field
            row.appendChild(nameCell);

            const rollNoCell = document.createElement("td");
            rollNoCell.textContent = student.rollno; // Assuming student object has a 'rollNo' field
            row.appendChild(rollNoCell);

            const presentCell = document.createElement("td");

            // Create a checkbox for attendance
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.setAttribute("data-rfid", rfid);
            if((dayAttendance[rfid]==undefined))
            dayAttendance[rfid]=true;
            checkbox.checked = dayAttendance[rfid]; // Set checkbox state based on attendance

            // Add event listener to toggle attendance when checkbox changes
            checkbox.addEventListener("change", function () {
                dayAttendance[rfid] = this.checked; // Update attendance status
            });

            presentCell.appendChild(checkbox);
            row.appendChild(presentCell);

            // Append the row to the table body
            tbody.appendChild(row);
        }
    });
}



// Add submit button functionality to save the attendance when clicked
document.addEventListener("DOMContentLoaded", function () {
   subCode =sessionStorage.getItem("subCode");
   console.log(subCode);
   const isLoggedIn=sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
        window.location.href = "../html/login.html"; // Redirect to login page
      }
    // Add submit button functionality to save the attendance when clicked
    document.getElementById("saveButton").addEventListener("click", function () {
        saveAttendanceForDate(date, dayAttendance); // Save updated attendance to Firebase
    });

    const datepicker = document.getElementById("datepicker");
    datepicker.value=date;
            datepicker.addEventListener("change", function () {
                date = this.value;
                console.log("Selected date:", date);
                retrieveAttendanceForDate(date).then(function(){
                    displayStudents()
                    console.log(dayAttendance);
                }) ;// Fetch and display attendance for selected date
               
            });

    retrieveAttendanceForDate(date).then(function() {
        console.log(dayAttendance);
        return getStudents(dayAttendance);
    }).then(function(){
        displayStudents();
    });
});
