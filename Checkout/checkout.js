function validateCardNumber() {
    var cardNumber = document.getElementById("cardNumber").value;
    var isValidCardNumber = /^\d{16}$/.test(cardNumber);
    displayValidationMessage("Card number must be 16 digits and contain only numbers.", isValidCardNumber);

    // Show how many digits are left
    var digitsLeft = 16 - cardNumber.length;
    var digitsLeftSpan = document.getElementById("digitsLeft");
    digitsLeftSpan.innerText = digitsLeft > 0 ? digitsLeft + " digits left" : "";
}

function validateCardHolder() {
    var cardHolder = document.getElementById("cardHolder").value;
    var isValidCardHolder = /^[a-zA-Z\s]+$/.test(cardHolder);
    displayValidationMessage("Card holder must contain only letters.", isValidCardHolder);
}

function validateDate() {
    var date = document.getElementById("date").value;
    var isValidDate = /^\d{4}$/.test(date);
    displayValidationMessage("Expiry date must be 4 digits (MMYY).", isValidDate);
}

function validateCVC() {
    var cvc = document.getElementById("cvc").value;
    var isValidCVC = /^\d{3}$/.test(cvc);
    displayValidationMessage("CVC must be 3 digits.", isValidCVC);
}

function displayValidationMessage(message, isValid) {
    var validationDiv = document.getElementById("validation");
    validationDiv.innerText = isValid ? "" : message;
}

function validateAndConfirmCheckout() {
    var cardNumber = document.getElementById("cardNumber").value;
    var cardHolder = document.getElementById("cardHolder").value;
    var date = document.getElementById("date").value;
    var cvc = document.getElementById("cvc").value;

    if (!cardNumber || !cardHolder || !date || !cvc) {
        alert("Please fill out all fields.");
        return;
    }

    validateCardNumber();
    validateCardHolder();
    validateDate();
    validateCVC();

    // Confirm checkout only if all validations pass
    var validationDiv = document.getElementById("validation");
    if (validationDiv.innerText === "") {
        validationDiv.innerText = "Checkout confirmed!";
        confirmCheckout();
    }
}

function confirmCheckout() {
    // Add your logic here to confirm the checkout
    alert("Checkout confirmed!");
    window.location.href="/Home/index.html";
}


// 

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








// //////////////////////////





const userId = sessionStorage.getItem('id');

fetch('http://localhost/MasterPeice/MASTER/orders_checkout.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id: userId }),
})
.then(response => response.json())
.then(data => {
    console.log('Data received from API:', data);
    document.getElementById('vat').innerText = `$${data.updated_at}`;

    document.getElementById('total').innerText = `$${data.total_price}`;
})
