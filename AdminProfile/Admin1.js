let signupButtonNav = document.getElementById('signupButtonNav');

let loginButtonNav = document.getElementById('loginButtonNav');

// Check if the user is logged in
const isLoggedIn = sessionStorage.getItem('isLoggedIn');
console.log("isLoggedIn:", isLoggedIn);
let carticon = document.getElementById("carticon");

if (isLoggedIn === 'true') {
// Change text and behavior for logged-in users
loginButtonNav.textContent = 'Profile';
signupButtonNav.textContent = 'Log out';

signupButtonNav.addEventListener('click', (e) => {
    sessionStorage.clear(); 
    window.location.href = '/Home/index.html';
    sessionStorage.setItem("isLoggedIn", "false");
});

loginButtonNav.addEventListener('click', (e) => {
    // Log out logic
    window.location.href = '/AdminProfile/Admin1.html';
});
} else {
carticon.style.display = "none";
signupButtonNav.addEventListener('click', (e) => {
    window.location.href = "/signup/signup.html";
});

loginButtonNav.addEventListener('click', (e) => {
    window.location.href = "/login/login.html";
});  // Logic for non-logged-in users
}


///////////////////////

document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch data from API
    function fetchData(url, method, data) {
        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .catch(error => console.error('Error fetching data:', error));
    }
        const doctor = sessionStorage.getItem('id')


    // Fetch data for a specific user ID using POST method
    const postData = { user_id: doctor }; // Replace with the actual user_id
    fetchData('http://localhost/MasterPeice/MASTER/doctors_read.php', 'POST', postData)
        .then(data => {
            
            // Assuming data is an array
            console.log(data)
            document.getElementById('profileImage').src = `/img/${data.image}`; // Update the image source

                document.getElementById('usernameValue').innerText = data.name;
                document.getElementById('emailValue').innerText = data.email;
                document.getElementById('passwordValue').innerText = data.password;
                document.getElementById('specValue').innerText = data.specialization;
                document.getElementById('descValue').innerText = data.description;
  
        });
});
