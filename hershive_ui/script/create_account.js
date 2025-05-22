const profileInput = document.getElementById('profileImage');
  const preview = document.getElementById('imagePreview');

  profileInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        preview.innerHTML = `<img src="${e.target.result}"alt="Profile Image">`;
      };

      reader.readAsDataURL(file);
    }
  });