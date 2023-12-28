document.addEventListener('DOMContentLoaded', function () {
    fetchOrders();
});

function fetchOrders() {
    fetch('http://localhost/MasterPeice/MASTER/orders_read.php', {
        method: 'GET', // Use 'POST' if needed
        headers: {
            'Content-Type': 'application/json',
        },
        // You can add more options like body for POST requests
    })
    .then(response => response.json())
    .then(data => {
        // Handle the data and populate the table
        populateTable(data);
    })
    .catch(error => {
        console.error('Error fetching orders:', error);
    });
}

function populateTable(data) {
    const tableBody = document.getElementById('orderTableBody');
    
    data.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${order.id}</td> 
                        <td>${order.name}</td>
                        <td id="total_price">${order.total_price} JD</td>
                        <td id="total_price">${order.created_at} </td>
                        `;
                        ;
        tableBody.appendChild(row);
    });
}