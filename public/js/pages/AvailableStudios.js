document.addEventListener("DOMContentLoaded", async () => {
    const studioListContainer = document.querySelector(".studio-list");
    let studios = [];
  
    // Fetch studios from API
    try {
      const res = await fetch("/api/studios");
      studios = await res.json();
    } catch (err) {
      console.error("Failed to load studios:", err);
      studioListContainer.innerHTML = "<p>Failed to load studios.</p>";
      return;
    }
  
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get("search")?.toLowerCase() || "";
  
    // Filtering form
    document.querySelector(".filter form").addEventListener("submit", function (e) {
      e.preventDefault();
      applyFilters();
    });
  
    function applyFilters() {
      const type = document.getElementById("studioType").value;
      const term = document.getElementById("rentalTerm").value;
      const people = document.getElementById("peopleAllowed").value;
      const priceRange = document.getElementById("priceRange").value;
      const size = parseFloat(document.getElementById("size").value);
      const transport = document.getElementById("transport").checked;
      const parking = document.getElementById("parking").checked;
  
      const filtered = studios.filter(studio => {
        const matchesSearch = !searchTerm || (
          studio.studioName?.toLowerCase().includes(searchTerm) ||
          studio.StudioDesc?.toLowerCase().includes(searchTerm)
        );
  
        const matchesType = type === "all" || type === "studioType" || studio.StudioType?.toLowerCase() === type.toLowerCase();
        const matchesTerm = term === "all" || term === "rentalTerm" || studio.rentalTerm?.toLowerCase() === term.toLowerCase();
  
        const matchesPeople = (() => {
          const count = parseInt(studio.accommodation);
          if (people === "all" || people === "peopleAllowed") return true;
          if (people === "people1") return count <= 20;
          if (people === "people2") return count > 20 && count <= 30;
          if (people === "people3") return count > 30 && count <= 40;
          if (people === "people4") return count > 40;
          return true;
        })();
  
        const matchesPrice = (() => {
          const price = parseFloat(studio.termPrice);
          switch (priceRange) {
            case "range1": return price <= 50;
            case "range2": return price > 50 && price <= 100;
            case "range3": return price > 100 && price <= 200;
            case "range4": return price > 200 && price <= 500;
            case "range5": return price > 500 && price <= 1000;
            case "range6": return price > 1000 && price <= 2000;
            case "range7": return price > 2000 && price <= 5000;
            case "range8": return price > 5000;
            case "all": return true;
            default: return true;
          }
        })();
  
        const matchesSize = isNaN(size) || parseFloat(studio.StudioArea) >= size;
        const matchesTransport = !transport || studio.transportYN?.toLowerCase() === "yes";
        const matchesParking = !parking || studio.parkingYN?.toLowerCase() === "yes";
  
        return matchesSearch && matchesType && matchesTerm && matchesPeople && matchesPrice && matchesSize && matchesTransport && matchesParking;
      });
  
      renderStudios(filtered);
    }
  
    function renderStudios(list) {
      studioListContainer.innerHTML = "";
      if (!list.length) {
        studioListContainer.innerHTML = "<p>No studios match your criteria.</p>";
        return;
      }
  
      list.forEach((studio) => {
        const card = document.createElement("div");
        card.classList.add("studio-card");
  
        const images = studio.images || [];
        card.innerHTML = `
          <div class="studioImg">
            ${images.slice(0, 4).map((src, i) => `
              <div class="image-container" style="grid-area: img-${i + 1}">
                <img src="${src}" alt="Studio Image ${i + 1}" />
              </div>
            `).join("")}
            <div class="image-container mainImage" style="grid-area: img-5">
              <img src="${images[0] || '../images/default.jpg'}" alt="Main Studio Image" />
            </div>
          </div>
          <div class="studioDesc">
            <h3 class="studio-title">${studio.studioName}</h3>
            <p><strong>Location:</strong> ${studio.studioAddress}</p>
            <p><strong>Price:</strong> $${studio.termPrice}/${studio.rentalTerm}</p>
            <p><strong>Size:</strong> ${studio.StudioArea} sqm</p>
            <p class="studio-description">${studio.StudioDesc?.slice(0, 100)}...</p>
          </div>
          <div class="cardButton">
            <button class="btn view-btn" data-id="${studio.id}">View Listing</button>
          </div>
        `;
  
        studioListContainer.appendChild(card);
      });
  
      document.querySelectorAll(".view-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-id");
          window.location.href = `PerListingView.html?id=${id}`;
        });
      });
    }
  
    // Initial load (filtered by search term)
    applyFilters();
  });
  