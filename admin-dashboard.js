// Check admin authentication
function checkAuth() {
  const session = localStorage.getItem("adminSession");
  if (!session) {
    window.location.href = "admin.html";
    return false;
  }
  
  const sessionData = JSON.parse(session);
  if (Date.now() >= sessionData.expiresAt) {
    localStorage.removeItem("adminSession");
    window.location.href = "admin.html";
    return false;
  }
  
  return true;
}

// Logout function
function logout() {
  localStorage.removeItem("adminSession");
  window.location.href = "admin.html";
}

// Load and display data
let allData = [];
let filteredData = [];

function loadData() {
  allData = JSON.parse(localStorage.getItem("adminAssessmentData")) || [];
  filteredData = [...allData];
  updateSummary();
  displayResults();
}

function updateSummary() {
  const total = allData.length;
  const passed = allData.filter(item => item.passFail === "PASS").length;
  const passRate = total > 0 ? Math.round((passed / total) * 100) : 0;
  const avgScore = total > 0 ? Math.round(allData.reduce((sum, item) => sum + item.score, 0) / total) : 0;
  
  document.getElementById("totalCount").textContent = total;
  document.getElementById("passRate").textContent = passRate + "%";
  document.getElementById("avgScore").textContent = avgScore + "%";
}

function displayResults() {
  const tbody = document.getElementById("resultsBody");
  tbody.innerHTML = "";
  
  filteredData.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.employeeId}</td>
      <td>${item.email}</td>
      <td>${new Date(item.date).toLocaleDateString()}</td>
      <td>${item.score}%</td>
      <td><span class="status-${item.passFail.toLowerCase()}">${item.passFail}</span></td>
      <td>${item.emailSent ? '✅' : '—'}</td>
      <td>
        <button class="action-btn view-btn" onclick="viewDetails(${item.id})">View</button>
        <button class="action-btn reset-btn" onclick="resetAssessment('${item.employeeId}')">Reset</button>
        <button class="action-btn reassign-btn" onclick="reassignAssessment('${item.employeeId}')">Reassign</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Filter functions
function applyFilters() {
  const dateFrom = document.getElementById("dateFrom").value;
  const dateTo = document.getElementById("dateTo").value;
  const status = document.getElementById("statusFilter").value;
  const search = document.getElementById("nameSearch").value.toLowerCase();
  
  filteredData = allData.filter(item => {
    const itemDate = new Date(item.date).toISOString().split('T')[0];
    
    // Date filter
    if (dateFrom && itemDate < dateFrom) return false;
    if (dateTo && itemDate > dateTo) return false;
    
    // Status filter
    if (status && item.passFail !== status) return false;
    
    // Search filter
    if (search && !item.name.toLowerCase().includes(search) && 
        !item.employeeId.toLowerCase().includes(search)) return false;
    
    return true;
  });
  
  displayResults();
}

// Export function
function exportData() {
  const headers = ["Name", "Employee ID", "Email", "Date", "Score", "Status"];
  const csvContent = [
    headers.join(","),
    ...filteredData.map(item => [
      `"${item.name}"`,
      `"${item.employeeId}"`,
      `"${item.email}"`,
      `"${item.date}"`,
      item.score,
      item.passFail
    ].join(","))
  ].join("\\n");
  
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `assessment-results-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
}

// EmailJS configuration (update with your values)
const EMAIL_SERVICE_ID = 'service_ii2wjoc'; // replace with your EmailJS service ID
const EMAIL_TEMPLATE_INVITE = 'template_mxbq84y'; // invite template ID (set per requested value)
const EMAIL_PUBLIC_KEY = 'C-YoXDiclz35bdGBX'; // replace with your public key (optional)

// Initialize EmailJS when available
if (typeof emailjs !== 'undefined' && EMAIL_PUBLIC_KEY) {
  try { emailjs.init(EMAIL_PUBLIC_KEY); } catch (err) { console.warn('EmailJS init failed', err); }
}

// Site base URL UI helpers
function loadSiteBaseUrlUI() {
  try {
    const input = document.getElementById('siteBaseUrl');
    const current = document.getElementById('currentBase');
    let saved = localStorage.getItem('appBaseUrl');

    // If no saved base URL, default to the domain you provided
    if (!saved) {
      saved = 'https://www.backspacefinancial.co.za';
      try { localStorage.setItem('appBaseUrl', saved); console.log('Default appBaseUrl set to', saved); } catch (e) { console.warn('Could not auto-save appBaseUrl', e); }
    }

    if (input) input.value = saved || '';
    if (current) current.innerText = saved || '(not set)';

    const btn = document.getElementById('saveBaseUrl');
    if (btn) btn.addEventListener('click', () => {
      const val = (input.value || '').trim();
      if (!val) {
        localStorage.removeItem('appBaseUrl');
        current.innerText = '(not set)';
        alert('Public site base URL cleared. Remember to set a public URL before sending invites.');
        return;
      }
      // Basic validation
      if (/^https?:\/\//i.test(val) === false) {
        alert('Please enter a valid URL starting with http:// or https://');
        return;
      }
      // Warn about local addresses
      if (/localhost|127\.0\.0\.1|^file:/i.test(val)) {
        if (!confirm('This URL appears to be local (localhost or 127.0.0.1). Mobile devices typically cannot reach it unless on the same network. Continue anyway?')) return;
      }
      localStorage.setItem('appBaseUrl', val.replace(/\/$/, ''));
      current.innerText = val.replace(/\/$/, '');
      alert('Public site base URL saved. Sent links will use this URL.');
    });

    // Quick set-to-domain button
    const setBtn = document.getElementById('setToDomainBtn');
    if (setBtn) setBtn.addEventListener('click', () => {
      const domain = 'https://www.backspacefinancial.co.za';
      if (!confirm('Set public base URL to ' + domain + '?')) return;
      try { localStorage.setItem('appBaseUrl', domain); } catch (e) { console.warn('Failed to save domain', e); }
      if (input) input.value = domain;
      if (current) current.innerText = domain;
      alert('Public site base URL set to ' + domain);
    });
  } catch (e) { console.warn('loadSiteBaseUrlUI failed', e); }
}

// Expose a helper to validate base urls used when generating links
function isLocalHostish(url) {
  if (!url) return false;
  return /localhost|127\.0\.0\.1|^file:/i.test(url);
}

window.addEventListener('DOMContentLoaded', loadSiteBaseUrlUI);

// Helper: return a public base URL to use in emailed links. Checks localStorage, falls back to derived origin, or prompts admin to enter a public URL.
function getAppBaseUrl(promptIfMissing = true) {
  try {
    const saved = localStorage.getItem('appBaseUrl');
    if (saved && saved.trim().length) return saved.replace(/\/$/, '');

    const origin = window.location.origin;
    // When running from file:// origin may be 'null' — avoid using that in emailed links
    if (origin && origin !== 'null' && origin !== 'file:') {
      const basePath = window.location.pathname.replace(/[^/]*$/, '');
      return (origin.replace(/\/$/, '') + basePath).replace(/\/$/, '');
    }

    if (promptIfMissing) {
      const entered = window.prompt('Enter the public site base URL to use in emailed links (e.g. https://example.com). This will be saved for future invites.');
      if (entered && entered.trim()) {
        const normalized = entered.trim().replace(/\/$/, '');
        localStorage.setItem('appBaseUrl', normalized);
        return normalized;
      }
    }
  } catch (e) {
    console.warn('getAppBaseUrl failed', e);
  }
  return null;
}

// Token generation
function generateToken() {
  const studentName = document.getElementById('studentName').value;
  const studentEmail = document.getElementById('studentEmail').value;
  
  if (!studentName || !studentEmail) {
    alert('Please enter both student name and email');
    return;
  }
  
  // Generate unique token
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  const token = `BSF2024_${randomStr}_${timestamp.toString().slice(-6)}`;
  
  // Build link using relative path (works locally with file:// protocol)
  const assessmentLink = `index.html?token=${token}`; 
  
  // Store token for validation (add to valid tokens list)
  let validTokens = JSON.parse(localStorage.getItem('validTokens')) || [];
  validTokens.push({
    token: token,
    studentName: studentName,
    studentEmail: studentEmail,
    generated: new Date().toLocaleString(),
    used: false
  });
  localStorage.setItem('validTokens', JSON.stringify(validTokens));
  
  // Display the link and status
  const linkDiv = document.getElementById('generatedLink');
  linkDiv.innerHTML = `
    <h4>🔗 Assessment Link Generated</h4>
    <p><strong>Student:</strong> ${studentName} (${studentEmail})</p>
    <p><strong>Token:</strong> ${token}</p>
    <div style="background: white; padding: 10px; border-radius: 4px; margin: 10px 0; word-break: break-all; display:flex; gap:10px; align-items:center;">
      <div style="flex:1; word-break:break-all;"><strong>Link:</strong> <a href="${assessmentLink}" target="_blank">${assessmentLink}</a></div>
      <div>
        <button class="copy-btn" onclick="copyToClipboard('${assessmentLink}')">Copy Link</button>
        <button class="copy-btn" onclick="resendInvite()">Resend Invite</button>
      </div>
    </div>
    <p><em>Invitation will be sent to the student via email (if configured).</em></p>
    <div id="inviteStatus" style="margin-top:8px; display:none; font-weight:600;"></div>
  `;
  linkDiv.classList.add('show');

  // Prepare email parameters (include multiple alias names for compatibility with various templates)
  const emailParams = {
    to_email: studentEmail,
    student_email: studentEmail,
    recipient_email: studentEmail,
    student_name: studentName,
    student: studentName,
    name: studentName,
    assessment_link: assessmentLink,
    assessment_url: assessmentLink,
    invite_link: assessmentLink,
    link: assessmentLink,
    url: assessmentLink,
    assessment_link_html: `<a href="${assessmentLink}">${assessmentLink}</a>`,
    message: `Your personal assessment link: ${assessmentLink}`,
    message_html: `<p>Your personal assessment link: <a href="${assessmentLink}">${assessmentLink}</a></p>`,
    token: token
  };

  // Save for resend if needed (include full params and token)
  window.lastInvite = { emailParams, studentEmail, assessmentLink, token };

  // Save token to Firestore if available (so links work from any device)
  if (window.FirestoreHelper && window.FirestoreHelper.enabled) {
    window.FirestoreHelper.createToken({ token, studentName, studentEmail, generated: new Date().toLocaleString() })
      .then(() => {
        console.log('Token saved to Firestore:', token);
        const s = document.getElementById('inviteStatus'); if (s) { s.style.display = 'block'; s.style.color = '#065f46'; s.innerText = '✅ Token saved to central database'; }
      })
      .catch(err => {
        console.error('Failed to save token to Firestore', err);
        const s = document.getElementById('inviteStatus'); if (s) { s.style.display = 'block'; s.style.color = '#b91c1c'; s.innerText = '⚠ Token saved locally but failed to save to central database'; }
      });
  }

  // Try to send invite via EmailJS (returns a Promise)
  sendInviteEmail(emailParams).catch(err => console.warn('Invite send returned error', err));

  // Clear form
  document.getElementById('studentName').value = '';
  document.getElementById('studentEmail').value = '';
}

// Centralized invite send (returns a Promise, also supports optional callback)
function sendInviteEmail(params, callback) {
  const statusEl = document.getElementById('inviteStatus');
  function showStatus(msg, ok) {
    if (statusEl) { statusEl.style.display = 'block'; statusEl.style.color = ok ? '#065f46' : '#b91c1c'; statusEl.innerText = msg; }
  }

  return new Promise((resolve, reject) => {
    if (typeof emailjs === 'undefined') {
      console.warn('EmailJS SDK not loaded');
      showStatus('Email service not loaded. Please include EmailJS script on the dashboard or copy the link and send manually.', false);
      if (callback) callback(false);
      return reject(new Error('EmailJS SDK not loaded'));
    }

    if (!EMAIL_SERVICE_ID || !EMAIL_TEMPLATE_INVITE) {
      showStatus('Email service not configured. Please set EMAIL_SERVICE_ID and EMAIL_TEMPLATE_INVITE in admin-dashboard.js', false);
      if (callback) callback(false);
      return reject(new Error('Email service not configured'));
    }

    showStatus('Sending invite...', true);
    console.log('Sending invite', { service: EMAIL_SERVICE_ID, template: EMAIL_TEMPLATE_INVITE, params });

    emailjs.send(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_INVITE, params, EMAIL_PUBLIC_KEY)
      .then((response) => {
        console.log('Invite sent to', params.to_email, response);
        showStatus('✅ Invitation email sent to ' + params.to_email + ' (template: ' + EMAIL_TEMPLATE_INVITE + ')', true);

        // Mark token as invited so admin can track
        try {
          let validTokens = JSON.parse(localStorage.getItem('validTokens')) || [];
          const idx = validTokens.findIndex(t => t.token === params.token);
          if (idx !== -1) {
            validTokens[idx].invited = true;
            validTokens[idx].lastInviteResponse = response;
            localStorage.setItem('validTokens', JSON.stringify(validTokens));
          }
        } catch (e) {
          console.warn('Failed to update validTokens with invite status', e);
        }

        if (callback) callback(true, response);
        resolve(response);
      })
      .catch((err) => {
        console.error('Invite send failed', err);
        showStatus('❌ Email failed to send — copy link and send manually. See console for details.', false);
        if (callback) callback(false, err);
        reject(err);
      });
  });
}

// Test helper for invites (run from console): testSendInvite('you@example.com')
function testSendInvite(toEmail) {
  if (!toEmail) { console.warn('Usage: testSendInvite("email@example.com")'); return; }
  const link = (getAppBaseUrl(false) || (window.location.origin && window.location.origin !== 'null' && window.location.origin !== 'file:' ? window.location.origin : 'https://example.com')).replace(/\/$/, '') + '/index.html?token=TEST_INVITE';
  const params = {
    to_email: toEmail,
    student_email: toEmail,
    student_name: 'Test Student',
    student: 'Test Student',
    assessment_link: link,
    invite_link: link,
    link: link,
    message: 'Your personal assessment link: ' + link,
    message_html: `<p>Your personal assessment link: <a href="${link}">${link}</a></p>`,
    token: 'TEST_INVITE'
  };
  console.log('Sending test invite', params);
  // Support both callback style and Promise style
  sendInviteEmail(params, function(ok, err) {
    if (ok) console.log('Test invite sent to (callback) ', toEmail);
    else console.error('Test invite failed (callback)', err);
  }).then(res => console.log('Test invite sent (promise)', res)).catch(err => console.error('Test invite failed (promise)', err));
}

// Test helper to fetch a token doc from Firestore (console): testFirestoreToken('TOKEN')
function testFirestoreToken(token) {
  if (!token) { console.warn('Usage: testFirestoreToken("TOKEN")'); return; }
  if (!window.FirestoreHelper || !window.FirestoreHelper.enabled) { console.warn('Firestore not enabled'); return; }
  window.FirestoreHelper.getTokenDoc(token).then(doc => console.log('Token doc:', doc)).catch(err => console.error('Failed to fetch token', err));
}

// Test helper to save a dummy assessment to Firestore: testSaveAssessment()
function testSaveAssessment() {
  if (!window.FirestoreHelper || !window.FirestoreHelper.enabled) { console.warn('Firestore not enabled'); return; }
  const record = {
    id: Date.now(),
    name: 'Test Student',
    email: 'test@example.com',
    employeeId: 'TEST-001',
    score: 85,
    passFail: 'PASS',
    date: new Date().toLocaleString(),
    status: 'completed',
    detailedResults: [],
    timeTaken: 15,
    attemptNumber: 1
  };
  window.FirestoreHelper.saveAssessment(record).then(res => console.log('Saved test assessment', res)).catch(err => console.error('Failed to save test assessment', err));
}


function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('Link copied to clipboard!');
  }).catch(() => {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('Link copied to clipboard!');
  });
}

// Resend the last generated invite (if any)
function resendInvite() {
  if (!window.lastInvite || !window.lastInvite.emailParams) {
    alert('No recent invite found to resend. Please generate a new token first.');
    return;
  }
  // Call the send function and show an alert on result
  sendInviteEmail(window.lastInvite.emailParams)
    .then(res => {
      console.log('Resend invite success', res);
      alert('Invite resent successfully.');
    })
    .catch(err => {
      console.error('Resend invite failed', err);
      alert('Resend failed. Check console for details.');
    });
}

// Assessment management functions
function clearAllData() {
  if (confirm('Are you sure you want to clear ALL assessment data? This action cannot be undone.')) {
    localStorage.removeItem('adminAssessmentData');
    allData = [];
    filteredData = [];
    loadData();
    alert('All assessment data has been cleared!');
  }
}

function resetAssessment(employeeId) {
  if (confirm(`Reset assessment for employee ${employeeId}? This will allow them to retake the assessment.`)) {
    // Remove from admin data
    allData = allData.filter(item => item.employeeId !== employeeId);
    localStorage.setItem("adminAssessmentData", JSON.stringify(allData));
    
    // Clear any existing attempt flags
    localStorage.removeItem("attempted");
    
    loadData();
    alert("Assessment reset successfully!");
  }
}

function reassignAssessment(employeeId) {
  if (confirm(`Reassign assessment for employee ${employeeId}? This will reset their current attempt.`)) {
    resetAssessment(employeeId);
  }
}

function viewDetails(id) {
  const item = allData.find(data => data.id === id);
  if (item) {
    // Store detailed results for viewing
    localStorage.setItem("viewResult", JSON.stringify(item));
    window.open("result.html", "_blank");
  }
}

// Event listeners
document.getElementById("dateFrom").addEventListener("change", applyFilters);
document.getElementById("dateTo").addEventListener("change", applyFilters);
document.getElementById("statusFilter").addEventListener("change", applyFilters);
document.getElementById("nameSearch").addEventListener("input", applyFilters);

// Initialize
if (checkAuth()) {
  loadData();
}