document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('updateProductForm');
    const addButton = document.getElementById('add');

    addButton.addEventListener('click', () => {
        // Create FormData object from the form
        const formData = new FormData(form);

        // Convert FormData to a plain JavaScript object
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Make a POST request to the PHP script
        fetch('http://localhost/MasterPeice/MASTER/userinsert.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            window.location.href = '/crud dashboard (2)/crud dashboard/weblab/User.html';

        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors, e.g., show an error message to the user
        });
    });
});