document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggle-Button");
  const sideBar = document.getElementById("sideBar");

  toggleButton.addEventListener("click", () => {
    sideBar.classList.toggle("close");
    toggleButton.classList.toggle("rotate");
  });
});



//set elements based off local storage 


let currentUser = localStorage.getItem("current user");
console.log(currentUser);