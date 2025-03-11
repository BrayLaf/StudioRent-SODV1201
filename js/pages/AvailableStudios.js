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

    $(document).ready(function () {
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
      let UserArray = [];
  
      // Handle Signup Form Submission
      $('.signUpForm form').submit(function (e) {
          e.preventDefault();
          const formData = new FormData(e.target);
          const data = Object.fromEntries(formData.entries());
  
          const newUser = new User(data.name, data.email, data.phone);
          UserArray.push(newUser);
  
          console.log("New User Created:", newUser);
  
          $(".signUpForm").hide();
          $(".loginForm").show();
      });
  
      // Handle Login Form Submission
      $('.loginForm form').submit(function (e) {
          e.preventDefault();
          const formData = new FormData(e.target);
          const data = Object.fromEntries(formData.entries());
  
          let userFound = UserArray.some(user => user.email === data.email);
  
          if (userFound) {
              $(".loginContainer").removeClass("show");
              $("#overlay").fadeOut(); 
              console.log("User logged in successfully!");
          } else {
              console.log("No such user exists!");
          }
      });
  });
 

});
