import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try{

        await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem("userEmail", email);

        alert("Login Successful!");

        window.location.href = "index.html";

    }catch(error){

        alert(error.message);

    }

});
