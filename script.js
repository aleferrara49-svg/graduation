const camera = document.getElementById("cameraInput");
const gallery = document.getElementById("galleryInput");

const preview = document.getElementById("preview");
const uploadButton = document.getElementById("uploadButton");

const message = document.getElementById("message");


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


uploadButton.addEventListener("click", function() {

    message.innerHTML = "Foto pronta per essere caricata 📸";

});
