import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail.adapter';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feddbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import express from "express";


export const routes = express.Router();


routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbackRepository = new PrismaFeedbackRepository()
  const nodemailerMailAdapter = new  NodemailerMailAdapter

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbackRepository,nodemailerMailAdapter) 

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  })

  // await transport.sendMail({
  //   from: "Equipe Feedget <oi@feedget.com>",
  //   to: "Lucas Santos <lucassantos.dsilv@gmail.com>",
  //   subject: "Novo feedback",
  //   html: [
  //     `<p>Tipo do feedback: ${type}</p>`,
  //     `<p>Comentário: ${comment}</p>`,
  //   ].join(" "),
  // });

  return res.status(201).send()
});
