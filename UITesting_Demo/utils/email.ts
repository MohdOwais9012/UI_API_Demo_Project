import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import auth from "../authentication.json";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: auth.gmail,
    pass: auth.gmailPass,  
  },
});

export async function sendEmailWithReport(absoluteReportPath: string) {
  console.log('Sending report from path:', absoluteReportPath); 

  if (!fs.existsSync(absoluteReportPath)) {
    console.error('❌ Report file not found. Email will not be sent.');
    return;
  }

  const stats = fs.statSync(absoluteReportPath);
  console.log('Report file size:', stats.size);
  const mailOptions = {
    from: auth.gmail,
    to: auth.gmailfrom,
    subject: 'Playwright Test Report',
    html: '<p>Please find the attached Playwright Test Report.</p>',
    attachments: [
      {
        filename: 'Playwright_Test_Report.html',
        path: absoluteReportPath,  
        contentType: 'text/html',
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Report sent successfully:', info.messageId);
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
}
