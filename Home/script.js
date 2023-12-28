window.addEventListener("scroll", function(){
    const header = document.querySelector('#header');
    if(this.window.scrollY > 0){
        header.classList.add('scrolled')
    } else {
        header.classList.remove('scrolled')
    }

})

// Burger Menu
const menuBtn = document.querySelector(".menu-btn");
const navigation = document.querySelector(".navigation");
menuBtn.addEventListener("click", () =>{
    menuBtn.classList.toggle("active");
    navigation.classList.toggle("active");

})
function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'block'
}
function hideSiderbar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'

}

function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }

  window.addEventListener("scroll", reveal);



        const root = document.getElementById("player");

        // Create an iframe element to display the video.
        const iframe = document.createElement("iframe");


        // Add the iframe to the root.
        root.appendChild(iframe);

        var apikey = 'AIzaSyBKeNa--8qW05Ya3Mu2wxZljbcYAkc5a4g'
        var playlist = 'PLuVs8NnK8qQa5WKmRMQL90oEexz74W-Mu'
        // Fetch the playlist items for the given playlist ID.
        fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=7&playlistId=${playlist}&key=${apikey}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Get the list of playlist items.
                const playlistItems = data.items;

                // Set the default video to be the first playlist item.
                iframe.src = `https://www.youtube.com/embed/${playlistItems[0].snippet.resourceId.videoId}`;
                

            });

            function openQuiz() {
  window.open('quizJs.html', '_blank'); // '_blank' opens the URL in a new tab
}

    
    let signupButtonNav = document.getElementById('signupButtonNav');

    let loginButtonNav = document.getElementById('loginButtonNav');

   // Check if the user is logged in
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    console.log("isLoggedIn:", isLoggedIn);
    let carticon = document.getElementById("carticon");

if (isLoggedIn === 'true') {
    // Change text and behavior for logged-in users
    loginButtonNav.textContent = 'Profile';
    signupButtonNav.textContent = 'Log out';

    signupButtonNav.addEventListener('click', (e) => {
        sessionStorage.clear(); 
        window.location.href = '/Home/index.html';
        sessionStorage.setItem("isLoggedIn", "false");
    });

    loginButtonNav.addEventListener('click', (e) => {
        // Log out logic
        window.location.href = '/UserProfile/User1.html';
    });
} else {
    carticon.style.display = "none";
    signupButtonNav.addEventListener('click', (e) => {
        window.location.href = "/signup/signup.html";
    });

    loginButtonNav.addEventListener('click', (e) => {
        window.location.href = "/login/login.html";
    });  // Logic for non-logged-in users
}

async function commentRead() {
    try {
        const response = await fetch('http://localhost/MasterPeice/MASTER/comment_read.php', {
            method: 'GET',
        });

        if (!response.ok) {
            console.error('Error fetching data:', response.status);
            return;
        }

        const data = await response.json();
        console.log(data);

        const testimonialDiv = document.getElementById('inner');
        testimonialDiv.innerHTML = '';

        data.forEach(commentData => {
            var testimonialItem = document.createElement('div');
            testimonialItem.className = 'box';

            testimonialItem.innerHTML = `
                    <div class="client_info">
                        <div class="client_name">
                            <h5>${commentData.user_name}</h5>
                        </div>
                        <i class="fa fa-quote-left" aria-hidden="true"></i>
                    </div>
                    <p>${commentData.comment}</p>
                `;

            testimonialDiv.appendChild(testimonialItem);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

commentRead();
