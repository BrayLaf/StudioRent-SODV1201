document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const studioId = params.get("id");

  if (!studioId) return;

  try {
    const res = await fetch(`/api/studio/${studioId}`);
    const studio = await res.json();

    // Update title
    document.querySelector(".listingTitle h1").textContent = studio.studioName || "Untitled Studio";

    // Update description with extra metadata
    const metaDescription = `
        <p><strong>Description:</strong> ${studio.StudioDesc || "No description provided."}</p>
        <p><strong>Status:</strong> ${studio.status || 'Available'}</p>
        <p><strong>Studio Type:</strong> ${studio.StudioType}</p>
        <p><strong>Rental Term:</strong> ${studio.rentalTerm}</p>
        <p><strong>Price:</strong> $${studio.termPrice}/${studio.rentalTerm}</p>
        <p><strong>Area:</strong> ${studio.StudioArea} sq. meters</p>
        <p><strong>Capacity:</strong> ${studio.accommodation}</p>
        <p><strong>Public Transit Access:</strong> ${studio.transportYN}</p>
        <p><strong>Parking Available:</strong> ${studio.parkingYN}</p>
        <p><strong>Address:</strong> ${studio.studioAddress}</p>
      `;
    document.querySelector(".listingDesc .listingDetails").innerHTML = metaDescription;

    // Update contact
    const contactDiv = document.querySelector(".ownerInfo");
    contactDiv.innerHTML = `
        <p><strong>Email:</strong> ${studio.email}</p>
        <p><strong>Phone:</strong> ${studio.phone}</p>
        <button class="contactBtn">Contact Owner</button>
      `;

    // Update image grid
    const imageContainer = document.querySelector(".imageContainer");
    imageContainer.innerHTML = "";
    (studio.images || []).forEach((src, index) => {
      imageContainer.innerHTML += `
          <div class="image-container ${index === 0 ? 'mainImage' : ''}">
            <img src="${src}" alt="Studio Image ${index + 1}" />
          </div>
        `;
    });

  } catch (err) {
    console.error("Failed to load studio:", err);
    alert("Unable to load studio information.");
  }

});

document.addEventListener("DOMContentLoaded", async () => {
  const currentStudioId = new URLSearchParams(window.location.search).get("id");
  const scroller = document.querySelector(".media-scroller");

  try {
    const res = await fetch("/api/studios");
    const allStudios = await res.json();
    const otherStudios = allStudios.filter(s => s.id.toString() !== currentStudioId);

    scroller.innerHTML = "";

    otherStudios.forEach((studio) => {
      const el = document.createElement("div");
      el.className = "media-element";

      el.innerHTML = `
  <div class="card otherList" style="cursor:pointer" data-id="${studio.id}">
    <img src="${studio.images?.[0] || '../images/default.jpg'}" alt="${studio.studioName}">
    <div class="about">
      <h3 class="listTitle">$${studio.termPrice}/${studio.rentalTerm}</h3>
      <h4 class="listTitle">${studio.studioName}</h4>
      <p class="p2">${studio.StudioDesc?.slice(0, 120)}...</p>
      <p><strong>Status:</strong> ${studio.status || 'Available'}</p>
      <p class="rating">&#9733;&#9733;&#9733;&#9734;&#9734;</p>
    </div>
  </div>
`;

      el.querySelector(".card").addEventListener("click", () => {
        window.location.href = `PerListingView.html?id=${studio.id}`;
      });

      scroller.appendChild(el);
    });
  } catch (err) {
    console.error("Failed to load other listings:", err);
  }
});