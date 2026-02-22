import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()
const sendMail=async (to,otp)=>{
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user:process.env.EMAIL,
          pass:process.env.EMAIL_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: `Vibely <${process.env.EMAIL}>`,
            to,
            subject: "Reset Your Password",
            html: `<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`
        });
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }
}

export default sendMail