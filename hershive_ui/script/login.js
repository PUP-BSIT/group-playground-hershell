function validateForm() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
 
  // Temporary validation
  // needs to connect to database
  if (!username || !password) {
    alert("Please fill in both fields.");
    return false;
  }

  alert("Login successful (demo)");
  return false;
}
