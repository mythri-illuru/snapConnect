const editBtn = document.getElementById("editBtn");
const name = document.getElementById("profileName");
const bio = document.getElementById("profileBio");

// Load saved data
if(localStorage.getItem("profileName")){
    name.innerText = localStorage.getItem("profileName");
}

if(localStorage.getItem("profileBio")){
    bio.innerText = localStorage.getItem("profileBio");
}

editBtn.addEventListener("click",()=>{

    const newName = prompt("Enter Name", name.innerText);

    const newBio = prompt("Enter Bio", bio.innerText);

    if(newName){
        name.innerText = newName;
        localStorage.setItem("profileName", newName);
    }

    if(newBio){
        bio.innerText = newBio;
        localStorage.setItem("profileBio", newBio);
    }

});