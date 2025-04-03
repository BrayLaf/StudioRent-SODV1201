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

      //overlay effect when login button is clicked
      let overlay = $("<div></div>").attr("id", "overlay").css({
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(5px)",
          zIndex: "99", 
          display: "none" 
      });
  
      $("body").append(overlay); // Append overlay to body
  
      // Show login popup when login button is clicked
      $(".loginButton").click(function () {
          $(".loginContainer").addClass("show");
          $("#overlay").fadeIn(); 
          $("html, body").animate({ scrollTop: 0 }, "slow"); 
      });
  
      $(".formClose, #overlay").click(function () {
          $(".loginContainer").removeClass("show");
          $("#overlay").fadeOut(); 
      });
  
      $("#signUp").click(function () {
          $(".loginForm").hide();
          $(".signUpForm").show();
      });
  
      $("#login").click(function () {
          $(".signUpForm").hide();
          $(".loginForm").show();
      });
  
      // User object constructor
      function User(name, email, number) {
          this.name = name;
          this.email = email;
          this.number = number;
      }
  
      // Array to store users
      //let UserArray = [];
      // Handle Signup Form Submission
      $('.signUpForm').submit(function (e) {
          e.preventDefault();
          const formData = new FormData(e.target);
          const data = Object.fromEntries(formData.entries());
        
          let newUser = new User(data.name, data.email, data.number);
          localStorage.setItem(newUser.email, JSON.stringify(newUser));
          //UserArray.push(newUser);
  
          console.log("New User Created:", newUser);


          const request = JSON.stringify({
            email: newUser.email,
            name: newUser.name,
            phonenumber: newUser.number
          })

          $.post("http://localhost:3000/users",
          
request
          )
          
  
          $(".signUpForm").hide();
          $(".loginForm").show();
      });
  
      // Handle Login Form Submission
      $('.loginForm').submit(function (e) {
          e.preventDefault();
          const formData = new FormData(e.target);
          const data = Object.fromEntries(formData.entries());

          let currentUser = JSON.parse(localStorage.getItem(data.email));
          console.log(currentUser);
          console.log(currentUser.name);

          if (currentUser) {
              $(".loginButton").hide();
              $(".loginContainer").removeClass("show");
              $("#overlay").fadeOut();
              localStorage.setItem("current user", JSON.stringify(currentUser));
              console.log("User logged in successfully!");
          } else {
              console.log("No such user exists!");
          }
      });


      //sample studio data - to be filled in future
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
        
        function updateStudios(category) {
          let grid = $("#mostViewedGrid");
          grid.empty();
      
          studioData[category].forEach((studio) => {
            grid.append(`
              <div class="mostViewedCard">
                <img src="${studio.img}" alt="mostViewed">
                <span>Featured</span>
              </div>
            `);
          });
        }
      
        
        $(".studio-filter a").click(function (e) {
          e.preventDefault();
      
          $(".studio-filter a").removeClass("active");
          $(this).addClass("active");
      
          let category = $(this).data("category");
          updateStudios(category);
        });
      
        updateStudios("recording");
});
