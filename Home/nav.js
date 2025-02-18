document.addEventListener("DOMContentLoaded", function () {
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");
    const dropdown = document.querySelector(".dropdown");
    
    mobileMenu.addEventListener("click", function () {
        navLinks.classList.toggle("active");
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
});
