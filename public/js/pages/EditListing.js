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

  document.addEventListener("scroll", function () {
    Object.values(sidebarLinks).forEach((link) => {
      link.css({ "background-color": "var(--extraLight)", color: "var(--text-dark)" });
    });

    Object.keys(sections).forEach((key) => {
      if (isInViewport(sections[key])) {
        sidebarLinks[key].css({ "background-color": "var(--primaryColor3)", color: "#ffffff" });
      }
    });
  }, { passive: true });

  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  }

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

  // Image preview logic (run on file input change)
  document.querySelector("#fileUpload").addEventListener("change", function () {
    const previewContainer = document.getElementById("imagePreview");
    previewContainer.innerHTML = "";

    const files = Array.from(this.files);
    if (files.length > 5) {
      alert("You can only upload up to 5 images.");
      this.value = "";
      return;
    }

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.alt = file.name;
        img.classList.add("preview-thumb");
        previewContainer.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  });

  $("#property-form").submit(function (e) {
    e.preventDefault();

    const fileInput = $("#fileUpload")[0];
    const isEdit = !!new URLSearchParams(window.location.search).get("id");

    if (!isEdit && !fileInput.files.length) {
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

    const form = document.getElementById("property-form");
    const formData = new FormData(form);

    const user = JSON.parse(localStorage.getItem("current user"));
    if (!user || !user.email) {
      alert("User not logged in. Please login to submit a studio.");
      return;
    }

    formData.append("uploadedBy", user.email);

    const studioId = new URLSearchParams(window.location.search).get("id");
    const fetchURL = studioId ? `/api/studio/${studioId}` : "/api/studio";
    const fetchMethod = studioId ? "PUT" : "POST";

    fetch(fetchURL, {
      method: fetchMethod,
      body: formData
    })
      .then(response => {
        if (!response.ok) throw new Error("Submission failed.");
        return response.json();
      })
      .then(data => {
        alert(studioId ? "Studio updated!" : "Studio created!");
        const id = data.data.id || studioId;
        window.location.href = `../html/PerListingView.html?id=${id}`;
      })
      .catch(error => {
        console.error("Submit error:", error);
        alert("Error submitting the studio.");
      });
  });

  // Prefill fields if editing
  (async function loadStudioForEditing() {
    const studioId = new URLSearchParams(window.location.search).get("id");
    if (!studioId) return;
  
    try {
      const res = await fetch(`/api/studio/${studioId}`);
      const studio = await res.json();
  
      $("#studioTypeInput").val(studio.StudioType);
      $(`button[name='StudioType'][value='${studio.StudioType}']`).addClass("selected");
  
      $("#rentalTermInput").val(studio.rentalTerm);
      $(`button[name='rentalTerm'][value='${studio.rentalTerm}']`).addClass("selected");
  
      $("#accommodationInput").val(studio.accommodation);
      $(`button[name='accommodation'][value='${studio.accommodation}']`).addClass("selected");
  
      $("#transportInput").val(studio.transportYN);
      $(`button[name='transportYN'][value='${studio.transportYN}']`).addClass("selected");
  
      $("#parkingInput").val(studio.parkingYN);
      $(`button[name='parkingYN'][value='${studio.parkingYN}']`).addClass("selected");
  
      $("input[name='termPrice']").val(studio.termPrice);
      $("input[name='studioName']").val(studio.studioName);
      $("input[name='StudioArea']").val(studio.StudioArea);
      $("input[name='studioAddress']").val(studio.studioAddress);
      $("textarea[name='StudioDesc']").val(studio.StudioDesc);
      $("input[name='email']").val(studio.email);
      $("input[name='phone']").val(studio.phone);
  
      // Show existing images
      const previewContainer = document.getElementById("imagePreview");
      previewContainer.innerHTML = "";
      (studio.images || []).forEach((src, index) => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = `Existing Studio Image ${index + 1}`;
        img.classList.add("preview-thumb");
        previewContainer.appendChild(img);
      });
  
    } catch (err) {
      console.error("Failed to load studio for editing:", err);
    }
  })();  
});
