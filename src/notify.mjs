import { readFileSync } from 'fs';
import { createTransport } from 'nodemailer';

const summaryFile = process.argv[2];
if (!summaryFile) {
  console.log('No summary file provided. Skipping email.');
  process.exit(0);
}

let summary;
try {
  summary = readFileSync(summaryFile, 'utf-8');
} catch {
  console.log('No summary file found. Skipping email.');
  process.exit(0);
}

const email = process.env.ARBOX_EMAIL;
const appPassword = process.env.ARBOX_EMAIL_APP_PASSWORD;

if (!email || !appPassword) {
  console.log('ARBOX_EMAIL or ARBOX_EMAIL_APP_PASSWORD not set. Skipping email.');
  process.exit(0);
}

const isYahoo = email.includes('yahoo');
const smtpConfig = isYahoo
  ? { host: 'smtp.mail.yahoo.com', port: 465, secure: true }
  : { host: 'smtp.gmail.com', port: 465, secure: true };

const transporter = createTransport({
  ...smtpConfig,
  auth: { user: email, pass: appPassword },
});

try {
  await transporter.sendMail({
    from: `Arbox Auto-Register <${email}>`,
    to: email,
    subject: 'Arbox Auto-Register Summary',
    text: summary,
  });
  console.log(`Email sent to ${email}`);
} catch (err) {
  console.error(`Failed to send email: ${err.message}`);
  process.exit(1);
}
