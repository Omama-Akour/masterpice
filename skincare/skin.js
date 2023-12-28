let url = 'http://localhost/MasterPeice/MASTER/skincare.php';
let currentPage = 1;
const itemsPerPage = 8;

function fetchProducts() {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const productContainer = document.getElementById('pro-container');
      const searchInput = document.getElementById('searchInput');
      const priceRangeInput = document.getElementById('price-range');
      const minPriceSpan = document.getElementById('min-price');
      const maxPriceSpan = document.getElementById('max-price');
      const pagination = document.getElementById('pagination');

      const displayProducts = () => {
        const query = searchInput.value.toLowerCase();
        const minPrice = parseInt(priceRangeInput.value, 10);

        const filteredData = data.filter(product => {
          const nameMatches = product.product_name.toLowerCase().includes(query);
          const descriptionMatches = product.description.toLowerCase().includes(query);
          const priceMatches = product.price <= minPrice;

          return (nameMatches || descriptionMatches) && priceMatches;
        });

        // Clear product container and pagination content
        productContainer.innerHTML = '';
        pagination.innerHTML = '';

        // Calculate the start and end index for the current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        filteredData.slice(startIndex, endIndex).forEach(product => {
          const card = document.createElement('div');
          card.className = 'pro';
          card.innerHTML = `
            <img src="/img/${product.image}" alt=""/>
            <div class="des">
              <h3>${product.product_name}</h3>
              <p>${product.description.slice(0, 50)+"...etc"}</p>
              <h4>${product.price} JD</h4>
              <a id="tocartHome" href="/SinglePage/SingleProduct.html#${product.product_id}">
                <button class="viewBtn">View</button>
              </a>
            </div>
          `;
          productContainer.appendChild(card);
        });

        // Add dynamic pagination controls
        pagination.innerHTML += `
          <div class="pagination" id="pagination">
            ${generatePageNumbers(Math.ceil(filteredData.length / itemsPerPage))}
          </div>
        `;
      };

      // Add an event listener to the search input
      searchInput.addEventListener('input', displayProducts);

      // Add an event listener to the price range input
      priceRangeInput.addEventListener('input', () => {
        const minPrice = priceRangeInput.value;
        minPriceSpan.textContent = `Min Price: ${minPrice} JD`;
        displayProducts();
      });

      // Initial fetch and display
      displayProducts();
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Helper function to go to a specific page
function goToPage(pageNumber) {
  currentPage = pageNumber;
  fetchProducts();
}

// Helper function to generate dynamic page numbers
function generatePageNumbers(totalPages) {
  let pageNumbersHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    pageNumbersHTML += `
    <button onclick="goToPage(${i})" id="pagination_button">${i}</button>`;
  }
  return pageNumbersHTML;
}

fetchProducts();





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

window.addEventListener("scroll", function(){
    const header = document.querySelector('#header');
    if(this.window.scrollY > 0){
        header.classList.add('scrolled')
    } else {
        header.classList.remove('scrolled')
    }

})