# Firebase Setup & Security (Quick Guide)

This project supports optional Firestore persistence for tokens and assessments.

1) Add Firebase config
- The project includes `firebase-init.js` with your Firebase web config embedded. Replace the config values or let me paste them for you (already added if you provided it).

2) Enable Firestore
- In the Firebase Console, enable Cloud Firestore and create a project for the app.

3) Security rules (recommended)
- For development only (NOT for production):

  service cloud.firestore {
    match /databases/{database}/documents {
      match /{document=**} {
        allow read, write: if request.auth != null;
      }
    }
  }

- For production: restrict writes to only authenticated admin users or use server-side logic (Cloud Functions) to create tokens and send emails.

4) Recommended server-side Flow (production)
- Create Cloud Functions or an admin API that:
  - Creates `tokens/{token}` documents (so the server controls issuance).
  - Marks tokens used server-side using secure logic.
  - Sends invitation emails using EmailJS or a server-side mail provider (recommended for reliability and security).

5) Useful notes
- The client-side implementation in this repo is meant for small teams and quick testing. If you want, I can help implement secure Cloud Functions and hardened rules.

6) Troubleshooting
- If a token doesn't validate on another device, check Firestore documents under `tokens/` and ensure the token document exists and `used` is false.
- Use browser console helpers: `window.FirestoreHelper.getTokenDoc('TOKEN')` or admin console helper `testFirestoreToken('TOKEN')` from the dashboard.
