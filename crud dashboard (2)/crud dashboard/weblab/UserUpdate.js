document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    console.log('userId:', userId);

    // Fetch user data based on the ID for updating
    fetch('http://localhost/MasterPeice/MASTER/userread.php', {
        method: 'POST',  // Change the request method to POST
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),  // Pass the user ID as POST data
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Server response:', data);
            // Populate the update form with the existing user data
            document.getElementById('name').value = data.name;
            document.getElementById('email').value = data.email;
            document.getElementById('password').value = data.password;
            document.getElementById('role').value = data.role_id;
        })
        .catch(error => console.error('Error:', error));

    // Add event listener to Save Changes button
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', () => {
        const formData = {
            id: userId,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            role_id: document.getElementById('role').value
        };

        // Send the updated data to the server using the PUT method
        fetch('http://localhost/MasterPeice/MASTER/userupdate.php', {
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
            return response.json();
        })
        .then(responseData => {
            console.log(responseData);
            window.location.href = "/crud dashboard (2)/crud dashboard/weblab/User.html";
        })
        .catch(error => console.error('Error updating user data:', error));
    });
});
