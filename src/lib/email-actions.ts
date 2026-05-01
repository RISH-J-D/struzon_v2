/**
 * Client-side wrappers for email functions that call Netlify serverless functions.
 */

export interface EmailAttachment {
  filename: string;
  content: string; // base64 string
}

export const sendProjectEnquiry = async (data: {
  name: string;
  email: string;
  company: string;
  phone: string;
  project: string;
  attachments?: EmailAttachment[];
}) => {
  const response = await fetch("/.netlify/functions/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "project",
      ...data,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to send enquiry");
  }

  return response.json();
};

export const sendJobApplication = async (data: {
  role: string;
  name: string;
  email: string;
  phone: string;
  linkedin?: string;
  experienceType: string;
  yearsOfExperience?: string;
  previousCompany?: string;
  attachments?: EmailAttachment[];
}) => {
  const response = await fetch("/.netlify/functions/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "career",
      ...data,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to submit application");
  }

  return response.json();
};

/**
 * Helper to convert a File to a base64 string
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result as string;
      // Remove the prefix (e.g., "data:application/pdf;base64,")
      const content = base64.split(',')[1];
      resolve(content);
    };
    reader.onerror = error => reject(error);
  });
};
