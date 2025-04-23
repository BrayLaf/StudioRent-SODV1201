document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggle-Button");
  const sideBar = document.getElementById("sideBar");

  toggleButton.addEventListener("click", () => {
    sideBar.classList.toggle("close");
    toggleButton.classList.toggle("rotate");
  });

  // Load current user from backend
  $(function () {
    const currentUser = JSON.parse(localStorage.getItem("current user"));
    if (currentUser && currentUser.email) {
      fetch(`/api/user/email/${encodeURIComponent(currentUser.email)}`)
        .then(res => res.ok ? res.json() : Promise.reject("User not found"))
        .then(user => {
          updateUserFields(user);
          localStorage.setItem("current user", JSON.stringify(user));
        })
        .catch(err => {
          console.error("Failed to load user from backend:", err);
          alert("Unable to load your profile data.");
        });
    }

    function updateUserFields(user) {
      $(".loggedinName").val(user.name);
      $(".loggedinEmail").val(user.email);
      $(".loggedinPhone").val(user.number);
    
      if (user.ownrent === "owner") {
        $("#check").prop("checked", true);
        $("#modeText").text("Owner Mode");
      } else {
        $("#check").prop("checked", false);
        $("#modeText").text("Renter Mode");
    
        // Hide Manage Studios tab for renters
        const manageTab = document.querySelector(".manage-studios-tab");
        if (manageTab) {
          manageTab.style.display = "none";
        }
      }
    }
  });

  // Update user via backend
  $(".accountForm").submit(async function (e) {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const currentUser = JSON.parse(localStorage.getItem("current user"));
  
    // Determine role from checkbox state
    const role = $("#check").is(":checked") ? "owner" : "renter";
  
    const updatedUser = {
      name: data.fname,
      number: data.number,
      ownrent: role
    };
  
    try {
      const response = await fetch(`/api/user/email/${encodeURIComponent(currentUser.email)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
  
      const result = await response.json();
  
      if (!response.ok || result.success !== true) {
        throw new Error(result.message || "Update failed.");
      }
  
      localStorage.setItem("current user", JSON.stringify(result.user));
      alert("Account updated successfully!");
  
    } catch (error) {
      console.error("Update failed:", error);
      alert(error.message || "Could not update account.");
    }
  });
  
});

// Handle Owner/Renter Mode Toggle
$(document).ready(function () {
  $('#check').change(function () {
    if ($(this).prop('checked')) {
      $('#modeText').text('Owner Mode');
    } else {
      $('#modeText').text('Renter Mode');
    }
  });
});