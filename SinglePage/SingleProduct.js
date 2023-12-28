document.addEventListener("DOMContentLoaded", async function () {
    // Fetch product details using the product ID from the hash
    const productId = window.location.hash.substring(1);

    try {
        const response = await fetch('http://localhost/MasterPeice/MASTER/products_read.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: productId
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        document.getElementById('Mainimg').src = `/img/${data.image}`; // Update the image source
        document.querySelector('#prodetails h4').innerText = data.name; // Update product name
        document.querySelector('#prodetails h3').innerText = `${data.price} JD`; // Update product price
        document.querySelector('#prodetails #desc').innerText = data.description; // Update product description
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
});

function incrementQuantity() {
    var quantityElement = document.getElementById('quantity');
    var currentQuantity = parseInt(quantityElement.innerText, 10);
    quantityElement.innerText = currentQuantity + 1;
}

function decrementQuantity() {
    var quantityElement = document.getElementById('quantity');
    var currentQuantity = parseInt(quantityElement.innerText, 10);
    if (currentQuantity > 1) {
        quantityElement.innerText = currentQuantity - 1;
    }
}

async function addToCart() {
    // Retrieve user_id from the session
    const user_id = sessionStorage.getItem('id');

    // Check if the user is logged in
    if (!user_id) {
        // Redirect to the login page or show a message
        window.location.href = '/login/login.html';
        return;
    }

    // Retrieve product_id from the URL hash
    const productId = window.location.hash.substring(1);

    // Get selected quantity
    const selectedQuantity = parseInt(document.getElementById("quantity").innerText, 10);

    try {
        const response = await fetch('http://localhost/MasterPeice/MASTER/cart_add.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: user_id,
                id: productId,
                AddorSub: 'add',
                quantity: selectedQuantity,
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Product added to cart:', data);
        alert('Added to cart'); // You can update the UI or show a success message here if needed

    } catch (error) {
        console.error('Error adding product to cart:', error);
        // Handle error as needed
    }
}

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
