window.addEventListener("scroll", function(){
    const header = document.querySelector('#header');
    if(this.window.scrollY > 0){
        header.classList.add('scrolled')
    } else {
        header.classList.remove('scrolled')
    }
});

function fetchProducts() {
    const userId = sessionStorage.getItem('id');

    if (!userId) {
        console.error('User ID not found in sessionStorage');
        return;
    }

    const apiUrl = 'http://localhost/MasterPeice/MASTER/cart_read.php';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json', // Add this line if you expect JSON response
        },
        body: JSON.stringify({ id: userId })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (Array.isArray(data)) {
            const productContainer = document.getElementById('products-cards');

            // Initialize total to 0
            let total = 0;

            data.forEach(product => {
                const card = document.createElement('tr');
                card.className = 'pro';
                card.innerHTML =
                `
                <td> <button class="deleteFromCart" data-product-id="${product.id}"><i class="fa-solid fa-trash"></i></button> </td>
                <td> <img src="/img/${product.image}" alt="" class="imgcart"> </td>
                <td> ${product.name} </td>
                <td> ${product.price}</td>
                <td class="quantity-container">
                    <button data-product-id="${product.id}" class="quantity-button decrement-button">-</button>
                    <span id="quantity">${product.quantity}</span>
                    <button data-product-id="${product.id}" class="quantity-button increment-button">+</button>
                </td>
                `;

                // Update total for each product
                total += parseFloat(product.price) * parseInt(product.quantity, 10);

                productContainer.appendChild(card);
            });

            // Update the total in your HTML
            const totalCartElement = document.getElementById('totalCart');
            const totalCartElement1 = document.getElementById('totalCart1');
            totalCartElement.textContent = `${total.toFixed(2)} JD`;
            totalCartElement1.textContent = `${total.toFixed(2)} JD`;

            const checkoutButton = document.getElementById('checkoutButton');
            checkoutButton.addEventListener('click', () => {
                // Check if the cart is empty
                const productContainer = document.getElementById('products-cards');
                if (productContainer.children.length === 0) {
                    console.log('Cart is empty. Cannot proceed to checkout.');
                    // Optionally, display a message to the user indicating that the cart is empty.
                } else {
                    // If the cart is not empty, redirect to the checkout page
                    window.location.href = '/Checkout/checkout.html';
                }
            });


            const deleteButtons = document.querySelectorAll('.deleteFromCart');
            deleteButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const productId = button.dataset.productId;
                    deleteProduct(userId, productId);
                });
            });

            // Add event listeners to increment and decrement buttons
            const incrementButtons = document.querySelectorAll('.increment-button');
            incrementButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const productId = button.dataset.productId;
                    incrementQuantity(productId);
                });
            });

            const decrementButtons = document.querySelectorAll('.decrement-button');
            decrementButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const productId = button.dataset.productId;
                    decrementQuantity(productId);
                });
            });
        } else {
            console.error('Invalid response format. Expected an array.');
        }
    })
    .catch(error => console.error('Error fetching data:', error));
}

function incrementQuantity(productId) {
    const userId = sessionStorage.getItem('id');
    if (!userId) {
        console.error('User ID not found in sessionStorage');
        return;
    }

    const apiUrl = 'http://localhost/MasterPeice/MASTER/cart_add.php';
    const requestData = {
        user_id: userId,
        id: productId,
        AddorSub: 'add'
    };

    fetch(apiUrl, {
        method: 'POST', // Assuming you are using POST method for increment
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        // After incrementing, you may want to refresh the product list or update the quantity display
        location.reload()
    })
    .catch(error => console.error('Error incrementing quantity:', error));
}

function decrementQuantity(productId) {
    const userId = sessionStorage.getItem('id');
    if (!userId) {
        console.error('User ID not found in sessionStorage');
        return;
    }

    const apiUrl = 'http://localhost/MasterPeice/MASTER/cart_add.php';
    const requestData = {
        user_id: userId,
        id: productId,
        AddorSub: 'Sub'
    };

    fetch(apiUrl, {
        method: 'POST', // Assuming you are using POST method for decrement
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        // After decrementing, you may want to refresh the product list or update the quantity display
        location.reload()
    })
    .catch(error => console.error('Error decrementing quantity:', error));
}

function deleteProduct(userId, productId) {
    const apiUrl = 'http://localhost/MasterPeice/MASTER/cart_delete.php';

    fetch(apiUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ user_id: userId, id: productId })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        // You may want to refresh the product list after deletion
        location.reload();
    })
    .catch(error => console.error('Error deleting product:', error));
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


fetchProducts();


// function checkout //
function checkout(userId) {
    const apiUrl = 'http://localhost/MasterPeice/MASTER/cheackout.php';

    const requestData = {
        id: userId,
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Order placed successfully.');
            // Optionally, you may want to redirect the user to a confirmation page or display a success message.
        } else if (data.error) {
            console.error('Error during checkout:', data.error);
            // Optionally, you may want to display an error message to the user.
        }
        // You may want to refresh the product list after 
        location.reload();
    })
    .catch(error => console.error('Error during checkout:', error));
}

function loCreload(){
    location.reload();
}

