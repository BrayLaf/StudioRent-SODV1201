// hide login button if theres a user
$(function(){
    let user = JSON.parse(localStorage.getItem("current user"));
    
    console.log(user);
    if(user){
        $(".loginButton").hide();
    }

    $(".logout").click(function(){
        localStorage.removeItem("current user");
    });

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
      function User(name, email, number, ownrent) {
          this.name = name;
          this.email = email;
          this.number = number;
          this.ownrent = ownrent;
      }
  
      // Array to store users
      //let UserArray = [];
      // Handle Signup Form Submission
      $('.signUpForm').submit(function (e) {
          e.preventDefault();
          const formData = new FormData(e.target);
          const data = Object.fromEntries(formData.entries());
        
          let newUser = new User(data.name, data.email, data.number, data.ownrent);
          localStorage.setItem(newUser.email, JSON.stringify(newUser));
          //UserArray.push(newUser);
  
          console.log("New User Created:", newUser);


          const request = JSON.stringify({
            email: newUser.email,
            name: newUser.name,
            phonenumber: newUser.number
          })

         // $.post("http://localhost:3000/users", request)

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


});