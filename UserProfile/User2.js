
document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Check if user is logged in
        if (sessionStorage.getItem("id")) {
            const userId = sessionStorage.getItem("id");
  
            // Fetch user data using the API
            const responseUserData = await fetch("http://localhost/MasterPeice/MASTER/userprofile.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: userId }),
            });
  
            if (!responseUserData.ok) {
                throw new Error(`Failed to fetch user data. Status: ${responseUserData.status}`);
            }
  
            const userData = await responseUserData.json();  
          // Display user data
          //  document.getElementById("userImage").src = userData.imageURL;
            document.getElementById("usernameContainer").value = userData.name;
            document.getElementById("emailContainer").value = userData.email;
            document.getElementById("currentPasswordInput").value = userData.password;
        }
  
        // Add an event listener to the "Save changes" button
        const updateBtn = document.getElementById('updateBtn');
        updateBtn.addEventListener("click", async () => {
            // Get the updated user data from the input fields
            const updatedData = {
              id: sessionStorage.getItem("id"),
              // image: document.querySelector("#userImage").src,
              name: document.querySelector("#usernameContainer").value,
              email: document.querySelector("#emailContainer").value,
              password: document.querySelector("#currentPasswordInput").value,
            };
  
            // Log the updated data to the console for debugging
            console.log("Updated Data:", updatedData);
  
            // Send the updated data to the server for editing
            const responseUpdate = await fetch("http://localhost/MasterPeice/MASTER/edit_userprofile.php", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });
  
            if (!responseUpdate.ok) {
                throw new Error(`Failed to update user profile. Status: ${responseUpdate.status}`);
            }
  
            const updateData = await responseUpdate.json();
            console.log("Profile updated successfully:", updateData);
  
            // Handle the success response here (e.g., show a success message)
        });
    } catch (error) {
        console.error("Error:", error);
        // Handle the error here (e.g., show an error message to the user)
    }
  });
  
  
  