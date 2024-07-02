var usernameInp = document.getElementById("inp1")
var passwordInp = document.getElementById("inp2")
var userLabel = document.getElementById("user_label")
var passLabel = document.getElementById("password_label")


usernameInp.addEventListener("focus",(event)=>{
    usernameInp.placeholder = ""
    userLabel.classList.add("onfocus_label")
})

passwordInp.addEventListener("focus",()=>{
    passwordInp.placeholder = "" 
    passLabel.classList.add("onfocus_label")
})

usernameInp.addEventListener("focusout",()=>{
    usernameInp.placeholder = "Username"
    userLabel.classList.remove("onfocus_label")
})

passwordInp.addEventListener("focusout",()=>{
    passwordInp.placeholder = "Password"
    passLabel.classList.remove("onfocus_label")
})