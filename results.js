const result = JSON.parse(localStorage.getItem("result"));

document.getElementById("status").textContent = result.passFail;
document.getElementById("score").textContent = `Final Score: ${result.percentage}%`;
document.getElementById("date").textContent = `Completed: ${result.completed}`;

// Summary section
const summary = document.getElementById("summary");
summary.innerHTML = `
  <div style="margin-top: 20px; padding: 15px; background: #f8fafc; border-radius: 8px;">
    <p><strong>Questions Answered:</strong> ${result.answeredCount} of ${result.totalQuestions}</p>
    <p><strong>Correct Answers:</strong> ${result.score} of ${result.totalQuestions}</p>
    <p><strong>Unanswered Questions:</strong> ${result.totalQuestions - result.answeredCount}</p>
  </div>
`;

// Detailed question breakdown
const detailsContainer = document.getElementById("questionDetails");
let detailsHTML = "";

result.detailedResults.forEach((item, index) => {
  const questionNum = index + 1;
  let statusClass = "";
  let statusText = "";
  
  if (!item.wasAnswered) {
    statusClass = "unanswered";
    statusText = "Not Answered";
  } else if (item.isCorrect) {
    statusClass = "correct";
    statusText = "Correct";
  } else {
    statusClass = "incorrect";
    statusText = "Incorrect";
  }
  
  detailsHTML += `
    <div class="question-review ${statusClass}">
      <div class="question-header">
        <span class="question-number">Q${questionNum}</span>
        <span class="status-badge ${statusClass}">${statusText}</span>
      </div>
      <p class="question-text">${item.question}</p>
      <div class="answer-options">
  `;
  
  item.options.forEach((option, optIndex) => {
    let optionClass = "";
    if (optIndex === item.correctAnswer) {
      optionClass = "correct-option";
    }
    if (item.wasAnswered && optIndex === item.userAnswer && !item.isCorrect) {
      optionClass = "wrong-option";
    }
    
    detailsHTML += `<div class="option ${optionClass}">${option}</div>`;
  });
  
  detailsHTML += `
      </div>
      <div class="answer-summary">
  `;
  
  if (item.wasAnswered) {
    detailsHTML += `<p><strong>Your Answer:</strong> ${item.options[item.userAnswer]}</p>`;
  } else {
    detailsHTML += `<p><strong>Your Answer:</strong> <span class="not-answered">Not answered</span></p>`;
  }
  
  detailsHTML += `
        <p><strong>Correct Answer:</strong> ${item.options[item.correctAnswer]}</p>
      </div>
    </div>
  `;
});

detailsContainer.innerHTML = detailsHTML;