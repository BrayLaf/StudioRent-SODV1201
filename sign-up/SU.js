document.getElementById("Press").addEventListener("click",function(event)
{
    event.preventDefault();

    let email = document.getElementById("Email").value.trim();
    let pass = document.getElementById("pass").value.trim();
    let uname = document.getElementById("uname").value.trim();
    let phoN = document.getElementById("phoN").value.trim();
    let errors="";
    
    



    if (uname === ""){
        errors+="Username not inputted.\n"; 
    } 
    if (email === ""){
        errors+="Email not inputted.\n"; 
    }
    if (pass === ""){
        errors+="Password not inputted.\n"; 
    }
    if (phoN === ""){
        errors+="Phone number not inputted.\n"; 
    }
    if (errors !== ""){
        alert(errors);
        return;
    }
    alert("Regierster complete");

    window.location.href="Welcome.html";
    localStorage.setItem("uname",uname);
    localStorage.setItem("email",email);
    localStorage.setItem("phoN",phoN);
}
);