// Check if already attempted for this token
const tokenForTimer = localStorage.getItem('accessToken') || sessionStorage.getItem('assessmentToken');
if (tokenForTimer && localStorage.getItem(`attempted_${tokenForTimer}`) === "yes") {
  window.location.href = "index.html";
}

var seconds = 3600;
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
