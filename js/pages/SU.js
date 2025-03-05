
document.getElementById("Press").addEventListener("click",function(event)
{
let form = document.getElementById("signup-form");

    if (!form.checkValidity()) {
        form.reportValidity(); 
        return;
    }
   else{
        let email = encodeURIComponent(document.getElementById("email").value);
        let uname = encodeURIComponent(document.getElementById("uname").value);
        let phoN = encodeURIComponent(document.getElementById("phoN").value);
        window.location.href = `Welcome.html?uname=${uname}&email=${email}&phoN=${phoN}`;

   }
   

    
});