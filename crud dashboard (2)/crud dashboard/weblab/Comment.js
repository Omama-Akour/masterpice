async function fetchComments() {
    try {
        const response = await fetch('http://localhost/MasterPeice/MASTER/comment_read.php');

        if (!response.ok) {
            throw new Error(`Failed to fetch comments. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        const commentContainer = document.querySelector('tbody');
        commentContainer.innerHTML = ''; // Clear existing content

        data.forEach(comment => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${comment.id}</td>
                <td>${comment.user_name}</td>
                <td>${comment.comment}</td>
                <td>${comment.created_at}</td>
                <td class="delete"><i class="fa-solid fa-trash" onclick="deleteComment(${comment.id})"></i></td>
            `;
            
            commentContainer.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching comments:', error.message);
    }
}

async function deleteComment(id) {
    const confirmation = confirm('Are you sure you want to delete this comment?');
    
    if (!confirmation) {
        return;
    }

    try {
        const response = await fetch('http://localhost/MasterPeice/MASTER/comment_delete.php', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        });

        if (!response.ok) {
            throw new Error(`Failed to delete comment. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Comment deleted successfully:', data);

        // You may want to update the UI or fetch the comments again to refresh the table
        fetchComments();
    } catch (error) {
        console.error('Error deleting comment:', error.message);
    }
}

// Initial fetch
fetchComments();
