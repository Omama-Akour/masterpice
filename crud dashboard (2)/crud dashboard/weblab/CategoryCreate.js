document.getElementById('addCategory').addEventListener('click', function() {
    var categoryName = document.getElementById('category_name').value;

    // Check if the category name is not empty
    if (categoryName.trim() !== '') {
        // Prepare data to be sent
        var data = {
            name: categoryName
        };

        // Make a POST request using fetch
        fetch('http://localhost/MasterPeice/MASTER/category_post.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server
            if (data.message) {
                alert(data.message);
                window.location.href="/crud dashboard (2)/crud dashboard/weblab/Category.html";
            } else if (data.error) {
                alert(data.error);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } else {
        alert('Please enter a category name.');
    }
});