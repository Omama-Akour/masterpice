document.getElementById('add').addEventListener('click', function () {
    // Prevent the default button behavior
    event.preventDefault();

    // Assuming you have an API endpoint for creating a new doctor
    const apiEndpoint = 'http://localhost/MasterPeice/MASTER/doctors_create.php';

    // Get form values
    const image = document.getElementById('doctorImage').files[0];
    const specialization = document.getElementById('doctorSpecialization').value;
    const description = document.getElementById('doctorDescription').value;
    const name = document.getElementById('doctorName').value;
    const email = document.getElementById('doctorEmail').value;
    const password = document.getElementById('doctorPassword').value;

    // Create a FormData object to send to the API
    const formData = new FormData();
    formData.append('image', image);
    formData.append('specialization', specialization);
    formData.append('description', description);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);

    // Make a POST request to the API using FormData
    fetch(apiEndpoint, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the API
        console.log('Success:', data);
        window.location.href = '/crud dashboard (2)/crud dashboard/weblab/Doctor.html';
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
