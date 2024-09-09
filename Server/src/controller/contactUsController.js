import ContactUs from "../model/contactModel.js";
import { sendEmail } from "../services/emailService.js";

export const CreateContactRequest = async (req, res) => {
  try {
    const { user_name, email, subject, message } = req.body;

    // Check if contact request already exists or not
    // const existingRequest = await ContactUs.findOne({ subject });
    // if (existingRequest) {
    //   return res.status(400).json({ message: "Request already exists." });
    // }

    // Create new request
    const newRequest = new ContactUs({
      user_name,
      email,
      subject,
      message,
    });
    await newRequest.save();

    const htmlContent = `
      <h3>Thank you for reaching out, ${user_name}!</h3>
      <p>We have received your message with the following details:</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong> ${message}</p>
      <p>Our team will get back to you shortly.</p>
      <br>
      <p>Best regards,</p>
      <p>Manish Kharbade</p>
    `;

    // Sending the email
    await sendEmail(
      email, //users emil
      `Contact Request Received: ${subject}`, // Subject of the email
      htmlContent // HTML body content
    );

    res.status(201).json({
      success: true,
      message: "Request generated successfully and email sent.",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: true, message: error.message });
  }
};
