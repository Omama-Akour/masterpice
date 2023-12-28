// document.getElementById('updateCategory').addEventListener('click', function () {
//     // Get category name and id from the form
//     const categoryName = document.getElementById('category_name').value;
//     const categoryId = document.getElementById('category_id').value;

//     // Check if category name is not empty
//     if (!categoryName) {
//         alert('Category name cannot be empty.');
//         return;
//     }

//     // Create the request body
//     const requestBody = JSON.stringify({
//         name: categoryName,
//         id: categoryId
//     });

//     // Make a fetch request to update the category
//     fetch('https://your-api-endpoint.com/update-category.php', {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: requestBody
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             alert(data.success);
//             // You can perform additional actions here if needed
//         } else {
//             alert(data.error || 'Failed to update category.');
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// });


document.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault();  // Add this line to prevent default form submission behavior

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Fetch product data based on the ID for updating
    fetch(`http://localhost/MasterPeice/MASTER/category_read.php`,{
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
            // Populate the update form with the existing product data
            document.getElementById('category_name').value = data.name;
           
        })
        .catch(error => console.error('Error fetching product data:', error));

    // Add event listener to Save Changes button
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', () => {
        const formData = {
            id: productId,
            name: document.getElementById('category_name').value,
           
        };

        // Send the updated data to the server using the PUT method
        fetch('http://localhost/MasterPeice/MASTER/category_update.php', {
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
            window.location.href = "/crud dashboard (2)/crud dashboard/weblab/Category.html";
        })
        .catch(error => console.error('Error updating product data:', error));
    });
});

