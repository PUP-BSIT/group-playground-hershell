function openPostModal() {
  const postModal = document.getElementById("postModal");
  postModal.classList.remove("hidden");
  postModal.classList.add("flex-center");
}

function closePostModal() {
  const postModal = document.getElementById("postModal");
  postModal.classList.add("hidden");
  postModal.classList.remove("flex-center");
}

window.addEventListener("click", function (e) {
  const postModal = document.getElementById("postModal");
  if (e.target === postModal) {
    postModal.style.display = "none";
  }
});

function toggleDropdown(icon) {
  const parent = icon.parentElement;
  parent.classList.toggle('active');
}

function cancelDropdown(button) {
  const parent = button.closest('.more-option');
  parent.classList.remove('active');
}

function editPost(button) {
  const post = button.closest(".sample-post");
  const contentDiv = post.querySelector(".content");
  const paragraph = contentDiv.querySelector("p");
  const image = contentDiv.querySelector("img");

  // Prevent duplicate editors
  if (contentDiv.querySelector(".edit-editor")) return;

  // Create editable contentEditable div
  const editorDiv = document.createElement("div");
  editorDiv.className = "edit-editor";
  editorDiv.contentEditable = true;
  editorDiv.innerHTML = paragraph.innerHTML;

  // Create file input for image upload
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.className = "edit-image-input";

  // Create save button with onclick pointing to a global function
  const saveButton = document.createElement("button");
  saveButton.innerText = "Save";
  saveButton.className = "save-edit-button";
  saveButton.setAttribute("onclick", "handleSaveEdit(this)");

  // Hide the paragraph while editing
  paragraph.classList.add("hidden");

  // Insert editing elements before the paragraph
  contentDiv.insertBefore(editorDiv, paragraph);
  contentDiv.insertBefore(fileInput, paragraph);
  contentDiv.insertBefore(saveButton, paragraph);

  // Close dropdown menu
  cancelDropdown(button);
}


function handleSaveEdit(button) {
  const post = button.closest(".sample-post");
  const contentDiv = post.querySelector(".content");
  const paragraph = contentDiv.querySelector("p");
  const editorDiv = contentDiv.querySelector(".edit-editor");
  const fileInput = contentDiv.querySelector(".edit-image-input");
  const image = contentDiv.querySelector("img");

  paragraph.innerHTML = editorDiv.innerHTML;
  paragraph.classList.remove("hidden");

  if (fileInput && fileInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function (e) {
      if (image) {
        image.src = e.target.result;
      }
    };
    reader.readAsDataURL(fileInput.files[0]);
  }

  // Clean up editing UI
  editorDiv.remove();
  fileInput.remove();
  button.remove();
}

function deletePost(button) {
  const post = button.closest('.sample-post');
  if (confirm("Are you sure you want to delete this post?")) {
    post.remove();
  }
}

function submitPost() {
  const textarea = document.querySelector('.modal-overlay textarea');
  const postText = textarea.value.trim();

  if (!postText) {
    alert('Please enter some text to post.');
    return;
  }

  const leftContent = document.querySelector('.left-content');

  // Create post element
  const post = document.createElement('div');
  post.className = 'sample-post';
  post.innerHTML = `
    <div class="post-header">
      <div class="post-header-left">
        <img src="../assets/temporary_pfp.png" alt="user profile" class="profile-pic">
        <div class="post-info">
          <span class="username">Jane Dee</span>
          <span class="timestamp">${new Date().toLocaleString()}</span>
        </div>
      </div>
      <div class="more-option">
        <img src="../assets/more_icon.png" alt="more" onclick="toggleDropdown(this)">
        <div class="dropdown-menu">
          <button onclick="editPost(this)">Edit</button>
          <button onclick="deletePost(this)">Delete</button>
          <button onclick="cancelDropdown(this)">Cancel</button>
        </div>
      </div>
    </div>

    <div class="post-content">
      <div class="content">
        <p>${postText}</p>
      </div>
    </div>
  `;

  // Prepend the new post right after the create-post section
  leftContent.insertBefore(post, leftContent.children[1]);

  // Clear textarea & close modal
  textarea.value = '';
  closePostModal();
}
