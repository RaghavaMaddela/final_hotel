document.addEventListener("DOMContentLoaded", function () {
    let signup = document.querySelector(".signup");
    let login = document.querySelector(".login");
    let slider = document.querySelector(".slider");
    let formSection = document.querySelector(".form-section");
    
    signup.addEventListener("click", () => {
        slider.classList.add("moveslider");
        formSection.classList.add("form-section-move");
    });
    
    login.addEventListener("click", () => {
        slider.classList.remove("moveslider");
        formSection.classList.remove("form-section-move");
    });
    
  
    // Signup functionality
    document.querySelector(".signup-box .clkbtn").addEventListener("click", function () {
        let name = document.querySelector(".signup-box .name").value;
        let email = document.querySelector(".signup-box .email").value;
        let password = document.querySelector(".signup-box .password").value;
        let confirmPassword = document.querySelectorAll(".signup-box .password")[1].value;
  
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
  
        let user = { name, email, password };
        localStorage.setItem(email, JSON.stringify(user));
        alert("Signup successful! You can now log in.");
    });
  
    // Login functionality
    document.querySelector(".login-box .clkbtn").addEventListener("click", function () {
        let email = document.querySelector(".login-box .email").value;
        let password = document.querySelector(".login-box .password").value;
  
        let storedUser = localStorage.getItem(email);
        if (!storedUser) {
            alert("User not found. Please sign up first.");
            return;
        }
  
        let user = JSON.parse(storedUser);
        if (user.password === password) {
            localStorage.setItem("currentUser", email);
            window.location.href = "table.html";
        } else {
            alert("Incorrect password. Try again.");
        }
    });
  
    
  });