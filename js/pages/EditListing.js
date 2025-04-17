$(function () {
  const sections = {
    keyinfo: document.querySelector(".btnDiv"),
    imageUpload: document.querySelector("#imageUpload"),
    location: document.querySelector("#locadetails"),
    contact: document.querySelector("#form-container")
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
  function setupButtonGroup(buttonName, hiddenInputId) {
    const buttons = $(`button[value][name='${buttonName}']`);
    buttons.on("click", function () {
      buttons.removeClass("selected");
      $(this).addClass("selected");
      $(`#${hiddenInputId}`).val($(this).val());
    });
  }
  
    setupButtonGroup("StudioType", "studioTypeInput");
    setupButtonGroup("rentalTerm", "rentalTermInput");
    setupButtonGroup("accommodation", "accommodationInput");
    setupButtonGroup("transportYN", "transportInput");
    setupButtonGroup("parkingYN", "parkingInput");
    // collect data for updating listing
    $("#property-form").submit(function (e) {
      e.preventDefault();
    
      // check file input
      const fileInput = $("#fileUpload")[0];
      if (!fileInput.files.length) {
        alert("Please upload at least one image.");
        return;
      }
      const requiredHiddenInputs = ["studioTypeInput", "rentalTermInput", "accommodationInput", "transportInput", "parkingInput"];
      for (const id of requiredHiddenInputs) {
        if (!$(`#${id}`).val()) {
          alert("Please make sure all required selections are made.");
          return;
        }
      }
      const formData = new FormData(this);
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      // Submit via AJAX or continue
    });
    
    // Limit image upload to 5 images
    const imageUploadInput = document.querySelector("#imageUpload");
  
    imageUploadInput.addEventListener("change", function () {
      if (this.files.length > 5) {
        alert("You can only upload up to 5 images.");
        this.value = ""; 
      }
    });
});


