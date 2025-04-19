import * as quizzesDao from "./dao.js";
export default function QuizRoutes(app) {
    app.delete("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const status = await quizzesDao.deleteQuiz(quizId);
        res.send(status);
    });
    app.put("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const quizUpdates = req.body;
        try {
            const updatedQuiz = await quizzesDao.updateQuiz(quizId, quizUpdates);
            if (!updatedQuiz) {
                return res.status(404).send("Quiz not found");
            }
            res.send(updatedQuiz);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });
    app.get("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        try {
            const quiz = await quizzesDao.findQuizById(quizId);
            if (!quiz) {
                return res.status(404).send("Quiz not found");
            }
            res.send(quiz);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });
}