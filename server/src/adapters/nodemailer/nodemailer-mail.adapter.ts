import { MailAdapter, SandMailData } from './../mail-adapter';
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "4772ebf6fa4429",
      pass: "24fc0bef7b48c5",
    },
  });

export class NodemailerMailAdapter implements MailAdapter {
   async sendMail( {subject, body}: SandMailData) {
    await transport.sendMail({
    from: "Equipe Feedget <oi@feedget.com>",
    to: "Lucas Santos <lucassantos.dsilv@gmail.com>",
    subject,
    html: body,
  });
   }
}


