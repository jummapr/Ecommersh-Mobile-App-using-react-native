import DataUriParser from "datauri/parser.js";
import path from "path";
import { createTransport } from "nodemailer";

export const cookieOption = {
  secure: true,
  httpOnly: true,
  sameSite: true,
};

export const getDataUri = (file) => {
  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
};

export const sendToken = async (user, res, message, statusCode) => {
  const token = await user.generateToken();

  res
    .status(statusCode)
    .cookie("token", token, {
      ...cookieOption,
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    })
    .json({
      success: true,
      message: message,
    });
};

export const sendEmail = async (subject, to, text) => {
  const transporter = createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    to,
    subject,
    text,
  });
};
