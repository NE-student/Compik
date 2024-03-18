import nodemailer from "nodemailer";

export const createMailTransporter = () =>{
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.EMAIL_LOGIN,
      pass: process.env.EMAIL_PASS,
    },
  });
  return transporter;
};