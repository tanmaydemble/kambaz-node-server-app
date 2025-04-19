import * as quizAttemptDao from "./dao.js";
import quizModel from "../Quizzes/model.js";
import quizAttemptModel from "./model.js";

export default function QuizRoutes(app) {

    app.post("/api/quizzes/:quizId/attempt", async (req, res) => {
        const { quizId } = req.params;
        const { userId, answers, userRole } = req.body;

        try {
            const quiz = await quizModel.findById(quizId);
            const existingAttempt = await quizAttemptDao.findQuizAttempt(quizId, userId);

            if (userRole !== "FACULTY" &&
                quiz.multipleAttempts &&
                existingAttempt &&
                existingAttempt.attemptsCount >= quiz.attemptsAllowed) {
                return res.status(400).send("Maximum attempts reached");
            }

            const { score, answers: evaluatedAnswers } = await quizAttemptDao.calculateQuizScore(quizId, answers);

            const attempt = await quizAttemptDao.createOrUpdateQuizAttempt({
                quizId,
                userId,
                score,
                answers: evaluatedAnswers,
                attemptsCount: existingAttempt ? existingAttempt.attemptsCount + 1 : 1
            });

            res.send(attempt);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    app.get("/api/quizzes/:quizId/attempt", async (req, res) => {
        const { quizId } = req.params;
        const { userId } = req.query;

        try {
            const attempt = await quizAttemptDao.findQuizAttempt(quizId, userId);
            if (!attempt) {
                return res.status(404).send("No attempt found");
            }
            res.send(attempt);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    app.get("/api/quizzes/:quizId/questionAnswers", async (req, res) => {
        const { quizId } = req.params;
        try {
            const questions = await quizAttemptDao.getQuizQuestionsWithAnswers(quizId);
            res.send(questions);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });


}