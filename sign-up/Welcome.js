function getQueryParam(param) {
    let params = new URLSearchParams(window.location.search);
    return params.get(param) || "Not provided"; 
}


window.onload = function() {
    document.getElementById("A").textContent = getQueryParam("uname");
    document.getElementById("B").textContent = getQueryParam("email");
    document.getElementById("C").textContent = getQueryParam("phoN");
};