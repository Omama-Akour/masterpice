async function fetchProducts() {
    try {
        const response = await fetch('http://localhost/MasterPeice/MASTER/doctors_read.php');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        const productContainer = document.querySelector('tbody');
        productContainer.innerHTML = ''; // Clear existing content

        data.forEach(users => {
            const card = document.createElement('tr');
            card.innerHTML = `
                <td>${users.user_id}</td>
                <td> <img src="/img/${users.image}" alt="" class="imgcart"> </td>
                <td>${users.specialization}</td>
                <td>${users.description}</td>
                <td>${users.name }</td>
                <td>${users.email }</td>
                <td>${users.password }</td>
                <td class="edit"><a href="/crud dashboard (2)/crud dashboard/weblab/DoctorUpdate.html?user_id=${users.user_id}"><i class="fa-solid fa-pen"></i></a></td>
                <td class="delete"><i class="fa-solid fa-trash" onclick="deleteProduct(${users.user_id})"></i></td>
            `;
            
            productContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


async function deleteProduct(id) {
    console.log(id)
    const confirmation = confirm('Are you sure you want to delete this product?');
    if (!confirmation) {
        return;
    }

    try {
        const response = await fetch('http://localhost/MasterPeice/MASTER/doctores_delete.php', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: id }), // Update key to user_id

        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(id)

        console.log('Product deleted successfully:', data);

        // You may want to update the UI or fetch the products again to refresh the table
        fetchProducts();
    } catch (error) {
        console.error('Error deleting product:', error);
    }
}


// Initial fetch
fetchProducts();
