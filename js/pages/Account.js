document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggle-Button");
  const sideBar = document.getElementById("sideBar");

  toggleButton.addEventListener("click", () => {
    sideBar.classList.toggle("close");
    toggleButton.classList.toggle("rotate");
  });



  // change user values
  $(function(){
    if(localStorage.getItem("current user")){
        let user = JSON.parse(localStorage.getItem("current user"));
        console.log(user);
        updateUserFields(user);
      }
      function updateUserFields(User){
        console.log(User.name);
        $(".loggedinName").val(User.name);
        $(".loggedinEmail").val(User.email);
        $(".loggedinPhone").val(User.number);
      }
});
});



