document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password1").value;

    // Validation
    var emailError = "";
    var passwordError = "";
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (email.trim() === "") {
        emailError = "Email is required";
    } else if (!emailPattern.test(email)) {
        emailError = "Please enter a valid email address";
    }
    if (password.trim() === "") {
        passwordError = "Password is required";
    } else if (password.length < 6 || password.length > 18) {
        passwordError = "Password should be between 6-18 characters";
    }
    document.getElementById('email-check').innerHTML = emailError;
    document.getElementById('pass-check').innerHTML = passwordError;
    
    if (emailError !== "" || passwordError !== "") {
        return;
    }

    // Send the username and password to the server for authentication
    var user = { email: email, password: password };

    fetch("http://localhost/MasterPeice/MASTER/login.php", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" }
    })
    .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then(data => {
        console.log(data);
    
        let role = data.ROLE; // Access the role from the response
    
        if (data.STATUS === true) {
            if (role === 1) {
                sessionStorage.setItem("isLoggedIn", "true");
                sessionStorage.setItem("role", data.ROLE);
                sessionStorage.setItem("id", data.USER_ID);
                window.location.href = '/crud dashboard (2)/crud dashboard/weblab/User.html';
            } else if (role === 2) {
                sessionStorage.setItem("isLoggedIn", "true");
                sessionStorage.setItem("id", data.USER_ID);
                window.location.href = '/Home/index.html';
            } else if (role === 3) {
                sessionStorage.setItem("isLoggedIn", "true");
                sessionStorage.setItem("id", data.USER_ID);
                window.location.href = '/AdminProfile/Admin1.html';
            } else {
                alert('Error: Invalid user role');
            }
        } else {
            alert('Error: Status is not true');
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
    

    });
   
    
