import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import path from 'path'
import nodemailer from 'nodemailer'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: '/',
    plugins: [
      TanStackRouterVite({
        autoCodeSplitting: true,
      }),
      react(),
      tailwindcss(),
      tsconfigPaths(),
      {
        name: 'netlify-functions-dev',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/.netlify/functions/send-email' && req.method === 'POST') {
              let body = ''
              req.on('data', chunk => {
                body += chunk.toString()
              })
              req.on('end', async () => {
                try {
                  const data = JSON.parse(body)
                  const { type, attachments, ...details } = data

                  const authenticatedEmail = env.EMAIL_FROM || 'jk.girish2004@gmail.com'
                  const recipientEmail = 'jk.girish2004@gmail.com'
                  const userEmail = details.email

                  const appPassword = env.EMAIL_APP_PASSWORD?.trim()

                  if (!appPassword || appPassword === 'your_google_app_password_here') {
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify({ success: true, mock: true }))
                    return
                  }

                  const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: authenticatedEmail,
                      pass: appPassword,
                    },
                  })

                  let title = 'New Enquiry'
                  let sections: any[] = []

                  if (type === 'project') {
                    title = 'Project Enquiry'
                    sections = [
                      { label: 'Sender Name', value: details.name },
                      { label: 'Email Address', value: details.email },
                      { label: 'Company', value: details.company },
                      { label: 'Phone Number', value: details.phone },
                    ]
                    if (details.drive_link) {
                      sections.push({ 
                        label: 'Google Drive Link', 
                        value: `<a href="${details.drive_link}" style="color: #e31e24; text-decoration: underline;">${details.drive_link}</a>` 
                      })
                    }
                    sections.push({ label: 'Project Details', value: details.project })
                  } else if (type === 'career') {
                    title = 'Job Application'
                    sections = [
                      { label: 'Applied Position', value: details.role },
                      { label: 'Applicant Name', value: details.name },
                      { label: 'Email Address', value: details.email },
                      { label: 'Phone Number', value: details.phone },
                      { label: 'Experience Type', value: details.experienceType },
                    ]
                    if (details.experienceType === 'experienced') {
                      sections.push({ label: 'Years of Experience', value: details.yearsOfExperience || 'N/A' })
                      sections.push({ label: 'Previous Company', value: details.previousCompany || 'N/A' })
                    }
                  }

                const fs = await import('fs');
              const path = await import('path');
              const logoPath = path.resolve(__dirname, 'public/assets/struzon-logo.png');
              const logoBuffer = fs.readFileSync(logoPath);

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
                    <td align="center">
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

              const html = getEmailTemplate(title, sections, !!attachments?.length);

              // Prepare mail attachments including the inline logo
              const mailAttachments = [
                {
                  filename: 'struzon-logo.png',
                  content: logoBuffer,
                  cid: 'struzon_logo'
                }
              ];

              if (attachments && attachments.length > 0) {
                attachments.forEach((a: any) => {
                  mailAttachments.push({
                    filename: a.filename,
                    content: Buffer.from(a.content, 'base64'),
                    cid: undefined
                  } as any);
                });
              }

              await transporter.sendMail({
                from: `"${details.name} (${userEmail})" <${authenticatedEmail}>`,
                to: recipientEmail,
                replyTo: userEmail,
                subject: `${title}: ${details.name} via Struzon Website [DEV]`,
                html: html,
                attachments: mailAttachments
              });

                  console.log('✅ [DEV] Custom Header Email Delivered!')
                  res.statusCode = 200
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ success: true }))
                } catch (error: any) {
                  console.error('❌ [DEV] SMTP Error:', error.message)
                  res.statusCode = 500
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ error: error.message }))
                }
              })
              return
            }
            next()
          })
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: false,
    },
    server: { host: 'localhost', port: 8080 },
  }
})
