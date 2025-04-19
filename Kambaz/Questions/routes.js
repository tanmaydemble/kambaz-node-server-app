import * as questionsDao from './dao.js';

export default function QuestionRoutes(app) {
    app.get('/api/quizzes/:quizId/questions', async (req, res) => {
        const { quizId } = req.params;
        try {
            const questions = await questionsDao.findQuestionsForQuiz(quizId);
            res.send(questions);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });
    app.post('/api/quizzes/:quizId/questions', async (req, res) => {
        const { quizId } = req.params;
        const question = req.body;
        question.quizId = quizId;
        try {
            const newQuestion = await questionsDao.addQuestion(question);
            res.status(201).send(newQuestion);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });
    app.put('/api/quizzes/:quizId/questions/:questionId', async (req, res) => {
        const { questionId } = req.params;
        const question = req.body;
        try {
            const updatedQuestion = await questionsDao.updateQuestion(questionId, question);
            res.send(updatedQuestion);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });
    app.delete('/api/quizzes/:quizId/questions/:questionId', async (req, res) => {
        const { questionId } = req.params;
        try {
            const deletedQuestion = await questionsDao.deleteQuestion(questionId);
            res.send(deletedQuestion);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });
}