hhhdocument.getElementById("detailsForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  // Check if user has valid token
  const token = sessionStorage.getItem('assessmentToken');
  if (!token) {
    alert('Invalid access. Please use the correct assessment link.');
    return;
  }

  // Mark that an assessment is in progress in this browser session (prevents immediate redirect on assessment page)
  try { sessionStorage.setItem('assessmentInProgress', 'yes'); } catch (e) { console.warn('Could not set session assessmentInProgress', e); }

  // If Firestore is enabled, try to atomically mark token as used (prevents reuse from another device)
  if (window.FirestoreHelper && window.FirestoreHelper.enabled) {
    try {
      await window.FirestoreHelper.markTokenUsed(token, { byEmail: (document.getElementById('email') && document.getElementById('email').value) || null });
      console.log('Token marked as used in Firestore:', token);
    } catch (err) {
      console.warn('Failed to mark token used in Firestore:', err);
      // If the token exists locally (generated earlier while testing), fall back to local attempt tracking
      const validTokens = JSON.parse(localStorage.getItem('validTokens')) || [];
      const localToken = validTokens.find(t => t.token === token);
      if (localToken && !localToken.used) {
        console.log('Falling back to local token usage for', token);
        const attemptedKey = `attempted_${token}`;
        if (localStorage.getItem(attemptedKey) === "yes") {
          alert("Assessment already completed for this link. You have only ONE attempt.");
          // Clear in-progress flag since we are aborting
          sessionStorage.removeItem('assessmentInProgress');
          return;
        }
        localStorage.setItem(attemptedKey, "yes");
        // mark token as used locally
        localToken.used = true;
        localStorage.setItem('validTokens', JSON.stringify(validTokens));
      } else {
        alert('This link has already been used or is invalid. Please contact the administrator.');
        // Clear in-progress flag since we are aborting
        sessionStorage.removeItem('assessmentInProgress');
        return;
      }
    }
  } else {
    // LocalStorage fallback: Check per-token attempt flag
    const attemptedKey = `attempted_${token}`;
    if (localStorage.getItem(attemptedKey) === "yes") {
      alert("Assessment already completed for this link. You have only ONE attempt.");
      // Clear in-progress flag since we are aborting
      sessionStorage.removeItem('assessmentInProgress');
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
