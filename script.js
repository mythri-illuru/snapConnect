import { db, storage } from "./firebase.js";

import { 
    ref,
     uploadBytes,
      getDownloadURL

} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

import {
collection,
addDoc,
query,
orderBy,
onSnapshot,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const postBtn = document.getElementById("postBtn");
const postInput = document.getElementById("postInput");
const imageInput = document.getElementById("imageInput");
const feed = document.getElementById("feed");
const themeBtn = document.getElementById("themeBtn");

const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("messageInput");
const messages = document.getElementById("messages");


// ================= CREATE POST =================

if (postBtn) {

postBtn.addEventListener("click", async () => {

    const text = postInput.value.trim();

    if (text === "") {
        showToast("Please enter a post.");
        return;
    }

    let imageUrl = "";
    let imageHTML = "";

    if (imageInput.files.length > 0) {
        const file = imageInput.files[0];
        imageUrl = URL.createObjectURL(file);

        imageHTML = `<img src="${imageUrl}" style="width:100%;border-radius:10px;margin-top:10px;">`;
    }

    const post = document.createElement("div");
    post.className = "post";

    post.innerHTML = `
        <div class="post-header">
            <img src="https://i.pravatar.cc/100?img=15">
            <div>
                <h4>mythri_dev</h4>
                <small>Just Now</small>
            </div>
        </div>

        <p style="padding:15px;">${text}</p>

        ${imageHTML}

        <div class="post-icons">
            <i class="bi bi-heart like-icon"></i>
            <i class="bi bi-chat"></i>
            <i class="bi bi-send"></i>
            <i class="bi bi-trash delete-btn"></i>
        </div>

        <div class="comments">
            <input class="comment-input" placeholder="Write a comment">
            <button class="comment-btn">Comment</button>
            <div class="comment-list"></div>
        </div>
    `;

    feed.prepend(post);

    await addDoc(collection(db, "posts"), {
        text: text,
        image: imageUrl,
        createdAt: new Date()
    });

    postInput.value = "";
    imageInput.value = "";

    showToast("Post created successfully");

});

}



// ================= DELETE POST =================

document.addEventListener("click", (e) => {

    if (e.target.classList.contains("delete-btn")) {

        e.target.closest(".post").remove();

    }

});

// ================= COMMENTS =================

document.addEventListener("click", (e) => {

    if (e.target.classList.contains("comment-btn")) {

        const parent = e.target.parentElement;

        const input = parent.querySelector(".comment-input");

        const list = parent.querySelector(".comment-list");

        if (input.value.trim() === "") return;

        const p = document.createElement("p");

        p.className = "comment";

        p.textContent = input.value;

        list.appendChild(p);

        input.value = "";

    }

});

// ================= LIKE FOR NEW POSTS =================

document.addEventListener("click", (e) => {

    if (e.target.classList.contains("like-icon")) {

        const icon = e.target;

        const count = icon.nextElementSibling;

        let likes = Number(count.innerText);

        if (icon.classList.contains("bi-heart")) {

            icon.classList.remove("bi-heart");
            icon.classList.add("bi-heart-fill");

            icon.style.color = "red";

            count.innerText = likes + 1;

        } else {

            icon.classList.remove("bi-heart-fill");
            icon.classList.add("bi-heart");

            icon.style.color = "black";

            count.innerText = likes - 1;

        }

    }

});

// ================= DARK MODE =================



if(themeBtn){

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if(document.body.classList.contains("dark")){
            localStorage.setItem("theme","dark");
        }else{
            localStorage.setItem("theme","light");
        }

    });

}

   



// ================= SEARCH USERS =================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", () => {

        const value = searchInput.value.toLowerCase();

        const users = document.querySelectorAll(".user");

        users.forEach((user) => {

            const name = user.innerText.toLowerCase();

            if (name.includes(value)) {
                user.style.display = "flex";
            } else {
                user.style.display = "none";
            }

        });

    });

}

// ================= FOLLOW / UNFOLLOW =================

document.querySelectorAll(".follow-btn").forEach(button=>{

button.addEventListener("click",()=>{

if(button.innerText==="Follow"){

button.innerText="Following";
button.style.background="#28a745";

}else{

button.innerText="Follow";
button.style.background="#0095f6";

}

});

});

// ================= NOTIFICATIONS =================

const notificationIcon = document.getElementById("notificationIcon");
const notificationPanel = document.getElementById("notificationPanel");

if(notificationIcon && notificationPanel){

    notificationIcon.addEventListener("click", () => {

        if(notificationPanel.style.display === "block"){
            notificationPanel.style.display = "none";
        }else{
            notificationPanel.style.display = "block";
        }

    });

}

// ================= CHAT =================


if (sendBtn) {

sendBtn.addEventListener("click", async () => {

const text = messageInput.value.trim();

if (text === "") return;

await addDoc(collection(db, "messages"), {

text: text,

sender: auth.currentUser.email,

createdAt: serverTimestamp()

});

messageInput.value = "";

});

}

if(messages){

const q = query(

collection(db, "messages"),

orderBy("createdAt")

);

onSnapshot(q, (snapshot) => {

messages.innerHTML = "";

snapshot.forEach((doc) => {

const data = doc.data();

const div = document.createElement("div");

if (data.sender === auth.currentUser.email) {

div.className = "message sent";

} else {

div.className = "message received";

}

div.innerText = data.text;

messages.appendChild(div);

});

messages.scrollTop = messages.scrollHeight;

});

}



// ================= SAVED POSTS =================

document.addEventListener("click", (e) => {

    if (e.target.classList.contains("bookmark-btn")) {

        e.target.classList.toggle("bi-bookmark");

        e.target.classList.toggle("bi-bookmark-fill");

        e.target.classList.toggle("saved");

    }

});

// ================= EXPLORE SEARCH =================

const exploreSearch = document.getElementById("exploreSearch");

if(exploreSearch){

exploreSearch.addEventListener("keyup",()=>{

const value = exploreSearch.value.toLowerCase();

const images=document.querySelectorAll(".explore-img");

images.forEach((img,index)=>{

    if(value===""){

        img.style.display="block";

    }else{

        if(index.toString().includes(value)){

            img.style.display="block";

        }else{

            img.style.display="none";

        }

    }

});

});

}

// ================= EDIT PROFILE =================

const editBtn = document.getElementById("editBtn");

if(editBtn){

editBtn.addEventListener("click",()=>{

    let form = document.getElementById("editForm");

    if(!form){

        form = document.createElement("div");
        form.id = "editForm";
        form.className = "edit-form";

        form.innerHTML = `
            <input type="text" id="newName" placeholder="Enter new name">
            <input type="text" id="newBio" placeholder="Enter new bio">
            <button id="saveProfile">Save</button>
        `;

        document.querySelector(".profile-info").appendChild(form);

        form.style.display = "block";

        document.getElementById("saveProfile").addEventListener("click",()=>{

            const newName = document.getElementById("newName").value;
            const newBio = document.getElementById("newBio").value;

            if(newName){
                document.querySelector(".profile-info h2").innerText = newName;
            }

            if(newBio){
                document.querySelector(".profile-info p").innerText = newBio;
            }

            form.remove();

        });

    }

});
}


let users = [
  { name: "john_doe", img: "https://i.pravatar.cc/50?img=21", likes: 0 },
  { name: "jane_smith", img: "https://i.pravatar.cc/50?img=22", likes: 0 },
  { name: "alex_k", img: "https://i.pravatar.cc/50?img=23", likes: 0 }
];

let filteredUsers = [...users];

function renderUsers(list = filteredUsers) {
  let container = document.getElementById("userList");
  container.innerHTML = "";

  list.forEach((user, index) => {
    container.innerHTML += `
      <div class="user">
        <img src="${user.img}">
        <span>${user.name}</span>

        <button onclick="likeUser(${index})">❤️ ${user.likes}</button>
        <button onclick="deleteUser(${index})">❌ Delete</button>
      </div>
    `;
  });
}

function addUser() {
  let newUser = {
    name: "new_user_" + (users.length + 1),
    img: "https://i.pravatar.cc/50?img=" + (20 + users.length),
    likes: 0
  };

  users.push(newUser);
  filteredUsers = [...users];
  renderUsers(filteredUsers);
}

function likeUser(index) {
  filteredUsers[index].likes++;
  renderUsers(filteredUsers);
}

function deleteUser(index) {
  let userToDelete = filteredUsers[index];

  users = users.filter(u => u.name !== userToDelete.name);
  filteredUsers = [...users];

  renderUsers(filteredUsers);
}

function searchUser() {
  let value = document.getElementById("searchBox").value.toLowerCase();

  filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(value)
  );

  renderUsers(filteredUsers);
}



const resetBtn = document.getElementById("resetBtn");

if(resetBtn){

    resetBtn.addEventListener("click",()=>{

        const email=document.getElementById("resetEmail").value;

        if(email===""){
            alert("Please enter your email.");
            return;
        }

        alert("Password reset link sent to "+email);

        window.location.href="login.html";

    });

}





document.querySelectorAll(".menu-btn").forEach(btn=>{

    btn.addEventListener("click",(e)=>{

        e.stopPropagation();

        const menu = btn.nextElementSibling;

        document.querySelectorAll(".menu-options").forEach(item=>{

            if(item!==menu){
                item.style.display="none";
            }

        });

        menu.style.display =
        menu.style.display==="block" ? "none":"block";

    });

});

window.addEventListener("click",()=>{

    document.querySelectorAll(".menu-options").forEach(menu=>{

        menu.style.display="none";

    });

});

document.querySelectorAll(".delete-post").forEach(btn=>{

    btn.addEventListener("click",()=>{

        if(confirm("Delete this post?")){

            btn.closest(".post").remove();

        }

    });

});

document.querySelectorAll(".share-post").forEach(btn=>{

    btn.addEventListener("click",()=>{

        showToast("Post shared successfully");

    });

});

document.querySelectorAll(".save-post").forEach(btn=>{

    btn.addEventListener("click",()=>{

       showToast("Post saved successfully");

    });

});

document.querySelectorAll(".edit-post").forEach(btn=>{

    btn.addEventListener("click",()=>{

        showToast("Edit feature coming soon");

    });

});


const previewImage = document.getElementById("previewImage");

if(imageInput && previewImage){

imageInput.addEventListener("change",function(){

const file = this.files[0];

if(file){

const reader = new FileReader();

reader.onload=function(e){

previewImage.src=e.target.result;

previewImage.parentElement.style.display="block";

}

reader.readAsDataURL(file);

}

});

}

function showToast(message){

    const toast=document.getElementById("toast");

    toast.innerHTML="✅ "+message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

}



const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(e){

        e.preventDefault();

        const password = document.getElementById("password").value;
        const confirm = document.getElementById("confirmPassword").value;

        if(password !== confirm){
            alert("Passwords do not match!");
            return;
        }

        alert("Registration Successful!");

        window.location.href = "login.html";

    });

}


const userName = document.getElementById("userName");

if(userName){

    const email = localStorage.getItem("userEmail");

    if(email){

        userName.innerText = email;

    }

}



import { auth } from "./firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {

    const logoutBtn = document.getElementById("logoutBtn");

    if (!logoutBtn) return;

    logoutBtn.addEventListener("click", async () => {

        try {
            await signOut(auth);

            localStorage.clear();

            alert("Logged Out Successfully");

            window.location.href = "login.html";

        } catch (error) {
            console.log(error);
            alert("Logout failed");
        }

    });

});

