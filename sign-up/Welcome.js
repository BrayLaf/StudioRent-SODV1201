document.addEventListener("DOMContentLoaded", function(){
    let uname = localStorage.getItem("uname");
    let email= localStorage.getItem("email");
    let phoN =localStorage.getItem("phoN");
    
    if(uname){
        document.getElementById("A").textContent=`Hello ${uname}!`;
    }
    if(email){
        document.getElementById("B").textContent=`Your Email: ${email}!`;
    }
    if(phoN){
        document.getElementById("C").textContent=`Your # Number: ${phoN}!`;
    }
});
