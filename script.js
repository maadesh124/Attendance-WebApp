

  document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let errorMessage = document.getElementById("error-message");

    if (username === "admin" && password === "1234") {
        sessionStorage.setItem("isLoggedIn", "true");
        alert("Login successful!");
        window.location.href = "./html/AdminPage.html";
    } else {
        errorMessage.textContent = "Invalid username or password.";
    }
  });



