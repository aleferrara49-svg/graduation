import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import { 
    getStorage 
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-storage.js";


const firebaseConfig = {
  apiKey: "AIzaSyAzQ1Igp_eCFjyvFYfHSSl_OCgBfOWK1jg",
  authDomain: "laurea-di-alessandra.firebaseapp.com",
  projectId: "laurea-di-alessandra",
  storageBucket: "laurea-di-alessandra.firebasestorage.app",
  messagingSenderId: "377947615238",
  appId: "1:377947615238:web:2d81f2390ddd8224129387"
};


const app = initializeApp(firebaseConfig);

const storage = getStorage(app);


console.log("Firebase collegato 🎓");


const camera = document.getElementById("cameraInput");
const gallery = document.getElementById("galleryInput");

const preview = document.getElementById("preview");

const uploadButton = document.getElementById("uploadButton");


function showPhoto(file) {

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function(e) {

        preview.src = e.target.result;

        preview.classList.remove("hidden");

        uploadButton.classList.remove("hidden");

    };

    reader.readAsDataURL(file);

}


camera.addEventListener("change", function() {
    showPhoto(this.files[0]);
});


gallery.addEventListener("change", function() {
    showPhoto(this.files[0]);
});
