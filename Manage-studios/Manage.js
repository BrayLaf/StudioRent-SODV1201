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
  
      // Close dropdown when clicking outside
      document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) {
          menu.classList.remove("menu-open");
          caret.classList.remove("rotate");
        }
      });
  
      // Set selected option and close menu
      menu.querySelectorAll("li").forEach((item) => {
        item.addEventListener("click", () => {
          selected.textContent = item.textContent;
          menu.classList.remove("menu-open");
          caret.classList.remove("rotate");
        });
      });
    });
  });
  
    
