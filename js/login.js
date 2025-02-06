import {initializeConnection} from "../connection.js";
import {ref,get} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
const {app,db}=initializeConnection();

var isLoggedIn=false;
var subCode=null;
var subject=null;


async function getSubject(){
    var snap=await get(ref(db,"Subjects/"+subCode)) ;
    if(snap.exists())
    subject=snap.val();
    return subject;
}






document.addEventListener("DOMContentLoaded", function() {
    let selectedRole = null;

    document.getElementById("adminBtn").addEventListener("click", function() {
        selectedRole = "admin";
        highlightSelection(this);
    });

    document.getElementById("teacherBtn").addEventListener("click", function() {
        selectedRole = "teacher";
        highlightSelection(this);
    });

    function highlightSelection(selectedButton) {
        document.getElementById("adminBtn").style.opacity = "0.5";
        document.getElementById("teacherBtn").style.opacity = "0.5";
        selectedButton.style.opacity = "1";
    }

    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const errorMessage = document.getElementById("error-message");

        if (!selectedRole) {
            errorMessage.innerText = "Please select a role!";
            errorMessage.style.display = "block";
            return;
        }

        if (username === "admin" && password === "1234" && selectedRole === "admin") {
            sessionStorage.setItem("isLoggedIn", "true");
            window.location.href = "AdminPage.html";
        } else if (selectedRole === "teacher") {
            subCode = username;
    
            
            getSubject().then(() => {
                if (subject != null && subject["password"] === password) {
                    sessionStorage.setItem("isLoggedIn", "true");
                    sessionStorage.setItem("subCode", subCode);
                    
                    window.location.href = "TeacherPage.html";
                } else {
                    errorMessage.innerText = "Invalid credentials!";
                    errorMessage.style.display = "block";
                }
            });
        } else {
            errorMessage.innerText = "Invalid credentials!";
            errorMessage.style.display = "block";
        }
    });
});

export {subCode};