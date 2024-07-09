import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const sendMails = async (dataMail) => {
  const { email, asunto, message } = dataMail

  const transport = nodemailer.createTransport({
    host: process.env.HOST_MAIL,
    port: process.env.PORT_MAIL,
    auth: {
      user: process.env.USER_MAIL,
      pass: process.env.PASS_MAIL,
    },
  })

  //Enviar Email
  const info = await transport.sendMail({
    from: 'Importaciones',
    to: email,
    subject: asunto,
    html: message,
  })
}

export default sendMails
