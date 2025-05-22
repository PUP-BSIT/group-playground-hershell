const profileInput = document.getElementById("profile_image");
const preview = document.getElementById("image_preview");
const removeBtn = document.getElementById("remove_image");

profileInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.innerHTML = `<img src="${e.target.result}" alt="Profile Image">`;
      removeBtn.style.display = "flex";
    };
    reader.readAsDataURL(file);
  }
});

removeBtn.addEventListener("click", function () {
  profileInput.value = "";
  preview.innerHTML = "<span>add image</span>";
  removeBtn.style.display = "none";
});