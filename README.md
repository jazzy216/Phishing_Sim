# 🛡️ Phishing Awareness Training Simulator

**⚠️ IMPORTANT DISCLAIMER:**  
This is a **security-awareness training simulator** designed exclusively for educational purposes. It is **NOT** a phishing kit and must **NEVER** be used to conduct real phishing attacks, collect credentials, or target individuals or organizations.

## Purpose

This static web application helps users develop skills to identify phishing emails through interactive training. Users review fictional emails and practice making safe vs. phishing determinations with immediate educational feedback.

## Features

- ✅ **12 Realistic Training Scenarios** - Mix of phishing and legitimate emails
- ✅ **Immediate Feedback** - Learn why each email is safe or suspicious
- ✅ **Progress Tracking** - Score, streak, and accuracy metrics
- ✅ **Educational Content** - Learn section with phishing red flags
- ✅ **Accessibility** - Keyboard navigation and ARIA labels
- ✅ **Responsive Design** - Works on desktop and mobile
- ✅ **No Dependencies** - Pure HTML/CSS/JavaScript

## Safety Features

This simulator includes multiple safety constraints:

- ❌ No credential collection or login forms
- ❌ No real brand cloning
- ❌ No external tracking or analytics
- ❌ No email sending capabilities
- ❌ All content is clearly fictional
- ✅ Prominent safety warning banner
- ✅ Training-only confirmation modals

## Installation & Usage

### Run Locally

1. **Clone or download this repository**
```bash
   git clone https://github.com/yourusername/phishing-awareness-trainer.git
   cd phishing-awareness-trainer
```

2. **Open in browser**
```bash
   # Simply open the index.html file in any modern web browser
   open index.html
   # or
   firefox index.html
   # or
   chrome index.html
```

   No build process or server required!

### Deploy on GitHub Pages

1. **Create a new repository** on GitHub

2. **Push your code**
```bash
   git init
   git add .
   git commit -m "Initial commit: Phishing awareness trainer"
   git branch -M main
   git remote add origin https://github.com/yourusername/phishing-awareness-trainer.git
   git push -u origin main
```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **main** branch
   - Click **Save**
   - Your site will be live at: `https://yourusername.github.io/phishing-awareness-trainer/`

## File Structure
```
phishing-awareness-trainer/
├── index.html          # Main application page
├── assets/
│   ├── styles.css      # All styles and responsive design
│   └── app.js          # Application logic and email database
└── README.md           # This file
```

## Usage Instructions

1. **Inbox Tab**: Review emails one by one
   - Click an email to view its full content
   - Decide if it's phishing or safe
   - Get immediate feedback with educational indicators

2. **Learn Tab**: Study common phishing red flags
   - Review warning signs
   - Understand when to report
   - Learn best practices

3. **Results Tab**: Track your progress
   - View overall score and accuracy
   - Review detailed results for each email
   - See which emails you got correct/incorrect

## Educational Content

Each email includes:
- **Risk Level**: Low, Medium, or High
- **Indicators**: 3-6 specific red flags or legitimacy markers
- **Feedback**: Immediate explanation of why the email is phishing/safe

## Customization

To add your own training emails, edit the `emailDatabase` array in `assets/app.js`:
```javascript
{
    id: 13,
    senderName: "Sender Name",
    senderEmail: "email@domain.com",
    subject: "Email Subject",
    timestamp: "2026-02-13 10:00 AM",
    bodyHtml: `<p>Email content...</p>`,
    labelCorrect: "phishing", // or "safe"
    riskLevel: "medium", // low, medium, high
    indicators: [
        "Reason 1",
        "Reason 2",
        // ... 3-6 indicators
    ]
}
```

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Full keyboard navigation
- ARIA labels and roles
- High contrast design
- Screen reader compatible

## License

This educational tool is provided as-is for security awareness training purposes only.

**Legal Notice**: Misuse of this tool for actual phishing attacks is illegal and unethical. Use responsibly and only for legitimate security training within your organization.

## Contributing

To contribute additional training scenarios or improvements:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request with your educational enhancements

---

**Remember**: This is a training tool. Always use responsibly and ethically. Help build a more security-aware community! 🛡️
