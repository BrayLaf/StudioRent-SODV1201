$(function () {
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");
    const dropdown = document.querySelector(".dropdown");

    // Toggle burger menu on click
    mobileMenu.addEventListener("click", function () {
        navLinks.classList.toggle("active");
        mobileMenu.classList.toggle("active");
    });

    // Toggle dropdown menu on click
    dropdown.addEventListener("click", function (event) {
        event.stopPropagation();
        dropdown.classList.toggle("open");
    });

    // Close the dropdown if clicking outside of it
    document.addEventListener("click", function (event) {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove("open");
        }
    });

    // Popup login when prompted
    $(".loginButton").click(function(){
        $(".login-container").show();
    });

    // Toggle between login and signup
    $(".signup").click(function(){
        if($(".login-container").is(":visible")){
            $(".signup-container").show();
            $(".login-container").hide();
        } else {
            $(".login-container").show();
            $(".signup-container").hide();
        }
    });

    // User object constructor
    function User(name, email, number, studios) {
        this.name = name;
        this.email = email;
        this.number = number;
        this.Studios = studios;
    }

    // Array of users
    let UserArray = [];

    // Create new user when form is submitted
    $('#signup-form').submit((e) => {
        e.preventDefault();
        let studios = [];
        const data = Object.fromEntries(new FormData(e.target).entries());
        console.log(data);
        const newUser = new User(data.uname, data.email, data.phoN, studios);
        console.log(newUser);
        UserArray.push(newUser);
        $(".signup-container").hide();
    });

    // Login user when form is submitted
    $('#login-form').submit((e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target).entries());
        console.log(data);
        let userFound = false;
        UserArray.forEach(element => {
            if (element.email === data.email) {
                $(".login-container").hide();
                console.log("User logged in");
                userFound = true;
            }
        });
        if (!userFound) {
            console.log("No such user exists");
        }
    });
    $(document).ready(function () {
        // Studio Data
        const studioData = {
          recording: [
            { img: "/assets-images/studio 2/interior2.1.jpg" },
            { img: "/assets-images/studio 3/interior3.2.jpg" },
            { img: "/assets-images/studio 2/interior2.2.jpg" },
            { img: "/assets-images/studio 1/interior1.4.jpg" },
            { img: "/assets-images/studio 1/interior1.2.jpg" },
            { img: "/assets-images/studio 3/interior3.4.jpg" },
          ],
          photography: [
            { img: "/assets-images/studio 3/exterior3.4.jpg" },
            { img: "/assets-images/studio 2/exterior1.2.jpg" },
            { img: "/assets-images/studio 2/interior2.3.jpg" },
            { img: "/assets-images/studio 3/exterior4.1.jpg" },
            { img: "/assets-images/studio 3/interior3.1.jpg" },
            { img: "/assets-images/studio 2/interior2.1.jpg" },
          ],
          film: [
            { img: "/assets-images/studio 2/interior2.1.jpg" },
            { img: "/assets-images/studio 3/interior1.2.jpg" },
            { img: "/assets-images/studio 2/interior3.2.jpg" },
            { img: "/assets-images/studio 1/interior1.4.jpg" },
            { img: "/assets-images/studio 1/interior2.2.jpg" },
            { img: "/assets-images/studio 3/interior3.4.jpg" },
          ],
          podcast: [
            { img: "/assets-images/studio 2/interior2.3.jpg" },
            { img: "/assets-images/studio 3/interior3.4.jpg" },
            { img: "/assets-images/studio 2/interior2.5.jpg" },
            { img: "/assets-images/studio 1/interior1.3.jpg" },
            { img: "/assets-images/studio 1/interior1.2.jpg" },
            { img: "/assets-images/studio 3/interior3.1.jpg" },
          ],
        };
      
        // Function to Update Studios
        function updateStudios(category) {
          let grid = $("#mostViewedGrid");
          grid.empty(); // Clear existing content
      
          studioData[category].forEach((studio) => {
            grid.append(`
              <div class="mostViewedCard">
                <img src="${studio.img}" alt="mostViewed">
                <span>Featured</span>
              </div>
            `);
          });
        }
      
        // Click event on filter buttons
        $(".studio-filter a").click(function (e) {
          e.preventDefault();
      
          $(".studio-filter a").removeClass("active");
          $(this).addClass("active");
      
          let category = $(this).data("category");
          updateStudios(category);
        });
      
        // Load default category
        updateStudios("recording");
      });      

});
