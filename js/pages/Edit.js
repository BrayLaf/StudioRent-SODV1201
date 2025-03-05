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

    //Highlight what section you are on 
    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    
        );
    }
    
    
    const keyinfo = document.querySelector(".btnDiv");
    const images = document.querySelector(".imageUpload");
    const location = document.querySelector(".propertyTitle");
    const contact = document.querySelector(".contactDetails");
    const sidebarelement = $(".sideKey1");
    const sidebarelement2 = $(".sideKey2");
    const sidebarelement3 = $(".sideKey3");
    const sidebarelement4 = $(".sideKey4");

    
    document.addEventListener('scroll', function () {
        sidebarelement.css({'background-color': 'var(--extraLight)', 'color': 'var(--text-dark)'});
        sidebarelement2.css({'background-color': 'var(--extraLight)', 'color': 'var(--text-dark)'});
        sidebarelement3.css({'background-color': 'var(--extraLight)', 'color': 'var(--text-dark)'});
        sidebarelement4.css({'background-color': 'var(--extraLight)', 'color': 'var(--text-dark)'});

        if(isInViewport(keyinfo))
            sidebarelement.css({'background-color': 'var(--primaryColor3)', 'color': '#ffffff'})
        
        if(isInViewport(images))
            sidebarelement2.css({'background-color': 'var(--primaryColor3)', 'color': '#ffffff'})
        
        if(isInViewport(location))
            sidebarelement3.css({'background-color': 'var(--primaryColor3)', 'color': '#ffffff'});
        
        if(isInViewport(contact))
            sidebarelement4.css({'background-color': 'var(--primaryColor3)', 'color': '#ffffff'});
    }, {
        passive: true
    });
    
    // keep footer on bottom
    document.addEventListener("scroll", function () {
        const contactSection = document.querySelector(".contactDetails");
        const footer = document.querySelector(".footer");
    
        const contactBottom = contactSection.getBoundingClientRect().bottom + window.scrollY;
    
        footer.style.position = "relative"; 
        footer.style.top = contactBottom + "px"; 
    });
});


