import { User } from "../entity/User";

const {createMailTransporter} = require("./nodemailer");



export const sendVerificationMail = (user:User)=>{
    const transporter = createMailTransporter();
    const mailOptions = {
        from: `"PC_Configuration" <PCConfigurationsup@outlook.com>`,
        to: user.email,
        subject: "Verify your email!",
        html: `<p>Hello, ${user.Nickname}, verify your email in PC_Configuration by clicking this link</p> <a href = http://${process.env.CLIENT_URL}/emailVerify?emailToken=${user.emailToken}> VERIFY</a>`,
    };
    
    transporter.sendMail(mailOptions, (error:any, info:any) =>{
        if(error){
            console.log(error)
        }
        else{
            console.log("Verification email sent" + info)
        }
    })
}