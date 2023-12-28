window.addEventListener("scroll", function(){
    const header = document.querySelector('#header');
    if(this.window.scrollY > 0){
        header.classList.add('scrolled')
    } else {
        header.classList.remove('scrolled')
    }

})

const fetchDoctors = async () => {
    try {
        const response = await fetch('http://localhost/MasterPeice/MASTER/doctors_read.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const displayDoctors = async () => {
    const input = document.querySelector("#searchInput");
    const query = input.value.toLowerCase();

    const data = await fetchDoctors();

    const filteredData = data.filter((doctor) => {
        const nameMatches = doctor.name.toLowerCase().includes(query);
        const specializationMatches = doctor.specialization.toLowerCase().includes(query);

        return nameMatches || specializationMatches;
    });

    let doctorContainer = document.getElementById('doctorContainer');
    doctorContainer.innerHTML = '';

    filteredData.forEach(doctor => {
        let doctorCard = document.createElement('div');
        doctorCard.className = "card";
        doctorCard.innerHTML = `
            <div class="wrapper">
                <img src="/img/${doctor.image}" alt="">
                <h1>${doctor.name}</h1>
                <p>${doctor.specialization}<br/></p>
                <p>${doctor.description}<br/></p>
            </div>
            <div class="button-wrapper">
                <button class="button" onclick="go()">Go To Chat</button>
            </div>`;

        doctorContainer.appendChild(doctorCard);
    });
};

document.querySelector("#searchInput").addEventListener("input", displayDoctors);

// Initial fetch and display
fetchDoctors().then(displayDoctors);

function go(){
    window.location.href="/Chat/index.html"
}

////////////////////////////////////////////////////////////////

let signupButtonNav = document.getElementById('signupButtonNav');

let loginButtonNav = document.getElementById('loginButtonNav');

// Check if the user is logged in
const isLoggedIn = sessionStorage.getItem('isLoggedIn');
console.log("isLoggedIn:", isLoggedIn);
// let carticon = document.getElementById("carticon");

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
    window.location.href = '/UserProfile/User1.html';
});
} else {
// carticon.style.display = "none";
signupButtonNav.addEventListener('click', (e) => {
    window.location.href = "/signup/signup.html";
});

loginButtonNav.addEventListener('click', (e) => {
    window.location.href = "/login/login.html";
});  // Logic for non-logged-in users
}
