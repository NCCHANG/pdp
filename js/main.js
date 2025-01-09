const btn = document.querySelector("#createBtn");
const signup = document.querySelector("#signUp");
const login = document.querySelector("#logIn");
btn.addEventListener("click",()=>{
    if(localStorage.getItem("user")) {
        window.location.href = "yearlyCalendar.html";
    } else {
        window.location.href = "signup.html";
    }
})
if(localStorage.getItem("user")) {
    signup.style.display = "none";
    login.style.display = "none";
}