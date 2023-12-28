document.addEventListener("DOMContentLoaded", function () {
    // Check if user is logged in 
    if (sessionStorage.getItem("id")) {
      const userId = sessionStorage.getItem("id");
  
      console.log("Fetching user data for ID:", userId);
  
      fetch("http://localhost/MasterPeice/MASTER/userprofile.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Received user data:", data);
  
        // Display user data
        // document.getElementById("profileImage").src = data.image;
        document.getElementById("title").innerText =
        "Welcome " + data.name;
        document.getElementById("username").innerText =
          "Username: " + data.name;
          
          
        document.getElementById("email").innerText =
          "Email: " + data.email;
  
        document.getElementById("password").innerText =
        "Password: " + data.password;
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    } else {
      console.log("User is not logged in.");
    }
  });
  
  