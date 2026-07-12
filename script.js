alert("CIAO ALESSANDRA");
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import { 
    getStorage,
    ref,
    uploadBytes
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



const camera = document.getElementById("cameraInput");
const gallery = document.getElementById("galleryInput");

const preview = document.getElementById("preview");
const uploadButton = document.getElementById("uploadButton");

const message = document.getElementById("message");


let selectedFile = null;



function showPhoto(file) {

    if (!file) return;

    selectedFile = file;

    const reader = new FileReader();

    reader.onload = function(e) {

        preview.src = e.target.result;

        preview.classList.remove("hidden");

        uploadButton.classList.remove("hidden");

    };

    reader.readAsDataURL(file);

}



camera.addEventListener("change", (e) => {

    showPhoto(e.target.files[0]);

});


gallery.addEventListener("change", (e) => {

    showPhoto(e.target.files[0]);

});



uploadButton.addEventListener("click", async (e) => {

    e.preventDefault();


    console.log("UPLOAD PREMUTO");


    if (!selectedFile) {

        message.innerHTML = "Nessuna foto selezionata";

        return;

    }


    message.innerHTML = "Caricamento in corso... 📸";


    try {


        const fileRef = ref(
            storage,
            "photos/" + Date.now() + "-" + selectedFile.name
        );


        await uploadBytes(
            fileRef,
            selectedFile
        );


        message.innerHTML =
        "✨ Foto caricata con successo!";


    } catch(error) {


        message.innerHTML =
        "Errore: " + error.message;


        console.log(error);

    }


});
