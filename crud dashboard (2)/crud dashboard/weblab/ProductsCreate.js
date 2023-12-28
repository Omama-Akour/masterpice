document.getElementById('updateProductForm').addEventListener('submit', function(event) {
    // Prevent the default form submission
    event.preventDefault();

    // Assuming you have an API endpoint for creating a new product
    const apiEndpoint = 'http://localhost/MasterPeice/MASTER/products_creat.php';

    // Get form values
    const name = document.getElementById('name').value;
    const image = document.getElementById('image').files[0];
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const category_id = document.getElementById('category_id').value;

    // Create a FormData object to send to the API
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category_id', category_id);

    // Make a POST request to the API using FormData
    fetch(apiEndpoint, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the API
        console.log('Success:', data);
        // window.location.href = '/crud dashboard (2)/crud dashboard/weblab/Products.html';
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
