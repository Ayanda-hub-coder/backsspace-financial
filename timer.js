// Check if already attempted for this token; allow if the assessment is currently in progress in this session
const tokenForTimer = localStorage.getItem('accessToken') || sessionStorage.getItem('assessmentToken');
const inProgress = sessionStorage.getItem('assessmentInProgress') === 'yes';
if (tokenForTimer && localStorage.getItem(`attempted_${tokenForTimer}`) === "yes" && !inProgress) {
  window.location.href = "index.html";
}

var seconds = 3600; // default to 60 minutes
var timer = document.getElementById("timer");

window.timerInterval = setInterval(function () {
  var m = Math.floor(seconds / 60);
  var s = seconds % 60;

  timer.textContent = m + ":" + (s < 10 ? "0" + s : s);
  seconds--;

  if (seconds < 0) {
    clearInterval(timerInterval);
    submitAssessment();
  }
}, 1000);
