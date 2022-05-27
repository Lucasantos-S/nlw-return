"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const submit_feedback_use_case_1 = require("./submit-feedback-use-case");
const createFeddbackSpy = jest.fn();
const sendMailSpy = jest.fn();
const submitFeedback = new submit_feedback_use_case_1.SubmitFeedbackUseCase({ create: createFeddbackSpy }, { sendMail: sendMailSpy });
describe('Submit feeedbacks', () => {
    it('Should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: "tudo bugado",
            screenshot: 'data:image/png;base64',
        })).resolves.not.toThrow();
        expect(createFeddbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });
    it('Should not be able submit feeback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: "tudo bugado",
            screenshot: 'data:image/png;base64',
        })).rejects.toThrow();
    });
    it('Should not be able submit feeback without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'Bug',
            comment: "",
            screenshot: 'data:image/png;base64',
        })).rejects.toThrow();
    });
    it('Should not be able submit feeback without an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'Bug',
            comment: "tudo bugado",
            screenshot: 'teste.jpg',
        })).rejects.toThrow();
    });
});
