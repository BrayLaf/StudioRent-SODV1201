$(function () {
  let user;
  // if there is a user hide login and show logout
  function updateLoginButton() {
    if (user) {
      $(".loginButton").text("Logout").addClass("logout").show();
    } else {
      $(".loginButton").text("Login").removeClass("logout").show();
    }
  }
  updateLoginButton();

  $(".loginButton").click(function () {
    if ($(this).hasClass("logout")) {
      // Logout
      localStorage.removeItem("current user");
      user = null;
      updateLoginButton();
      return; // exit early to avoid triggering login popup
    }
    // Show login form
    $(".loginContainer").addClass("showLogin show");
    $("#overlay").fadeIn();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });

  $(".formClose, #overlay").click(function () {
    $(".loginContainer").removeClass("show showLogin");
    $("#overlay").fadeOut();
  });

  $(".loginForm").off("submit").on("submit", async function (e) {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
  
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
  
      const result = await response.json();
  
      if (!response.ok) throw result;
  
      user = result.user;
      localStorage.setItem("current user", JSON.stringify(user));
  
      updateLoginButton();
      $(".loginContainer").removeClass("show showLogin");
      $("#overlay").fadeOut();
      console.log("User logged in successfully!");
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message || "Login failed.");
    }
  });
  
  // show/ hide login/signup
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

  // Handle Signup Form Submission
  $(".signUpForm").off("submit").on("submit", async function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    let newUser = new User(data.name, data.email, data.number, data.ownrent);  
    await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser)
    })
      .then(async response => {
        const result = await response.json();
        if (!response.ok) throw result;
        console.log("User save:", result);
        // Only show login form if successful
        $(".signUpForm").hide();
        $(".loginForm").show();
      })
      .catch(error => {
        console.error("Error: ", error);
        alert(error.message);
      })
      .finally(() => {
        // Reset form no matter what
        e.target.reset();
      });
  });

  // Navigation and dropdown functionality
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.querySelector(".nav-links");
  const dropdown = document.querySelector(".dropdown");

  mobileMenu.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  });

  dropdown.addEventListener("click", function (event) {
    event.stopPropagation();
    dropdown.classList.toggle("open");
  });

  document.addEventListener("click", function (event) {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove("open");
    }
  });

  // Add overlay effect
  let overlay = $("<div></div>")
    .attr("id", "overlay")
    .css({
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(5px)",
      zIndex: "99",
      display: "none",
    });

  $("body").append(overlay);
});