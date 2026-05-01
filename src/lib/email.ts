import nodemailer from 'nodemailer';

/**
 * Structured email sending utility.
 * Uses environment variables for security:
 * - EMAIL_FROM: The sender's email (e.g., jk.girish2004@gmail.com)
 * - EMAIL_APP_PASSWORD: The Google App Password
 */
export const sendEnquiryEmail = async (data: {
  name: string;
  email: string;
  company: string;
  phone: string;
  project: string;
}) => {
  const fromEmail = process.env.EMAIL_FROM;
  const appPassword = process.env.EMAIL_APP_PASSWORD;

  if (!fromEmail || !appPassword) {
    throw new Error("Email credentials missing in environment variables.");
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: fromEmail,
      pass: appPassword,
    },
  });

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #0c1c3c; padding: 30px; text-align: center;">
        <img src="https://struzon.com/wp-content/uploads/2023/07/struzon-logo.png" alt="Struzon" style="height: 50px; width: auto;">
      </div>
      <div style="padding: 40px; background-color: #ffffff;">
        <h2 style="color: #BA1A1A; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;">
          ${data.company} has requested you for a quote
        </h2>
        <div style="border-left: 4px solid #BA1A1A; padding-left: 20px; margin-bottom: 30px;">
          <p style="font-size: 16px; line-height: 1.6; color: #1e293b;">
            A new project enquiry has been submitted through the website contact form. Below are the details:
          </p>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
          <tr style="background-color: #f8fafc;">
            <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold; width: 30%;">Name</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">Email</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;"><a href="mailto:${data.email}" style="color: #BA1A1A;">${data.email}</a></td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">Company</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">${data.company}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #e2e8f0; font-weight: bold;">Phone</td>
            <td style="padding: 12px; border: 1px solid #e2e8f0;">${data.phone}</td>
          </tr>
        </table>
        <div style="background-color: #f1f5f9; padding: 25px; border-radius: 4px;">
          <h3 style="margin-top: 0; color: #0c1c3c; font-size: 14px; text-transform: uppercase;">Project Description</h3>
          <p style="margin-bottom: 0; white-space: pre-wrap; line-height: 1.6; color: #475569;">${data.project}</p>
        </div>
      </div>
      <div style="background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
        Sent from the Struzon Project Enquiry Form.
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"${data.company}" <${fromEmail}>`, // Authorized sender as display name
    replyTo: data.email, // This ensures srinath replies to the user
    to: 'srinath.v32197@gmail.com',
    subject: 'website quote',
    html: htmlContent,
  };

  return transporter.sendMail(mailOptions);
};
