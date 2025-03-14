// hide login button if theres a user
$(function(){
    let user = JSON.parse(localStorage.getItem("current user"));
    
    console.log(user);
    if(user){
        $(".loginButton").hide();
    }

    $(".logout").click(function(){
        localStorage.removeItem("current user");
    });
});