async function fetchProducts() {
    try {
        const response = await fetch('http://localhost/MasterPeice/MASTER/drugs.php');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        const productContainer = document.querySelector('tbody');
        productContainer.innerHTML = ''; // Clear existing content

        data.forEach(doctors => {
            const card = document.createElement('tr');
            card.innerHTML = `
                <td>${doctors.name}</td>
                <td>${doctors.description}</td>
                <td>${doctors.price}</td>
            `;
            
            productContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}