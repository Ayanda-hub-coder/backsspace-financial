document.getElementById("adminLoginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const password = document.getElementById("adminPassword").value;
  const correctPassword = "BackspaceAdmin2024";
  
  if (password === correctPassword) {
    // Set admin session
    const sessionData = {
      isAdmin: true,
      loginTime: Date.now(),
      expiresAt: Date.now() + (2 * 60 * 60 * 1000) // 2 hours
    };
    
    localStorage.setItem("adminSession", JSON.stringify(sessionData));
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("loginError").style.display = "block";
    document.getElementById("adminPassword").value = "";
  }
});

// Check if already logged in
function checkAdminSession() {
  const session = localStorage.getItem("adminSession");
  if (session) {
    const sessionData = JSON.parse(session);
    if (Date.now() < sessionData.expiresAt) {
      window.location.href = "dashboard.html";
    } else {
      localStorage.removeItem("adminSession");
    }
  }
}

// Clear admin session (for testing/reset)
function clearAdminSession() {
  localStorage.removeItem("adminSession");
  console.log("Admin session cleared");
}

checkAdminSession();