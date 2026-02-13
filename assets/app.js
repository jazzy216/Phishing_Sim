// ========================================
// PHISHING AWARENESS TRAINING SIMULATOR
// Educational tool for security awareness
// ========================================

// Email Dataset - Training Examples
const emailDatabase = [
    {
        id: 1,
        senderName: "IT Support Team",
        senderEmail: "support@company-internal.com",
        subject: "Monthly Security Update - February 2026",
        timestamp: "2026-02-10 09:15 AM",
        bodyHtml: `
            <p>Hello Team,</p>
            <p>This is your monthly reminder about our security best practices:</p>
            <p>• Always verify sender email addresses before clicking links<br>
            • Report suspicious emails to security@company.com<br>
            • Use strong, unique passwords for all accounts<br>
            • Enable two-factor authentication where available</p>
            <p>Thank you for keeping our organization secure.</p>
            <p>Best regards,<br>IT Security Team</p>
        `,
        labelCorrect: "safe",
        riskLevel: "low",
        indicators: [
            "Professional formatting and tone",
            "Sender domain matches internal company email",
            "No urgent action required",
            "Educational content about security practices",
            "No requests for personal information",
            "No suspicious links or attachments"
        ]
    },
    {
        id: 2,
        senderName: "Amazon Security",
        senderEmail: "verify@amaz0n-security.net",
        subject: "URGENT: Suspicious Activity Detected on Your Account",
        timestamp: "2026-02-12 11:42 PM",
        bodyHtml: `
            <p>Dear Valued Customer,</p>
            <p><strong style="color: red;">IMMEDIATE ACTION REQUIRED!</strong></p>
            <p>We have detected unusual login attempts from an unknown location. Your account will be SUSPENDED in 24 hours unless you verify your identity immediately.</p>
            <p><a href="#" class="training-link">Click here to verify your account now</a></p>
            <p>If you do not complete verification, all pending orders will be cancelled and your account permanently closed.</p>
            <p>Amazon Security Team</p>
        `,
        labelCorrect: "phishing",
        riskLevel: "high",
        indicators: [
            "Suspicious sender domain: 'amaz0n-security.net' with zero instead of 'o'",
            "Creates extreme urgency with threats of account suspension",
            "Generic greeting 'Dear Valued Customer' instead of your name",
            "Demands immediate action without legitimate verification options",
            "Threatens consequences (suspension, cancellation) to pressure action",
            "Legitimate companies don't send verification links via email"
        ]
    },
    {
        id: 3,
        senderName: "HR Department",
        senderEmail: "hr@company-internal.com",
        subject: "Updated Employee Handbook - Please Review",
        timestamp: "2026-02-11 02:30 PM",
        bodyHtml: `
            <p>Hi everyone,</p>
            <p>We've updated our Employee Handbook for 2026. The main changes include:</p>
            <p>• Revised remote work policy<br>
            • Updated vacation accrual rates<br>
            • New professional development opportunities</p>
            <p>Please review the handbook in the employee portal at your convenience. If you have questions, contact HR at extension 4200.</p>
            <p>Thank you,<br>Human Resources</p>
        `,
        labelCorrect: "safe",
        riskLevel: "low",
        indicators: [
            "Legitimate internal sender domain",
            "Professional and informative tone",
            "No pressure or urgency tactics",
            "Directs to official employee portal (not external link)",
            "Provides internal contact method for questions",
            "Expected communication from HR department"
        ]
    },
    {
        id: 4,
        senderName: "PayPal Support",
        senderEmail: "noreply@paypa1-secure.com",
        subject: "You've received a payment of $487.00",
        timestamp: "2026-02-13 06:15 AM",
        bodyHtml: `
            <p>Hello,</p>
            <p>Good news! You have received a payment.</p>
            <p><strong>Amount:</strong> $487.00 USD<br>
            <strong>From:</strong> customer_8472@email.com<br>
            <strong>Note:</strong> Payment for services</p>
            <p>However, there is a problem processing this transaction. Please <a href="#" class="training-link">login to your account</a> to resolve the issue and claim your funds.</p>
            <p>This payment will expire in 48 hours if not claimed.</p>
            <p>PayPal Customer Service</p>
        `,
        labelCorrect: "phishing",
        riskLevel: "high",
        indicators: [
            "Fraudulent domain: 'paypa1-secure.com' uses number '1' instead of letter 'l'",
            "Lures with unexpected payment notification",
            "Creates artificial urgency with 48-hour expiration",
            "Requests login through email link (never do this)",
            "Vague 'problem' that needs to be 'resolved'",
            "Legitimate payment services notify within the app, not via email links"
        ]
    },
    {
        id: 5,
        senderName: "Package Delivery Service",
        senderEmail: "delivery@globalshipping.com",
        subject: "Delivery Attempted - Action Required",
        timestamp: "2026-02-09 03:45 PM",
        bodyHtml: `
            <p>Dear Customer,</p>
            <p>We attempted to deliver your package today but no one was available to receive it.</p>
            <p><strong>Tracking Number:</strong> GS847291037<br>
            <strong>Delivery Address:</strong> [Your Address]</p>
            <p>Please <a href="#" class="training-link">download and print this form</a> (PDF, 2.4 MB) and leave it on your door for our next delivery attempt tomorrow between 2-5 PM.</p>
            <p>Or schedule a redelivery time through our website.</p>
            <p>Thank you,<br>Global Shipping Services</p>
        `,
        labelCorrect: "phishing",
        riskLevel: "medium",
        indicators: [
            "Unexpected delivery notification when you haven't ordered anything",
            "Requests downloading and printing a file (potential malware)",
            "Generic 'Dear Customer' greeting",
            "No specific details about what package or sender",
            "Suspicious attachment/download request",
            "Legitimate services provide tracking through their official website/app"
        ]
    },
    {
        id: 6,
        senderName: "David Chen",
        senderEmail: "dchen@company-internal.com",
        subject: "Quick question about Q1 budget meeting",
        timestamp: "2026-02-12 10:20 AM",
        bodyHtml: `
            <p>Hey,</p>
            <p>Hope you're doing well! Quick question about next week's Q1 budget review meeting.</p>
            <p>Can you send me the updated projections for the marketing department? I want to make sure I have all the latest numbers before the presentation.</p>
            <p>Also, are you still available for our 2pm sync on Thursday?</p>
            <p>Thanks!<br>David</p>
        `,
        labelCorrect: "safe",
        riskLevel: "low",
        indicators: [
            "Known colleague from legitimate internal domain",
            "Natural, conversational tone appropriate for coworker",
            "Specific reference to scheduled meetings and projects",
            "Reasonable work-related request",
            "No urgency, threats, or unusual requests",
            "Context matches normal business operations"
        ]
    },
    {
        id: 7,
        senderName: "Microsoft Account Team",
        senderEmail: "account-security@microsoft-verify.support",
        subject: "Your Microsoft account will be closed",
        timestamp: "2026-02-13 01:17 AM",
        bodyHtml: `
            <p>Dear Microsoft User,</p>
            <p>We have detected that your Microsoft account has not been verified in accordance with our new 2026 security protocols.</p>
            <p><strong>Account Status:</strong> Pending Closure<br>
            <strong>Deadline:</strong> February 14, 2026 11:59 PM</p>
            <p>To prevent permanent account deletion and loss of all data, you must verify your account information immediately:</p>
            <p><a href="#" class="training-link">VERIFY ACCOUNT NOW</a></p>
            <p>Failure to comply will result in permanent account termination and data loss.</p>
            <p>Microsoft Security Team<br>
            © 2026 Microsoft Corporation</p>
        `,
        labelCorrect: "phishing",
        riskLevel: "high",
        indicators: [
            "Fake domain: 'microsoft-verify.support' is not microsoft.com",
            "Extreme urgency with account closure threat",
            "Vague 'new security protocols' without specifics",
            "Deadline pressure to force hasty action",
            "Threats of data loss to create panic",
            "Microsoft never asks for verification through email links"
        ]
    },
    {
        id: 8,
        senderName: "IT Facilities",
        senderEmail: "facilities@company-internal.com",
        subject: "Office Wi-Fi Maintenance - February 15th",
        timestamp: "2026-02-10 08:00 AM",
        bodyHtml: `
            <p>Good morning everyone,</p>
            <p>Our IT team will be performing scheduled maintenance on the office Wi-Fi network this Thursday, February 15th, from 1:00 AM to 3:00 AM.</p>
            <p>During this time, wireless connectivity may be intermittent or unavailable in all buildings. Wired ethernet connections will not be affected.</p>
            <p>We apologize for any inconvenience and appreciate your patience.</p>
            <p>If you experience connectivity issues after 3:00 AM, please contact the IT helpdesk at ext. 5500.</p>
            <p>Best regards,<br>IT Facilities Team</p>
        `,
        labelCorrect: "safe",
        riskLevel: "low",
        indicators: [
            "Legitimate internal sender from facilities department",
            "Standard maintenance notification with clear timeframe",
            "Professional communication tone",
            "Provides specific details and contact information",
            "No action required from recipients",
            "Expected type of communication from IT department"
        ]
    },
    {
        id: 9,
        senderName: "IRS Tax Services",
        senderEmail: "refund@irs-treasury.us",
        subject: "Tax Refund Approval Notice - $1,847.00",
        timestamp: "2026-02-11 07:33 PM",
        bodyHtml: `
            <p>INTERNAL REVENUE SERVICE<br>
            Department of the Treasury</p>
            <p>Dear Taxpayer,</p>
            <p>Your federal tax return has been processed and approved. You are eligible for a refund of <strong>$1,847.00</strong>.</p>
            <p>To receive your refund via direct deposit, please verify your banking information:</p>
            <p><a href="#" class="training-link">Click here to submit your bank details</a></p>
            <p>Processing will take 3-5 business days after verification. This offer expires in 7 days.</p>
            <p>Reference Number: IRS-2026-TF-847291<br>
            Internal Revenue Service</p>
        `,
        labelCorrect: "phishing",
        riskLevel: "high",
        indicators: [
            "Fraudulent domain: IRS uses 'irs.gov', not 'irs-treasury.us'",
            "IRS never requests banking information via email",
            "Creates urgency with 7-day expiration",
            "Lures with unexpected refund to lower guard",
            "Requests sensitive financial information through email link",
            "Official IRS communications come via postal mail for refunds"
        ]
    },
    {
        id: 10,
        senderName: "LinkedIn",
        senderEmail: "notifications@linkedin.com",
        subject: "You appeared in 12 searches this week",
        timestamp: "2026-02-08 06:00 PM",
        bodyHtml: `
            <p>Hi there,</p>
            <p>Your LinkedIn profile has been gaining attention! Here's your weekly update:</p>
            <p><strong>Profile views:</strong> 18<br>
            <strong>Search appearances:</strong> 12<br>
            <strong>New connections:</strong> 3</p>
            <p>People are finding you for: Product Management, Agile Development, Team Leadership</p>
            <p>Keep your profile updated to attract more opportunities. Log in to see who's viewed your profile.</p>
            <p>Best,<br>The LinkedIn Team</p>
        `,
        labelCorrect: "safe",
        riskLevel: "low",
        indicators: [
            "Legitimate LinkedIn domain (@linkedin.com)",
            "Standard weekly notification format",
            "No requests for action or personal information",
            "Informal but professional tone consistent with LinkedIn",
            "Encourages using the platform, not clicking external links",
            "Type of automated notification LinkedIn regularly sends"
        ]
    },
    {
        id: 11,
        senderName: "CEO Office",
        senderEmail: "ceo.assistant@comp4ny-exec.com",
        subject: "URGENT: Need Gift Cards for Client Meeting",
        timestamp: "2026-02-13 04:52 PM",
        bodyHtml: `
            <p>Hi,</p>
            <p>I'm currently in back-to-back meetings and need your help urgently.</p>
            <p>Can you purchase 10 x $100 Amazon gift cards for a client appreciation event tomorrow morning? We need to send them electronically tonight.</p>
            <p>Please buy them and email me the codes ASAP. I'll reimburse you immediately. This is time-sensitive for a major client.</p>
            <p>Thanks for your quick action on this!</p>
            <p>Sarah Mitchell<br>Executive Assistant to CEO</p>
        `,
        labelCorrect: "phishing",
        riskLevel: "high",
        indicators: [
            "Fake domain: 'comp4ny-exec.com' with number '4' instead of 'a'",
            "Classic gift card scam targeting employees",
            "Creates extreme urgency to prevent verification",
            "Unusual request: legitimate companies use purchase orders",
            "Requests personal financial action for company business",
            "Real executives don't request gift card purchases via random emails"
        ]
    },
    {
        id: 12,
        senderName: "Community Charity Foundation",
        senderEmail: "info@communityhelps.org",
        subject: "Thank you for your volunteer interest",
        timestamp: "2026-02-07 11:15 AM",
        bodyHtml: `
            <p>Dear Volunteer,</p>
            <p>Thank you for expressing interest in volunteering with Community Charity Foundation at last week's local community fair.</p>
            <p>We have several upcoming opportunities:</p>
            <p>• Food bank assistance - Saturdays 9am-12pm<br>
            • Youth mentoring program - Weekday evenings<br>
            • Community cleanup events - Monthly</p>
            <p>If you'd like to get involved, please visit our website at www.communityhelps.org to complete a volunteer application, or call us at (555) 123-4567.</p>
            <p>We look forward to working with you!</p>
            <p>Warm regards,<br>Volunteer Coordination Team</p>
        `,
        labelCorrect: "safe",
        riskLevel: "low",
        indicators: [
            "Follows up on an in-person interaction at community fair",
            "Provides multiple legitimate contact methods",
            "Professional and friendly tone appropriate for nonprofit",
            "No pressure to act immediately",
            "Directs to official website rather than email links",
            "Reasonable request consistent with volunteering interest"
        ]
    }
];

// Application State
const appState = {
    currentEmailId: null,
    answeredEmails: new Map(), // id -> {answer: 'phishing'|'safe', correct: boolean}
    score: 0,
    streak: 0,
    currentTab: 'inbox'
};

// DOM Elements
let elements = {};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeElements();
    renderEmailList();
    attachEventListeners();
    updateStats();
});

// Cache DOM elements
function initializeElements() {
    elements = {
        emailListContainer: document.getElementById('emailListContainer'),
        emailContent: document.getElementById('emailContent'),
        feedbackModal: document.getElementById('feedbackModal'),
        confirmModal: document.getElementById('confirmModal'),
        modalTitle: document.getElementById('modal-title'),
        modalBody: document.getElementById('modalBody'),
        modalNextBtn: document.getElementById('modalNextBtn'),
        modalClose: document.querySelector('.modal-close'),
        confirmCancelBtn: document.getElementById('confirmCancelBtn'),
        confirmReportBtn: document.getElementById('confirmReportBtn'),
        score: document.getElementById('score'),
        total: document.getElementById('total'),
        streak: document.getElementById('streak'),
        accuracy: document.getElementById('accuracy'),
        resetBtn: document.getElementById('resetBtn'),
        tabs: document.querySelectorAll('.tab'),
        panels: document.querySelectorAll('.panel'),
        resultsContainer: document.getElementById('resultsContainer')
    };
}

// Render email list
function renderEmailList() {
    elements.emailListContainer.innerHTML = '';
    
    emailDatabase.forEach(email => {
        const li = document.createElement('li');
        li.className = 'email-item';
        li.setAttribute('role', 'button');
        li.setAttribute('tabindex', '0');
        li.setAttribute('aria-label', `Email from ${email.senderName}: ${email.subject}`);
        li.dataset.emailId = email.id;
        
        const answered = appState.answeredEmails.get(email.id);
        if (answered) {
            li.classList.add('answered');
            li.classList.add(answered.correct ? 'correct' : 'incorrect');
        }
        
        if (appState.currentEmailId === email.id) {
            li.classList.add('selected');
            li.setAttribute('aria-selected', 'true');
        }
        
        li.innerHTML = `
            <div class="email-item-header">
                <span class="email-sender">${email.senderName}</span>
                <span class="email-time">${email.timestamp}</span>
            </div>
            <div class="email-subject">${email.subject}</div>
            <div class="email-preview">${email.senderEmail}</div>
            ${answered ? `<span class="email-status ${answered.correct ? 'correct' : 'incorrect'}">
                ${answered.correct ? '✓ Correct' : '✗ Incorrect'}
            </span>` : ''}
        `;
        
        li.addEventListener('click', () => selectEmail(email.id));
        li.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectEmail(email.id);
            }
        });
        
        elements.emailListContainer.appendChild(li);
    });
}

// Select and display email
function selectEmail(emailId) {
    appState.currentEmailId = emailId;
    const email = emailDatabase.find(e => e.id === emailId);
    
    if (!email) return;
    
    // Update list selection
    document.querySelectorAll('.email-item').forEach(item => {
        item.classList.remove('selected');
        item.setAttribute('aria-selected', 'false');
    });
    const selectedItem = document.querySelector(`[data-email-id="${emailId}"]`);
    if (selectedItem) {
        selectedItem.classList.add('selected');
        selectedItem.setAttribute('aria-selected', 'true');
    }
    
    // Check if already answered
    const answered = appState.answeredEmails.get(emailId);
    const isDisabled = answered ? 'disabled' : '';
    
    // Render email content
    elements.emailContent.innerHTML = `
        <div class="email-header">
            <div class="email-meta">
                <strong>From:</strong> ${email.senderName} &lt;${email.senderEmail}&gt;
            </div>
            <div class="email-meta">
                <strong>To:</strong> you@company-internal.com
            </div>
            <div class="email-meta">
                <strong>Date:</strong> ${email.timestamp}
            </div>
            <h2 class="email-subject-large">${email.subject}</h2>
            <span class="risk-badge ${email.riskLevel}">${email.riskLevel} risk</span>
        </div>
        <div class="email-body">
            ${email.bodyHtml}
        </div>
        <div class="email-actions">
            <button class="btn btn-danger" id="reportPhishingBtn" ${isDisabled} aria-label="Report this email as phishing">
                🚨 Report as Phishing
            </button>
            <button class="btn btn-success" id="markSafeBtn" ${isDisabled} aria-label="Mark this email as safe">
                ✓ Mark Safe
            </button>
        </div>
    `;
    
    // Attach action buttons
    if (!answered) {
        document.getElementById('reportPhishingBtn').addEventListener('click', () => showConfirmModal(emailId));
        document.getElementById('markSafeBtn').addEventListener('click', () => submitAnswer(emailId, 'safe'));
    }
}

// Show confirmation modal for reporting
function showConfirmModal(emailId) {
    elements.confirmModal.removeAttribute('hidden');
    elements.confirmModal.setAttribute('aria-hidden', 'false');
    
    elements.confirmReportBtn.onclick = () => {
        hideConfirmModal();
        submitAnswer(emailId, 'phishing');
    };
}

function hideConfirmModal() {
    elements.confirmModal.setAttribute('hidden', '');
    elements.confirmModal.setAttribute('aria-hidden', 'true');
}

// Submit answer and show feedback
function submitAnswer(emailId, userAnswer) {
    const email = emailDatabase.find(e => e.id === emailId);
    const isCorrect = userAnswer === email.labelCorrect;
    
    // Update state
    appState.answeredEmails.set(emailId, {
        answer: userAnswer,
        correct: isCorrect
    });
    
    if (isCorrect) {
        appState.score++;
        appState.streak++;
    } else {
        appState.streak = 0;
    }
    
    // Show feedback
    showFeedback(email, userAnswer, isCorrect);
    
    // Update UI
    updateStats();
    renderEmailList();
}

// Show feedback modal
function showFeedback(email, userAnswer, isCorrect) {
    const resultIcon = isCorrect ? '✅' : '❌';
    const resultText = isCorrect ? 'Correct!' : 'Incorrect';
    const resultClass = isCorrect ? 'success' : 'danger';
    
    elements.modalTitle.textContent = resultText;
    elements.modalTitle.style.color = isCorrect ? 'var(--success)' : 'var(--danger)';
    
    elements.modalBody.innerHTML = `
        <div class="feedback-result">
            <div class="feedback-icon">${resultIcon}</div>
            <h4>This email was ${email.labelCorrect === 'phishing' ? 'PHISHING' : 'SAFE'}</h4>
            <p>You answered: <strong>${userAnswer === 'phishing' ? 'Report as Phishing' : 'Mark Safe'}</strong></p>
        </div>
        <div class="feedback-explanation">
            <h5>🔍 Key Indicators:</h5>
            <ul class="indicators-list">
                ${email.indicators.map(indicator => `<li>${indicator}</li>`).join('')}
            </ul>
        </div>
    `;
    
    elements.feedbackModal.removeAttribute('hidden');
    elements.feedbackModal.setAttribute('aria-hidden', 'false');
}

// Hide feedback modal
function hideFeedbackModal() {
    elements.feedbackModal.setAttribute('hidden', '');
    elements.feedbackModal.setAttribute('aria-hidden', 'true');
    
    // Move to next unanswered email
    const nextEmail = emailDatabase.find(e => !appState.answeredEmails.has(e.id));
    if (nextEmail) {
        selectEmail(nextEmail.id);
    } else {
        // All emails answered - show results
        switchTab('results');
    }
}

// Update statistics
function updateStats() {
    const total = appState.answeredEmails.size;
    const accuracy = total > 0 ? Math.round((appState.score / total) * 100) : 0;
    
    elements.score.textContent = appState.score;
    elements.total.textContent = emailDatabase.length;
    elements.streak.textContent = appState.streak;
    elements.accuracy.textContent = accuracy + '%';
}

// Switch tabs
function switchTab(tabName) {
    appState.currentTab = tabName;
    
    // Update tab buttons
    elements.tabs.forEach(tab => {
        const isActive = tab.dataset.tab === tabName;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', isActive);
    });
    
    // Update panels
    elements.panels.forEach(panel => {
        const isActive = panel.id === `${tabName}-panel`;
        panel.classList.toggle('active', isActive);
        panel.toggleAttribute('hidden', !isActive);
    });
    
    // Render results if switching to results tab
    if (tabName === 'results') {
        renderResults();
    }
}

// Render results panel
function renderResults() {
    const total = appState.answeredEmails.size;
    const accuracy = total > 0 ? Math.round((appState.score / total) * 100) : 0;
    const completed = total === emailDatabase.length;
    
    let html = '';
    
    if (completed) {
        html += `
            <div class="completion-message">
                <h3>🎉 Training Complete!</h3>
                <p>You've reviewed all ${emailDatabase.length} emails</p>
            </div>
        `;
    }
    
    html += `
        <div class="results-summary">
            <div class="result-card">
                <h3>Score</h3>
                <div class="big-number">${appState.score}/${emailDatabase.length}</div>
            </div>
            <div class="result-card">
                <h3>Accuracy</h3>
                <div class="big-number">${accuracy}%</div>
            </div>
            <div class="result-card">
                <h3>Best Streak</h3>
                <div class="big-number">${appState.streak}</div>
            </div>
        </div>
    `;
    
    if (total > 0) {
        html += `
            <div class="results-detail">
                <h3>Detailed Results</h3>
        `;
        
        emailDatabase.forEach(email => {
            const answered = appState.answeredEmails.get(email.id);
            if (answered) {
                const statusClass = answered.correct ? 'correct' : 'incorrect';
                const statusText = answered.correct ? 'Correct' : 'Incorrect';
                const badge = `<span class="result-badge ${statusClass}">${statusText}</span>`;
                
                html += `
                    <div class="result-item ${statusClass}">
                        <div class="result-item-header">
                            <strong>${email.subject}</strong>
                            ${badge}
                        </div>
                        <div style="font-size: 0.875rem; color: var(--gray-600);">
                            Actually: <strong>${email.labelCorrect}</strong> | 
                            You answered: <strong>${answered.answer}</strong>
                        </div>
                    </div>
                `;
            }
        });
        
        html += `</div>`;
    }
    
    elements.resultsContainer.innerHTML = html;
}

// Reset training
function resetTraining() {
    if (appState.answeredEmails.size > 0) {
        if (!confirm('Are you sure you want to reset your progress?')) {
            return;
        }
    }
    
    appState.currentEmailId = null;
    appState.answeredEmails.clear();
    appState.score = 0;
    appState.streak = 0;
    
    updateStats();
    renderEmailList();
    
    // Show first email
    if (emailDatabase.length > 0) {
        selectEmail(emailDatabase[0].id);
    }
    
    switchTab('inbox');
}

// Attach event listeners
function attachEventListeners() {
    // Tab navigation
    elements.tabs.forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });
    
    // Modal controls
    elements.modalClose.addEventListener('click', hideFeedbackModal);
    elements.modalNextBtn.addEventListener('click', hideFeedbackModal);
    elements.confirmCancelBtn.addEventListener('click', hideConfirmModal);
    
    // Click outside modal to close
    elements.feedbackModal.addEventListener('click', (e) => {
        if (e.target === elements.feedbackModal) {
            hideFeedbackModal();
        }
    });
    
    elements.confirmModal.addEventListener('click', (e) => {
        if (e.target === elements.confirmModal) {
            hideConfirmModal();
        }
    });
    
    // Reset button
    elements.resetBtn.addEventListener('click', resetTraining);
    
    // Keyboard navigation for email list
    elements.emailListContainer.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            navigateEmailList(e.key === 'ArrowDown' ? 1 : -1);
        }
    });
    
    // Escape key to close modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (!elements.feedbackModal.hasAttribute('hidden')) {
                hideFeedbackModal();
            }
            if (!elements.confirmModal.hasAttribute('hidden')) {
                hideConfirmModal();
            }
        }
    });
}

// Navigate email list with keyboard
function navigateEmailList(direction) {
    const currentIndex = emailDatabase.findIndex(e => e.id === appState.currentEmailId);
    let newIndex = currentIndex + direction;
    
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= emailDatabase.length) newIndex = emailDatabase.length - 1;
    
    if (newIndex !== currentIndex) {
        selectEmail(emailDatabase[newIndex].id);
        document.querySelector(`[data-email-id="${emailDatabase[newIndex].id}"]`)?.focus();
    }
}

// Auto-select first email on load
window.addEventListener('load', () => {
    if (emailDatabase.length > 0 && !appState.currentEmailId) {
        selectEmail(emailDatabase[0].id);
    }
});
