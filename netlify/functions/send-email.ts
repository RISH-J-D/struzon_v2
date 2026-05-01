import { Handler } from "@netlify/functions";
import nodemailer from "nodemailer";

// Full high-resolution logo base64
const ST_LOGO_BASE64 = "iVBORw0KGgoAAAANSUhEUgAAAfQAAAB3CAYAAAD1hbJIAAAQAElEQVR4AexdB2AUxdef2d3rPT2B0KtSBaRjEKQXQYNdERVUBAVBxcbx+VdEEFSsKAIiFiLSpAoSqdKk906A1Esu12/bfG8OQs1dOs3bzGyZefPmzW/Km3mzt2FQ+AgjEEYgjEAYgTACYQRueQTCCv2Wr8JwAcIIhBEIIxBGIIwAQhWr0MMIhxEIIxBGIIwAQhWr0MMIhxEIIxBGIIwAQhWr0MMIhxEIIxBGII3CdEEjo/Y02sucP9S09vu8V0eP7pyO6zxgU2X3G/ZZusxpFJ32hL44YYYVeHJTCNGEEwgiEEQgjEEagIhBInstGdJvV2icqfiSytAoT/CsieCpkNZUg9BPG8p+SRjM3quesjqjZNwoID+rCCj0YNOHwMAJhBMIIhBEII1CRCCRZOYvLNRhh+SeEcFdC0FZMyIsMw/QG3wtjNAQh9BdCuIMsyz9FxCheRslzlSjIEVboQYAJB4cRCCMQRiCMQBiBCkMAVuaR6qqPY4StCCOCMHmZqNFA2/JBs3KWPLWGetvSp2ezXs9zhJDngcCFEB4TSScAMBFAhRxhhV4IKNchKJxFGIEwAmEEwgj8hxGIzHfXJhi9AxBosEzGIaKci724bUS3mc9Edps5PLL79y9FdJuRzGt0sXkG/c8YyWOAVgDF/qpZlXgn3F/jwgr9GkjCAWEEwgiEEQgjEEagAhGAvXDCokchh2oI9sxVCiGFML4qmCHTMCZfwGp9OCju12DlPovFZF6Ey1U313t6AZjkf4M0VcAcP7yw/fSwQgd0bjsXLlAYgTACYQTCCNy0CERFaaNAuAfA+0Bpp5xbPMSDCAtb5khBEDpGZNyXZVEnjPE8RFAjhHAXlIRkeF6EEPIhRFpf4AGPl9xtr9DXWJO4P5M7m/7u0iJx0+O97gKftGlAp84bn+h+z9Yn+zRd071l5X8e626kdJdgCd+FEQgjEEYgjEAYgYpBQGTFWOBMvU0CBQ73lxxGAs/IWToXSiOIpEOEiAmyI+tYcoE2GyEcc4EHuvy47RQ6IQSv6tMpdmWLRp1WtGw0hl+SPUs+cXaZLzf/L+eRY0tdx47Nd59J/8174tR85/Gjy4grf4037dRyZm32rHVdG76+ofdd9+56ok0MITBvuhyp8H0BAuFrGIEwAmEEgiUAQEGEy1CWAVaxq3ExI0uPwhKhIgpTg2aC6vzx2A1PsOPyRIEdngJyQ6EUBaCtOd5oCaO20ahr0lK4la1u7vOimZNXxROpf8meLwLZZfnfdnHP0oEsTWRSC0iirFwbwZvAm+R6bMk1yKS2FoWhEdln3+86HIvdGbn//5Pr0bPb0xuXWuNNYm7ArHwQxiBMAJhBMIIhBEIiwIuw";

const getEmailTemplate = (title: string, sections: { label: string; value: string }[], hasAttachments: boolean) => {
  const sectionHtml = sections
    .map(
      (section) => `
    <tr>
      <td style="padding: 15px 0; border-bottom: 1px solid #f0f0f0;">
        <div style="font-family: 'Helvetica', sans-serif; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: #e31e24; font-weight: 800; margin-bottom: 5px;">${section.label}</div>
        <div style="font-family: 'Helvetica', sans-serif; font-size: 16px; color: #02224b; font-weight: 600; line-height: 1.4;">${section.value}</div>
      </td>
    </tr>
  `
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<body style="margin: 0; padding: 0; background-color: #f1f5f9;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 40px 20px;">
    <tr>
      <td align="center">c
        <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 15px 40px rgba(2, 34, 75, 0.1);">
          <!-- Top Red Border Accent -->
          <tr><td height="6" style="background-color: #e31e24; line-height: 6px; font-size: 6px;">&nbsp;</td></tr>
          
          <!-- Header -->
          <tr>
            <td style="background-color: #02224b; padding: 45px 50px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left">
                    <!-- Official Logo Image -->
                    <div style="margin-bottom: 20px;">
                      <img src="cid:struzon_logo" alt="Struzon Technologies" width="220" style="display: block; outline: none; border: none; text-decoration: none;">
                    </div>
                    
                    <!-- Title below logo section -->
                    <div style="display: inline-block; background-color: rgba(227, 30, 36, 0.15); border-left: 3px solid #e31e24; padding: 8px 15px; margin-top: 5px;">
                      <div style="font-family: 'Helvetica', sans-serif; font-size: 13px; font-weight: 800; color: #ffffff; text-transform: uppercase; letter-spacing: 0.15em;">
                        ${title}
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Content Area -->
          <tr>
            <td style="padding: 50px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                ${sectionHtml}
              </table>
              
              ${hasAttachments ? `
                <div style="margin-top: 40px; padding: 25px; background-color: #f8fafc; border-radius: 6px; border: 1px dashed #e2e8f0; text-align: center;">
                  <span style="font-size: 20px; vertical-align: middle; margin-right: 10px;">📂</span>
                  <span style="font-family: 'Helvetica', sans-serif; font-size: 13px; font-weight: 800; color: #02224b; text-transform: uppercase; letter-spacing: 0.1em;">
                    ATTACHMENT(S) INCLUDED
                  </span>
                </div>
              ` : ''}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 35px 50px; background-color: #f1f5f9; text-align: center;">
              <div style="font-family: 'Helvetica', sans-serif; font-size: 12px; color: #64748b; font-weight: 600; letter-spacing: 0.05em;">
                &copy; ${new Date().getFullYear()} STRUZON TECHNOLOGIES INC. &bull; PRECISION & EXCELLENCE
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const data = JSON.parse(event.body || "{}");
    const { type, attachments, ...details } = data;

    const authenticatedEmail = process.env.EMAIL_FROM || "jk.girish2004@gmail.com";
    const recipientEmail = "jk.girish2004@gmail.com";
    const userEmail = details.email;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: authenticatedEmail,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    let title = "New Enquiry";
    let sections: { label: string; value: string }[] = [];

    if (type === "project") {
      title = "Project Enquiry";
      sections = [
        { label: "Sender Name", value: details.name },
        { label: "Email Address", value: details.email },
        { label: "Company", value: details.company },
        { label: "Phone Number", value: details.phone },
        { label: "Project Details", value: details.project },
      ];
    } else if (type === "career") {
      title = "Job Application";
      sections = [
        { label: "Applied Position", value: details.role },
        { label: "Applicant Name", value: details.name },
        { label: "Email Address", value: details.email },
        { label: "Phone Number", value: details.phone },
        { label: "Experience Type", value: details.experienceType },
      ];
      if (details.experienceType === 'experienced') {
        sections.push({ label: "Years of Experience", value: details.yearsOfExperience || "N/A" });
        sections.push({ label: "Previous Company", value: details.previousCompany || "N/A" });
      }
    }

    const html = getEmailTemplate(title, sections, !!attachments?.length);

    // Prepare mail attachments including the inline logo
    const mailAttachments = [
      {
        filename: 'struzon-logo.png',
        content: ST_LOGO_BASE64,
        encoding: 'base64',
        cid: 'struzon_logo'
      }
    ];

    if (attachments && attachments.length > 0) {
      attachments.forEach((a: any) => {
        mailAttachments.push({
          filename: a.filename,
          content: a.content,
          encoding: 'base64',
          cid: undefined
        } as any);
      });
    }

    await transporter.sendMail({
      from: `"${details.name} (${userEmail})" <${authenticatedEmail}>`,
      to: recipientEmail,
      replyTo: userEmail,
      subject: `${title}: ${details.name} via Struzon Website`,
      html: html,
      attachments: mailAttachments
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email" }),
    };
  }
};

export { handler };
