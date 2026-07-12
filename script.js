import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";


// =============================
// // const firebaseConfig = {


  apiKey: "AIzaSyCU6Ix5V-Zglx8IvQhpLO7GecbKJIoTABA",


  authDomain: "laurea-ale-22a18.firebaseapp.com",


  projectId: "laurea-ale-22a18",


  storageBucket: "laurea-ale-22a18.firebasestorage.app",


  messagingSenderId: "107580966507",


  appId: "1:107580966507:web:323b8b684803dc9acf932e",


  measurementId: "G-LMVQ6DD0D2"


};
// ============================


// Avvio Firebase

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);



// Elementi pagina

const cameraInput = document.getElementById("cameraInput");
const galleryInput = document.getElementById("galleryInput");

const previewContainer = document.getElementById("previewContainer");
const previewImage = document.getElementById("previewImage");

const uploadButton = document.getElementById("uploadButton");

const progressContainer = document.getElementById("progressContainer");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

const successMessage = document.getElementById("successMessage");



let selectedFile = null;



// =============================
// SCELTA FOTO
// =============================

cameraInput.addEventListener(
    "change",
    handleFile
);


galleryInput.addEventListener(
    "change",
    handleFile
);



function handleFile(event) {

    const file = event.target.files[0];

    if (!file) return;


    compressImage(file)
        .then(compressedFile => {

            selectedFile = compressedFile;

            showPreview(compressedFile);

        });

}



// =============================
// ANTEPRIMA
// =============================

function showPreview(file) {


    const reader = new FileReader();


    reader.onload = function(e) {

        previewImage.src = e.target.result;

        previewContainer.classList.remove("hidden");

        uploadButton.classList.remove("hidden");

    };


    reader.readAsDataURL(file);

}




// =============================
// RIDUCE IL PESO DELLE FOTO
// =============================

function compressImage(file) {


    return new Promise(resolve => {


        const image = new Image();

        const canvas = document.createElement("canvas");

        const ctx = canvas.getContext("2d");



        image.onload = function() {


            let width = image.width;
            let height = image.height;


            const maxWidth = 1600;


            if (width > maxWidth) {

                height = height * maxWidth / width;

                width = maxWidth;

            }



            canvas.width = width;

            canvas.height = height;



            ctx.drawImage(
                image,
                0,
                0,
                width,
                height
            );



            canvas.toBlob(

                blob => {


                    resolve(

                        new File(
                            [
                                blob
                            ],

                            "alessandra-photo-" +
                            Date.now() +
                            ".jpg",

                            {
                                type:"image/jpeg"
                            }

                        )

                    );


                },

                "image/jpeg",

                0.85

            );


        };


        image.src = URL.createObjectURL(file);


    });

}




// =============================
// CARICAMENTO FOTO
// =============================

uploadButton.addEventListener(
    "click",
    uploadPhoto
);



function uploadPhoto() {


    if (!selectedFile) return;



    progressContainer.classList.remove("hidden");



    const filePath =
        "photos/" +
        Date.now() +
        "-" +
        selectedFile.name;



    const storageRef = ref(
        storage,
        filePath
    );



    const uploadTask = uploadBytesResumable(
        storageRef,
        selectedFile
    );



    uploadTask.on(

        "state_changed",

        snapshot => {


            const progress =
            (
                snapshot.bytesTransferred /
                snapshot.totalBytes
            ) * 100;



            progressFill.style.width =
                progress + "%";



            progressText.innerText =
                "Uploading " +
                Math.round(progress) +
                "%";


        },


        error => {

            alert(
                "Errore caricamento: " +
                error.message
            );

        },


        () => {


            getDownloadURL(
                uploadTask.snapshot.ref
            )
            .then(() => {


                successMessage.classList.remove(
                    "hidden"
                );


                uploadButton.classList.add(
                    "hidden"
                );


                launchConfetti();


            });


        }

    );


}




// =============================
// FESTA 🎉
// =============================

function launchConfetti() {


    confetti({

        particleCount: 150,

        spread: 100,

        origin: {
            y: 0.6
        }

    });


}
