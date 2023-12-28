document.addEventListener('DOMContentLoaded', () => {
    event.preventDefault();  // Add this line to prevent default form submission behavior

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    console.log(productId);

    // Fetch product data based on the ID for updating
    fetch(`http://localhost/MasterPeice/MASTER/products_read.php`, {
        method: 'POST',  // Change the request method to POST
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: productId }),  // Pass the user ID as POST data
         })
    
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Server response:', data);
            // Populate the update form with the existing product data
            document.getElementById('name').value = data.name;
            // document.getElementById('image').value = data.image;
            document.getElementById('description').value = data.description;
            document.getElementById('price').value = data.price;
            document.getElementById('category_id').value = data.category_id;
        })
        .catch(error => console.error('Error fetching product data:', error));

    // Add event listener to Save Changes button
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', () => {
        const formData = {
            id: productId,
            name: document.getElementById('name').value,
            // image: document.getElementById('image').value,
            description: document.getElementById('description').value,
            price: document.getElementById('price').value,
            category_id: document.getElementById('category_id').value
        };

        // Send the updated data to the server using the PUT method
        fetch('http://localhost/MasterPeice/MASTER/products_update.php', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Assuming your server returns JSON on success
        })
        .then(responseData => {
            console.log(responseData);
            // Redirect to the products page after successful update
            window.location.href = "/crud dashboard (2)/crud dashboard/weblab/Products.html";
        })
        .catch(error => console.error('Error updating product data:', error));
    });
});
