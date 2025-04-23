document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggle-Button');
  const sideBar = document.getElementById('sideBar');

  toggleButton.addEventListener('click', () => {
    sideBar.classList.toggle('close');
    toggleButton.classList.toggle('rotate');
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const select = dropdown.querySelector(".select");
    const menu = dropdown.querySelector(".menu");
    const caret = dropdown.querySelector(".caret");
    const selected = dropdown.querySelector(".selected");

    select.addEventListener("click", () => {
      menu.classList.toggle("menu-open");
      caret.classList.toggle("rotate");
    });

    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        menu.classList.remove("menu-open");
        caret.classList.remove("rotate");
      }
    });

    menu.querySelectorAll("li").forEach((item) => {
      item.addEventListener("click", () => {
        selected.textContent = item.textContent;
        menu.classList.remove("menu-open");
        caret.classList.remove("rotate");
      });
    });
  });
});

// Load and display studios uploaded by the current user
document.addEventListener("DOMContentLoaded", async () => {
  const user = JSON.parse(localStorage.getItem("current user"));
  if (!user || !user.email) {
    alert("Please log in to view your listings.");
    window.location.href = "../index.html";
    return;
  }

  try {
    const res = await fetch("/api/studios");
    const allStudios = await res.json();
    const myStudios = allStudios.filter(s => s.uploadedBy === user.email);
    const container = document.querySelector(".container");
    container.innerHTML = "";

    if (myStudios.length === 0) {
      container.innerHTML = "<p>You have not listed any studios yet.</p>";
    }

    myStudios.forEach((studio) => {
      const div = document.createElement("div");
      div.classList.add("listing", "listing-user");

      div.innerHTML = `
        <img src="${studio.images?.[0] || '../images/default.jpg'}" alt="Studio Image" />
        <div class="details">
          <h3>${studio.studioName}</h3>
          <p><i class="ri-map-pin-line"></i> ${studio.studioAddress}</p>
          <p><i class="ri-money-dollar-circle-line"></i> $${studio.termPrice} / ${studio.rentalTerm}</p>
        </div>
        <span class="status available">Available</span>
        <div class="dropdown2">
          <div class="select2">Actions ▼</div>
          <ul class="menu2">
            <li><a href="./EditListings.html?id=${studio.id}">Edit</a></li>
            <li><a href="./PerListingView.html?id=${studio.id}">View</a></li>
            <li><a href="#">Delete</a></li>
          </ul>
        </div>
      `;

      container.appendChild(div);
    });
  } catch (err) {
    console.error("Error loading studios:", err);
  }
});

// Handle Add a Studio button redirect
document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.querySelector(".addButton input[type='submit']");
  if (addButton) {
    addButton.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "./EditListings.html";
    });
  }
});