$(function () {
  const sections = {
    keyinfo: document.querySelector(".btnDiv"),
    imageUpload: document.querySelector("#imageUpload"),
    location: document.querySelector("#locadetails"),
    contact: document.querySelector("#property-form"),
  };

  const sidebarLinks = {
    keyinfo: $(".sideKey1"),
    imageUpload: $(".sideKey2"),
    location: $(".sideKey3"),
    contact: $(".sideKey4"),
  };

  // Function to check if an element is in the viewport
  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Highlight sidebar when section is in view
  document.addEventListener(
    "scroll",
    function () {
      Object.values(sidebarLinks).forEach((link) => {
        link.css({
          "background-color": "var(--extraLight)",
          color: "var(--text-dark)",
        });
      });

      // Apply highlight t
      Object.keys(sections).forEach((key) => {
        if (isInViewport(sections[key])) {
          sidebarLinks[key].css({
            "background-color": "var(--primaryColor3)",
            color: "#ffffff",
          });
        }
      });
    },
    { passive: true }
  );


  //function to make buttons selected when clicked
  const btnDivs = document.querySelectorAll(".btnDiv");

    btnDivs.forEach((btnDiv) => {
      const buttons = btnDiv.querySelectorAll("button");

      if (btnDiv.classList.contains("multi-select")) {
        buttons.forEach((button) => {
          button.addEventListener("click", function () {
            this.classList.toggle("selected"); // Allow multiple selections
          });
        });
      } else {
        buttons.forEach((button) => {
          button.addEventListener("click", function () {
            buttons.forEach((btn) => btn.classList.remove("selected")); // Deselect others
            this.classList.add("selected"); // Select only this button
          });
        });
      }
    });

    

    // collect data for updating listing


});

