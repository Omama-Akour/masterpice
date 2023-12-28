window.addEventListener("scroll", function(){
    const header = document.querySelector('#header');
    if(this.window.scrollY > 0){
        header.classList.add('scrolled')
    } else {
        header.classList.remove('scrolled')
    }

})


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
    window.location.href = '/UserProfile/User1.html';
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


document.getElementById('formComment').addEventListener('submit', function (e) {
    e.preventDefault();
    var id = sessionStorage.getItem('id');
    var comment = document.getElementById('textarea').value;
    console.log(id);

    if (id && comment) {
        console.log(id);
        console.log(comment);

        const data = {
            user_id: id,
            comment: comment
        };
        console.log(data);

        fetch('http://localhost/MasterPeice/MASTER/comment_create.php', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },

        })
            .then(response => {
                if (response.ok) {
                    alert(' Comment submitted successfully ');
                    // Clear the textarea after successful submission
                    document.getElementById('textarea').value = '';
                } else {
                    console.error('Failed to submit');
                }
            })
            .catch(error => console.error('Error during fetch:', error));
    } else {
        alert('please login to add comment');
    }
});
