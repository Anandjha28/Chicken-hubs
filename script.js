let isSignup = false;

document.getElementById("toggleBtn").addEventListener("click", function (e) {
  e.preventDefault();
  isSignup = !isSignup;

  document.getElementById("form-title").innerText = isSignup ? "Sign Up" : "Sign In";
  document.getElementById("mainBtn").innerText = isSignup ? "Sign Up" : "Sign In";
  document.getElementById("toggleText").innerText = isSignup
    ? "Already have an account?"
    : "Don't have an account?";
  document.getElementById("toggleBtn").innerText = isSignup ? "Sign In" : "Sign Up";
  document.getElementById("nameField").style.display = isSignup ? "flex" : "none";
});

document.getElementById("mainBtn").addEventListener("click", function () {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (isSignup) {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find(u => u.email === email)) {
      alert("User already exists!");
      return;
    }

    const role = email === "admin@chickenhub.com" ? "admin" : "user";

    users.push({ name, email, password, role });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful! You can now log in.");
    document.getElementById("toggleBtn").click(); // switch to login
  } else {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      alert(`Welcome ${user.name}, logging in as ${user.role}`);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "menu.html";
      }
    } else {
      alert("Invalid email or password!");
    }
  }
});
