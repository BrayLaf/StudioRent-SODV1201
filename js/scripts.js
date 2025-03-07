$(function () {
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");
    const dropdown = document.querySelector(".dropdown");

    // Toggle burger menu on click
    mobileMenu.addEventListener("click", function () {
        navLinks.classList.toggle("active");
        mobileMenu.classList.toggle("active"); // Toggle the active class for the burger menu (smooth transition)
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

    //popup login when prompted
    $(".loginButton").click(function(){
        $(".login-container").show();
    });
    //popup sign/login in when prompted 
    $(".signup").click(function(){
        if($(".login-container").is(":visible")){
            $(".signup-container").show();
            $(".login-container").hide();
        }else{
            $(".login-container").show();
            $(".signup-container").hide()
        }
    });
    //user object constructor 
    function User(name, email, number, studios){
        this.name = name;
        this.email = email;
        this.number = number; 
        this.Studios = studios;
    }
    //array of users
    let UserArray = [];
    // create new user when form is submitted
    $('#signup-form').submit((e) => {
        e.preventDefault()
        let studios = [];
        const data = Object.fromEntries(new FormData(e.target).entries());
        console.log(data)
        const newuser = new User(data.uname, data.email, data.phoN, studios);
        console.log(newuser);
        UserArray.push(newuser);
        $(".signup-container").hide()
    });
    // login user when form is submitted
    
});
