document.addEventListener("DOMContentLoaded", function () {
  const shareTrigger = document.getElementById("shareTrigger");
  const postModal = document.getElementById("postModal");
  const closeModal = document.getElementById("closeModal");

  shareTrigger.addEventListener("click", () => {
    postModal.style.display = "flex";
  });

  closeModal.addEventListener("click", () => {
    postModal.style.display = "none";
  });

  // Optional: close modal when clicking outside the modal
  window.addEventListener("click", (e) => {
    if (e.target === postModal) {
      postModal.style.display = "none";
    }
  });
});
