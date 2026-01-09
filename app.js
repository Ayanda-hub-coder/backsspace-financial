document.getElementById("detailsForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  // Check if user has valid token
  const token = sessionStorage.getItem('assessmentToken');
  if (!token) {
    alert('Invalid access. Please use the correct assessment link.');
    return;
  }

  // If Firestore is enabled, try to atomically mark token as used (prevents reuse from another device)
  if (window.FirestoreHelper && window.FirestoreHelper.enabled) {
    try {
      await window.FirestoreHelper.markTokenUsed(token, { byEmail: email.value });
      console.log('Token marked as used in Firestore:', token);
    } catch (err) {
      console.error('Failed to mark token used:', err);
      alert('This link has already been used or is invalid. Please contact the administrator.');
      return;
    }
  } else {
    // LocalStorage fallback: Check per-token attempt flag
    const attemptedKey = `attempted_${token}`;
    if (localStorage.getItem(attemptedKey) === "yes") {
      alert("Assessment already completed for this link. You have only ONE attempt.");
      return;
    }
    // Mark attempted locally now to avoid race
    localStorage.setItem(attemptedKey, "yes");
  }

  localStorage.setItem("name", fullName.value);
  localStorage.setItem("email", email.value);
  localStorage.setItem("employee", employeeId.value);
  localStorage.setItem("accessToken", token);

  window.location.href = "assesment.html?token=" + token;
});
