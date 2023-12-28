document.addEventListener('DOMContentLoaded', () => {
    // Fetch data from the API
    fetch('http://localhost/MasterPeice/MASTER/userread.php')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Handle the data and dynamically populate the table
            const userTableBody = document.getElementById('userTableBody');
            data.forEach(users => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${users.id}</td>
                    <td>${users.name}</td>
                    <td>${users.email}</td>
                    <td>${users.password}</td>
                    <td>${users.role_id}</td>
                    <td class="edit"><a href="/crud dashboard (2)/crud dashboard/weblab/UserUpdate.html?id=${users.id}"><i class="fa-solid fa-pen"></i></a></td>
                    <td colspan="2" class="delete"> <i class="fa-solid fa-trash" onclick="deleteUser(${users.id})"></i></td>
                    `;
                userTableBody.appendChild(row)
            })
        })
        .catch(error => console.error('Error fetching data:', error));
})


function deleteUser(userId) {
    console.log('568869::', userId);
    const confirmation = confirm('Are you sure you want to delete this product?');
    if (!confirmation) {
        return;
    }
    fetch('http://localhost/MasterPeice/MASTER/userdelete.php', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userId }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('User deleted:', data);
        // Remove the deleted row from the table
        location.reload()
    })
    .catch(error => {
        console.error('Error:', error);
    })
  }
  
  
  //Select user to edit in the userEdit:
// function editUser(id){
//     // console.log("ID", id);
//     fetch(`http://localhost/MasterPeice/MASTER/userread.php?id=${id}`, {
//           method: 'GET',
//           headers: {
//               'Content-Type': 'application/json',
//           }
   
//       })
//       .then(response => {
//                       if (!response.ok) {
//                           throw new Error('Network response was not ok');
//                       }
//                       return response.json();
//                   })
//                   .then(responseData => {
//                       // to get the data from the response
//                       console.log(responseData.id)
//                       console.log(responseData);
//             localStorage.setItem('editedUserData', JSON.stringify(responseData));
//             window.location.href = './userEdit.html';
//                   })
//                   .catch(error => {
//                       console.error('Error making POST request:', error);
//                   });
//   }
