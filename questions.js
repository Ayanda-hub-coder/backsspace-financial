const questions = [
  { question: "1. Product A is officially known as:", options: ["Income Protection Plan","Salary Advance Plan","Medical Expense Cover","Retirement Savings Plan"], answer: 0 },
  { question: "2. What is Backspace Financial's registration number?", options: ["2020/799246/07","2021/799246/07","2022/799246/07","2021/699246/07"], answer: 1 },
  { question: "3. What is the main purpose of Product A?", options: ["To sell multiple insurance products","To protect employee income during periods of incapacity","To provide business loans","To manage medical aid"], answer: 1 },
  { question: "4. Why was Product A developed?", options: ["To improve staff promotions","To address the gap in employee income protection","To replace retrenchment packages","To compete with medical schemes"], answer: 1 },
  { question: "5. Who is Product A designed for?", options: ["Walk-in retail customers","Medical aid members","Companies and their employees","Government departments only"], answer: 2 },
  { question: "6. The primary objective of Product A is to:", options: ["Offer the cheapest cover","Protect employees while supporting employer stability","Increase staff deductions","Replace health insurance"], answer: 1 },
  { question: "7. Product A mainly benefits:", options: ["Brokers only","Employers and employees","Payroll vendors","Banks"], answer: 1 },
  { question: "8. Product A assists companies by:", options: ["Reducing HR, financial, and reputational risk","Paying performance bonuses","Cutting workforce costs","Managing staff discipline"], answer: 0 },
  { question: "9. One direct benefit for employees is:", options: ["Promotion opportunities","Financial security during incapacity","Reduced working hours","Free transport"], answer: 1 },
  { question: "10. Product A contributes positively to a company's:", options: ["Inventory levels","Employer image and reputation","Share price only","Debt recovery"], answer: 1 },
  { question: "11. What does Product A provide?", options: ["Life cover","Income replacement when an employee cannot work","Lump-sum death benefits","Retirement funding"], answer: 1 },
  { question: "12. How are premiums for Product A collected?", options: ["Debit order","Payroll deduction from employee payslip","Cash payments","Annual invoicing"], answer: 1 },
  { question: "13. Who benefits directly from Product A?", options: ["Company shareholders only","Both employers and employees","Sales consultants","Government"], answer: 1 },
  { question: "14. Which is NOT a feature of Product A?", options: ["Income payout during incapacity","Payroll-based contribution","Employer reputation support","Theft and property cover"], answer: 3 },
  { question: "15. What makes Product A easy to implement?", options: ["Integration with payroll systems","No HR involvement","Single-employee enrolment","Long activation process"], answer: 0 },
  { question: "16. Why is Product A important for businesses?", options: ["It reduces productivity","It protects employee income and company reputation","It increases tax obligations","It removes employee leave"], answer: 1 },
  { question: "17. If an employee becomes incapacitated:", options: ["Income stops completely","Product A replaces lost income","The employee is retrenched","The employee must resign"], answer: 1 },
  { question: "18. Product A is classified as:", options: ["Life insurance","Income replacement cover","Investment product","Retirement annuity"], answer: 1 },
  { question: "19. Who is responsible for presenting Product A to companies?", options: ["B2B Sales Executives","HR Administrators","Accountants","Payroll officers"], answer: 0 },
  { question: "20. A key selling point of Product A is:", options: ["Employee security and employer credibility","Reduced staff taxes","Medical aid replacement","Bonus funding"], answer: 0 },
  { question: "21. B2B stands for:", options: ["Business to Buyer","Business to Business","Back to Business","Buy to Bank"], answer: 1 },
  { question: "22. Decision-makers typically include:", options: ["CEOs, Directors, HR Managers, Financial Managers","Receptionists","Sales agents","Warehouse staff"], answer: 0 },
  { question: "23. B2B sales differ from retail sales because:", options: ["Solutions are sold to businesses, not individuals","B2B focuses on walk-in clients","Retail targets executives only","There is no difference"], answer: 0 },
  { question: "24. When engaging decision-makers, communication should be:", options: ["Clear, brief, and professional","Casual and humorous","Loud and dominant","Informal"], answer: 0 },
  { question: "25. Emails to decision-makers should begin with:", options: ["A professional greeting using their name","Hey or Hi","No greeting","Slang"], answer: 0 },
  { question: "26. A Sales Executive should believe that Product A:", options: ["Is just another insurance product","Provides real protection for employees and employers","Is optional and unimportant","Is only for compliance"], answer: 1 },
  { question: "27. The correct tone for calls and emails is:", options: ["Friendly, professional, confident","Aggressive","Overly casual","Robotic"], answer: 0 },
  { question: "28. Decision-makers generally prefer communication that is:", options: ["Long and detailed","Short, relevant, and direct","Informal","Avoided"], answer: 1 },
  { question: "29. The most important B2B sales skill is:", options: ["Talking constantly","Listening and addressing client needs","Using humour","Avoiding objections"], answer: 1 },
  { question: "30. If a decision-maker hesitates:", options: ["Refocus on employee protection and business risk","End the conversation","Argue","Ignore them"], answer: 0 },
  { question: "31. First step in the sales process:", options: ["Lead cleansing","Sending follow-up email","Booking a meeting","Risk assessment"], answer: 0 },
  { question: "32. First follow-up call should be made:", options: ["Immediately","After 24–48 hours","After one week","After one month"], answer: 1 },
  { question: "33. Initial outreach email should start with:", options: ["The decision-maker's name","Dear Sir/Madam","No greeting","A joke"], answer: 0 },
  { question: "34. Every professional email must include:", options: ["Personal story","Professional signature","Promotional video","Discount code"], answer: 1 },
  { question: "35. The goal of a follow-up call is to:", options: ["Confirm receipt and build interest","Close immediately","Ask for budget","Request personal details"], answer: 0 },
  { question: "36. Second follow-up email is used to:", options: ["Re-engage politely","Pressure the client","Spam repeatedly","End communication"], answer: 0 },
  { question: "37. Final follow-up should offer:", options: ["A 15-minute risk assessment","Free lunch","Discount","Shares"], answer: 0 },
  { question: "38. Risk assessment purpose:", options: ["Identify exposure and position Product A","Close the deal","Conduct interviews","Review finances"], answer: 0 },
  { question: "39. Ideal length of a risk assessment call:", options: ["5 minutes","15 minutes","45 minutes","60 minutes"], answer: 1 },
  { question: "40. Desired outcome of the risk assessment:", options: ["Book a proposal meeting","Collect personal data","Send pricing immediately","Ask for referrals"], answer: 0 },
  { question: "41. Which is NOT a core professional value?", options: ["Confidence","Care","Integrity","Negligence"], answer: 3 },
  { question: "42. If a mistake occurs, you should:", options: ["Hide it","Take accountability and correct it","Blame others","Ignore it"], answer: 1 },
  { question: "43. Professional calls require:", options: ["Preparation and respect","Loud speech","Interruptions","Over-familiarity"], answer: 0 },
  { question: "44. Persistence in B2B sales means:", options: ["Strategic, respectful follow-ups","Excessive calling","Ignoring objections","Aggression"], answer: 0 },
  { question: "45. As a Sales Executive, you represent:", options: ["The brand and its reputation","Personal goals only","The client's staff","Other providers"], answer: 0 }
];

let currentQuestion = 0;
const userAnswers = {};
const form = document.getElementById("assessmentForm");
const startTime = Date.now(); // Track start time

function displayQuestion() {
  const q = questions[currentQuestion];
  let html = `
    <div class="question-container">
      <p><strong>${q.question}</strong></p>
      <div class="options">
  `;
  
  q.options.forEach((opt, i) => {
    const checked = userAnswers[currentQuestion] === i ? 'checked' : '';
    html += `
      <label>
        <input type="radio" name="current" value="${i}" ${checked} onchange="saveAnswer(${i})">
        ${opt}
      </label><br>
    `;
  });
  
  html += `
      </div>
      <div class="navigation">
        <button type="button" onclick="previousQuestion()" ${currentQuestion === 0 ? 'disabled' : ''}>Previous</button>
        <span>Question ${currentQuestion + 1} of ${questions.length}</span>
        ${currentQuestion === questions.length - 1 ? 
          '<button type="button" onclick="reviewAnswers()">Done</button>' : 
          '<button type="button" onclick="nextQuestion()">Next</button>'}
      </div>
    </div>
  `;
  
  form.innerHTML = html;
}

function saveAnswer(value) {
  userAnswers[currentQuestion] = value;
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    displayQuestion();
  }
}

function previousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    displayQuestion();
  }
}

// Make submitAssessment globally accessible
window.submitAssessment = submitAssessment;

// Initialize first question
displayQuestion();

// Add event delegation for dynamically created buttons
form.addEventListener('click', function(e) {
  if (e.target.dataset.action === 'submit') {
    submitAssessment();
  }
});

function submitAssessment() {
  clearInterval(timerInterval);

  let score = 0;
  const detailedResults = [];
  
  questions.forEach((q, i) => {
    const userAnswer = userAnswers[i];
    const isCorrect = userAnswer === q.answer;
    const wasAnswered = userAnswer !== undefined;
    
    if (isCorrect) score++;
    
    detailedResults.push({
      question: q.question,
      options: q.options,
      correctAnswer: q.answer,
      userAnswer: userAnswer,
      isCorrect: isCorrect,
      wasAnswered: wasAnswered
    });
  });

  const percentage = Math.round((score / questions.length) * 100);
  const passFail = percentage >= 80 ? "PASS" : "FAIL";
  const answeredCount = Object.keys(userAnswers).length;
  const completedDate = new Date().toLocaleString();
  
  // Calculate time taken
  const endTime = Date.now();
  const timeTaken = Math.round((endTime - startTime) / 60000); // in minutes

  // Store individual result
  const result = {
    percentage,
    passFail,
    score,
    totalQuestions: questions.length,
    answeredCount,
    detailedResults,
    completed: completedDate,
    timeTaken: timeTaken
  };
  localStorage.setItem("result", JSON.stringify(result));

  // Get attempt number
  const adminData = JSON.parse(localStorage.getItem("adminAssessmentData")) || [];
  const userEmail = localStorage.getItem("email");
  const attemptNumber = adminData.filter(record => record.email === userEmail).length + 1;

  // Store in admin database
  const assessmentRecord = {
    id: Date.now(),
    name: localStorage.getItem("name"),
    email: userEmail,
    employeeId: localStorage.getItem("employee"),
    score: percentage,
    passFail: passFail,
    date: completedDate,
    status: "completed",
    detailedResults: detailedResults,
    timeTaken: timeTaken,
    attemptNumber: attemptNumber
  };
  
  adminData.push(assessmentRecord);
  localStorage.setItem("adminAssessmentData", JSON.stringify(adminData));

  // Persist assessment to Firestore if available
  if (window.FirestoreHelper && window.FirestoreHelper.enabled) {
    window.FirestoreHelper.saveAssessment(assessmentRecord)
      .then(res => {
        console.log('Assessment saved to Firestore', res);
        try {
          const adminDataStored = JSON.parse(localStorage.getItem("adminAssessmentData")) || [];
          const idx = adminDataStored.findIndex(r => r.id === assessmentRecord.id);
          if (idx !== -1) {
            adminDataStored[idx].firestoreId = res.id;
            localStorage.setItem("adminAssessmentData", JSON.stringify(adminDataStored));
          }
        } catch (e) { console.warn('Failed to attach firestore id to local admin data', e); }
      })
      .catch(err => console.warn('Failed to save assessment to Firestore', err));
  }

  // Mark as attempted for this access token (so only this link/email is blocked)
  const token = localStorage.getItem('accessToken') || sessionStorage.getItem('assessmentToken');
  if (token) {
    const attemptedKey = `attempted_${token}`;
    localStorage.setItem(attemptedKey, "yes");
  }
  // Remove global legacy flag if present
  if (localStorage.getItem('attempted') === 'yes') {
    localStorage.removeItem('attempted');
  }

  // Clear the in-progress session marker now that assessment is completed
  try { sessionStorage.removeItem('assessmentInProgress'); } catch (e) { console.warn('Failed to clear assessmentInProgress', e); }

  // Send email to student and wait for send attempt to finish before navigating (prevents send from being cancelled on unload)
  sendResultEmail(assessmentRecord)
    .then((res) => {
      console.log('Result email send completed', res);
      window.location.href = "result.html";
    })
    .catch((err) => {
      console.warn('Result email send failed, proceeding to results page', err);
      // Still navigate to results page even if email failed
      window.location.href = "result.html";
    });
}

function sendResultEmail(data) {
  // Return a Promise so callers can wait for send to complete before navigation
  return new Promise((resolve, reject) => {
    if (!data || !data.email) {
      console.warn('sendResultEmail: no recipient provided', data);
      return resolve({ ok: false, reason: 'no-recipient' });
    }

    const serviceID = 'service_ii2wjoc';
    const templateID = 'template_qte5dcm';
    const publicKey = 'C-YoXDiclz35bdGBX';

    const emailParams = {
      to_email: data.email,
      trainee_email: data.email,
      recipient: data.email,
      trainee_name: data.name,
      trainee: data.name,
      name: data.name,
      final_score: (data.score !== undefined ? data.score + '%' : ''),
      final_score_numeric: data.score,
      score: data.score,
      pass_fail_status: data.passFail,
      status: data.passFail,
      time_taken: (data.timeTaken !== undefined ? data.timeTaken + ' minutes' : ''),
      attempt_number: 'Attempt ' + (data.attemptNumber || 1),
      attempt: data.attemptNumber || 1,
      employee_id: data.employeeId,
      employeeId: data.employeeId,
      completion_date: data.date,
      completionDate: data.date
    };

    function updateLocalStatus(id, payload) {
      try {
        const adminData = JSON.parse(localStorage.getItem('adminAssessmentData')) || [];
        const idx = adminData.findIndex(r => r.id === id);
        if (idx !== -1) {
          Object.assign(adminData[idx], payload);
          localStorage.setItem('adminAssessmentData', JSON.stringify(adminData));

          if (window.FirestoreHelper && window.FirestoreHelper.enabled && adminData[idx].firestoreId) {
            window.FirestoreHelper.updateAssessment(adminData[idx].firestoreId, payload).catch(err => console.warn('Failed to update Firestore assessment status', err));
          }
        }
      } catch (e) {
        console.warn('Failed to update adminAssessmentData with email status', e);
      }
    }

    function doSend() {
      try {
        if (publicKey && typeof emailjs !== 'undefined') {
          try { emailjs.init(publicKey); } catch (e) { console.warn('EmailJS init failed', e); }
        }

        if (typeof emailjs === 'undefined') {
          return reject(new Error('EmailJS not available'));
        }

        emailjs.send(serviceID, templateID, emailParams)
          .then(response => {
            console.log('sendResultEmail: sent', response);
            updateLocalStatus(data.id, { emailSent: true, lastEmailResponse: response });
            resolve(response);
          })
          .catch(error => {
            console.error('sendResultEmail: failed', error);
            updateLocalStatus(data.id, { emailSent: false, lastEmailError: String(error) });
            reject(error);
          });
      } catch (err) {
        console.error('Unexpected error in sendResultEmail', err);
        return reject(err);
      }
    }

    // Dynamically load EmailJS SDK if not present
    if (typeof emailjs === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
      script.onload = function() { console.log('EmailJS SDK loaded dynamically'); doSend(); };
      script.onerror = function(e) { console.error('Failed to load EmailJS SDK', e); reject(e); };
      document.head.appendChild(script);
    } else {
      doSend();
    }
  });
}

// Test helper to send a dummy result email (run from console)
function testSendResult(toEmail) {
  if (!toEmail) { console.warn('Usage: testSendResult("email@example.com")'); return; }
  const dummy = {
    email: toEmail,
    name: 'Test Student',
    score: 90,
    passFail: 'PASS',
    timeTaken: 20,
    attemptNumber: 1,
    employeeId: 'TEST-001',
    date: new Date().toLocaleString()
  };
  sendResultEmail(dummy)
    .then(res => console.log('Test result email sent', res))
    .catch(err => console.error('Test result send failed', err));
}

function reviewAnswers() {
  const unanswered = [];
  questions.forEach((q, i) => {
    if (userAnswers[i] === undefined) {
      unanswered.push({ questionNum: i + 1, question: q.question });
    }
  });

  if (unanswered.length > 0) {
    showUnansweredQuestions(unanswered);
  } else {
    showFinalSubmit();
  }
}

function showUnansweredQuestions(unanswered) {
  let html = `
    <div class="review-container">
      <h2>⚠️ Unanswered Questions</h2>
      <p>You have ${unanswered.length} unanswered questions. Please review and answer them:</p>
      <div class="unanswered-list">
  `;
  
  unanswered.forEach(item => {
    html += `
      <div class="unanswered-item" onclick="goToQuestion(${item.questionNum - 1})">
        <span class="question-num">Q${item.questionNum}</span>
        <span class="question-text">${item.question}</span>
      </div>
    `;
  });
  
  html += `
      </div>
      <div class="review-actions">
        <button type="button" onclick="goToQuestion(0)">Review All Questions</button>
        <button type="button" onclick="showFinalSubmit()">Submit Anyway</button>
      </div>
    </div>
  `;
  
  form.innerHTML = html;
}

function showFinalSubmit() {
  const answeredCount = Object.keys(userAnswers).length;
  let html = `
    <div class="final-submit">
      <h2>Ready to Submit?</h2>
      <div class="submit-summary">
        <p><strong>Questions Answered:</strong> ${answeredCount} of ${questions.length}</p>
        <p><strong>Unanswered:</strong> ${questions.length - answeredCount}</p>
      </div>
      <p>Once you submit, you cannot change your answers.</p>
      <div class="final-actions">
        <button type="button" onclick="goToQuestion(0)">Review Questions</button>
        <button type="button" onclick="submitAssessment()" style="background: linear-gradient(to right, #0a3d62, #1e3799); color: white;">Submit Assessment</button>
      </div>
    </div>
  `;
  
  form.innerHTML = html;
}

function goToQuestion(questionIndex) {
  currentQuestion = questionIndex;
  displayQuestion();
}