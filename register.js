import { auth } from "./firebase.js";
   alert("register.js loaded");
import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirmPassword").value;

    if(password !== confirm){
        alert("Passwords do not match!");
        return;
    }

    try{

        await createUserWithEmailAndPassword(auth, email, password);

        alert("Registration Successful!");

        window.location.href = "login.html";

    }catch(error){

        alert(error.message);

    }

});