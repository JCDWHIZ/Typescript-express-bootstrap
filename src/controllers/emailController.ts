// export const forgotPassword = async (req: Request, res: Response) => {
//     const { email } = req.body;

import { Request, Response } from "express";
import { EmailWithoutButton, sendEmail } from "../config/emailservice";

//     try {
//       const user = await User.findOne({ email });
//       if (!user) return res.status(404).json({ message: "User not found" });

//       if (!process.env.CRYPTO_SECRET) return false;
//       const token = CryptoJS.AES.encrypt(
//         email,
//         process.env.CRYPTO_SECRET
//       ).toString();

//       const resetLink = `${
//         process.env.FRONTEND_URL
//       }/auth/set-password/${encodeURIComponent(token)}`;

//       const emailHTML = forgotPasswordEmailTemplate(email, resetLink);
//       await sendEmail(email, "Password Reset Request", emailHTML);

//       return res
//         .status(200)
//         .json({ message: "Password reset email sent successfully." });
//     } catch (error) {
//       console.error("Error in forgotPassword:", error);
//       return res.status(500).json({ message: "Internal server error." });
//     }
//   };

/**
 * @swagger
 * /api/send-custom-email:
 *   post:
 *     summary: Send a custom email
 *     description: Sends a custom email with or without a button based on the provided parameters.
 *     tags: [Email]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - title
 *               - schoolName
 *               - description
 *               - EmailWithButton
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Recipient's email address.
 *               title:
 *                 type: string
 *                 description: Subject/title of the email.
 *               schoolName:
 *                 type: string
 *                 description: Name of the school receiving the email.
 *               description:
 *                 type: string
 *                 description: Content of the email message.
 *               EmailWithButton:
 *                 type: boolean
 *                 description: Determines whether to include a button in the email.
 *               buttonLink:
 *                 type: string
 *                 format: uri
 *                 description: URL for the button (required if EmailWithButton is true).
 *               buttonText:
 *                 type: string
 *                 description: Text to be displayed on the button (required if EmailWithButton is true).
 *     responses:
 *       200:
 *         description: Email sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email sent successfully."
 *       400:
 *         description: Bad request, missing or invalid parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid request parameters."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */
export const sendCustomEmail = async (req: Request, res: Response) => {
  const {
    email,
    title,
    schoolName,
    buttonLink,
    buttonText,
    EmailWithButton,
    description,
  } = req.body;
  try {
    if (EmailWithButton) {
      const emailHTML = EmailWithoutButton(title, schoolName, description);
      await sendEmail(email, title, emailHTML);
    } else {
      const emailHTML = EmailWithButton(
        title,
        schoolName,
        buttonLink,
        description,
        buttonText
      );
      await sendEmail(email, title, emailHTML);
    }

    return res.status(200).json({ message: "email sent successfully." });
  } catch (error) {
    console.error("Error in email:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
