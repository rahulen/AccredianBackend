import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Mailgen from 'mailgen';

dotenv.config();
async function sendReferralEmail(
  name: string,
  email: string,
  referredBy: string
) {
  try {
    // create reusable transporter object using the default SMTP transport
    let config = {
      service: "gmail",
      port: 465,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    };

    const transport = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Accredian",
        link: "https://mailgen.js/",
      },
    });

    let response = {
      body: {
        name: name,
        intro:
          "Welcome to Accredian! We're very excited to have you on board.",
        table: {
          data: [
            {
              course: "Full Stack Web Development",
              description: "Join with us make future best software developer",
            },
            {
              course: "AI/ML Development",
              description: "Join with us make future best software developer",
            },
            {
              course: "Data Science",
              description: "Join with us make future best Data Science",
            },
          ],
        },
        action: {
          instructions: "To get started with Accredian, please click here:",
          button: {
            color: "#22BC66", // Optional action button color
            text: "Click me",
            link: "#",
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    let mail = MailGenerator.generate(response);

     let message = {
        from : "Accredian <admin@accredian.com>",
        to : email,
        subject: "Referral Received by " + referredBy,
        html: mail
    }
    
    const result = await transport.sendMail(message);
    return result;
  } catch (error) {
    throw new Error("Error sending email");
  }
}

export { sendReferralEmail };
