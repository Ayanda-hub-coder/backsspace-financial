# Email Setup Instructions

## To enable automatic email sending, follow these steps:

### 1. Create EmailJS Account
- Go to https://www.emailjs.com/
- Sign up for a free account
- Verify your email address

### 2. Create Email Service
- In EmailJS dashboard, go to "Email Services"
- Click "Add New Service"
- Choose your email provider (Gmail, Outlook, etc.)
- Follow setup instructions to connect your email

### 3. Create Email Template
- Go to "Email Templates"
- Click "Create New Template"
- Use this template content:

**Subject:** Assessment Results - {{trainee_name}}

**Body:**
```
Dear {{trainee_name}},

Your Backspace Financial B2B Sales Executive Assessment has been completed.

Assessment Details:
- Trainee Name: {{trainee_name}}
- Email: {{trainee_email}}
- Employee ID: {{employee_id}}
- Final Score: {{final_score}}
- Status: {{pass_fail_status}}
- Time Taken: {{time_taken}}
- {{attempt_number}}
- Completion Date: {{completion_date}}

Thank you for completing the assessment.

Best regards,
Backspace Financial Team
```

### 4. Get Your Keys
- Copy your "Service ID" from Email Services
- Copy your "Template ID" from Email Templates  
- Copy your "Public Key" from Account settings

### 5. Update the Code (Invite and Results)
- For invite emails (generated from the Admin dashboard):
  - Set `EMAIL_SERVICE_ID`, `EMAIL_TEMPLATE_INVITE`, and `EMAIL_PUBLIC_KEY` in `admin-dashboard.js`.
  - Ensure the Admin dashboard (`dashboard.html`) includes the EmailJS SDK script (the project now does this).
- For result emails (sent on assessment completion):
  - Update the service/template/public key values in `questions.js` if different from the defaults.
  - The code uses `service_ii2wjoc` by default — invite template `template_mxbq84y` and result template `template_qte5dcm`; replace if your own IDs are different.

### Firestore (optional) — Central database for tokens & assessments
- This project can optionally store tokens and assessments in Firestore so that links work from any device (instead of only on the machine where localStorage was written).
- If you used the Firebase config, the app now initializes Firestore and:
  - Saves generated tokens to `tokens/{token}` when you generate a link.
  - Validates tokens on `index.html` via Firestore so other devices can open links.
  - Marks a token as `used: true` during the start flow (atomically using a transaction).
  - Saves completed assessments to the `assessments` collection.

Security & rules tips:
- Client-side Firestore requires proper security rules — for production, restrict writes to authenticated admin users or perform token creation and email sends from a server/Cloud Function.
- A minimal developer-friendly rule for testing (NOT recommended for production) is to allow reads/writes to the `tokens` and `assessments` collections during development only.

If you want, I can add a short `FIREBASE_SETUP.md` with recommended security rules and example Cloud Functions for server-side token creation and email sending.

### 6. Test
- Invite email test:
  1. Configure your invite template and set `EMAIL_SERVICE_ID`/`EMAIL_TEMPLATE_INVITE` in `admin-dashboard.js`.
     - Make sure your invite template uses one of these variables for the link: `{{assessment_link}}`, `{{invite_link}}`, `{{link}}`, or `{{message_html}}` (I include multiple aliases in the payload to maximize compatibility).
     - Ensure the recipient field in the template is set to `{{to_email}}`.
  2. Go to Admin dashboard → generate a link for a test email you control.
  3. Watch the "Invite Status" message and the browser console for logs: `Sending invite` and `Invite sent` or any errors.

- Result email test:
  1. Complete an assessment using the test link.
  2. Check browser console for `Attempting to send email` and `Email sent successfully!` or errors.
  3. Alternatively, on the assessment page console run `testSendResult('you@example.com')` to quickly test sending.

- If emails fail:
  - Check the EmailJS dashboard logs for delivery errors.
  - Confirm the template uses the correct variable names (see templates sections), and that the recipient field is set to `{{to_email}}`.


## Features Included:
✅ Trainee name
✅ Trainee email  
✅ Final score
✅ Pass/Fail status
✅ Time taken (in minutes)
✅ Attempt number
✅ Sends to correct learner only
✅ Instant delivery on submission