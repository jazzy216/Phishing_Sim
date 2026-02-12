// All content is fictional for training. No real brands or real domains.
window.TRAINING_EMAILS = [
  {
    id: "e1",
    fromName: "IT Helpdesk",
    fromEmail: "helpdesk@intranet.local",
    to: "you@training.local",
    date: "2026-02-12 09:14",
    subject: "Password policy reminder (no action required)",
    preview: "Friendly reminder about passphrases and MFA.",
    bodyHtml: `
      <p>Hi team,</p>
      <p>Reminder: use long passphrases (14+ chars) and keep MFA enabled. No action is required today.</p>
      <p>Recommended: password manager + MFA on email accounts.</p>
      <p>— IT Helpdesk</p>
    `,
    signals: [
      "No urgency, no threat, no link to 'verify' anything",
      "Internal address uses .local in training context",
      "Asks for best practices, not credentials"
    ],
    groundTruth: "safe" // safe | phish
  },
  {
    id: "e2",
    fromName: "Payroll Team",
    fromEmail: "payroll-update@secure-payments.training",
    to: "you@training.local",
    date: "2026-02-12 10:02",
    subject: "Action Required: Update direct deposit within 2 hours",
    preview: "We detected an issue with your account. Confirm now to avoid delay.",
    bodyHtml: `
      <p>Hello,</p>
      <p>We detected an issue with your direct deposit profile. You must confirm your details within <strong>2 hours</strong>
      to avoid a payment delay.</p>
      <p><span class="fake-link">Confirm Direct Deposit</span></p>
      <p>If you did not request this change, please confirm anyway to keep payments active.</p>
      <p>Regards,<br/>Payroll</p>
    `,
    signals: [
      "Creates urgency with a short deadline",
      "Asks you to 'confirm' sensitive info via a link",
      "Odd domain and sender mismatch (not your known payroll system)"
    ],
    groundTruth: "phish"
  },
  {
    id: "e3",
    fromName: "Shipping Notification",
    fromEmail: "notify@parcel-status.training",
    to: "you@training.local",
    date: "2026-02-11 16:47",
    subject: "Delivery attempt failed: address needed",
    preview: "Your package is on hold. Small fee required for re-delivery.",
    bodyHtml: `
      <p>We attempted delivery but the address is incomplete.</p>
      <p>To re-schedule delivery, pay the re-delivery fee: <strong>$1.99</strong></p>
      <p><span class="fake-link">Pay &amp; Re-schedule</span></p>
      <p>Tracking: <span class="code">TRN-1182-AX</span></p>
    `,
    signals: [
      "Unexpected package + small fee pattern",
      "Payment request via link",
      "Generic language (no name, no order details)"
    ],
    groundTruth: "phish"
  },
  {
    id: "e4",
    fromName: "Conference Team",
    fromEmail: "events@community-meetup.training",
    to: "you@training.local",
    date: "2026-02-10 08:20",
    subject: "Agenda for Thursday's security meetup",
    preview: "Agenda attached below. No sign-in required.",
    bodyHtml: `
      <p>Agenda:</p>
      <ul>
        <li>09:00 — Welcome</li>
        <li>09:15 — Phishing trends</li>
        <li>10:00 — Break</li>
        <li>10:15 — Detection walkthrough</li>
      </ul>
      <p>No sign-in links. Just show up.</p>
    `,
    signals: [
      "Contains straightforward event info",
      "No link to credential capture",
      "No urgency/threat"
    ],
    groundTruth: "safe"
  },
  {
    id: "e5",
    fromName: "Account Security",
    fromEmail: "security-alert@support.training",
    to: "you@training.local",
    date: "2026-02-09 21:05",
    subject: "Unusual login detected — verify now",
    preview: "We blocked a login. Verify to restore access immediately.",
    bodyHtml: `
      <p>We blocked an unusual login attempt.</p>
      <p>Verify your account to restore access immediately:</p>
      <p><span class="fake-link">Verify Account</span></p>
      <p>Failure to verify will result in permanent lockout.</p>
    `,
    signals: [
      "Threat of lockout + urgency",
      "Generic 'Verify Account' CTA",
      "No details like device/location/IP in the message"
    ],
    groundTruth: "phish"
  }
];
