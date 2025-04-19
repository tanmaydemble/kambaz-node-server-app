import questionModel from "../Questions/model.js";
import quizAttemptModel from './model.js';

export async function createOrUpdateQuizAttempt(attempt) {
    return quizAttemptModel.findOneAndUpdate(
        { quizId: attempt.quizId, userId: attempt.userId },
        attempt,
        { upsert: true, new: true }
    );
}

export async function findQuizAttempt(quizId, userId) {
    return quizAttemptModel.findOne({ quizId, userId });
}

export async function getQuizQuestionsWithAnswers(quizId) {
    return questionModel.find({ quizId });
}

export async function calculateQuizScore(quizId, userAnswers) {
    const questions = await questionModel.find({ quizId });
    let totalScore = 0;

    const evaluatedAnswers = userAnswers.map(userAnswer => {
        const question = questions.find(q => q._id.equals(userAnswer.questionId));
        if (!question) return null;

        let isCorrect = false;
        let pointsEarned = 0;
        let correctAnswer;

        switch (question.questionType) {
            case 'Multiple Choice':
                const correctChoice = question.choices.find(c => c.isCorrect);
                correctAnswer = correctChoice?.text;
                isCorrect = correctChoice &&
                    String(correctChoice.text).trim().toLowerCase() ===
                    String(userAnswer.answer).trim().toLowerCase();
                break;
            case 'True/False':
                correctAnswer = question.correctBoolean;
                isCorrect = question.correctBoolean === userAnswer.answer;
                break;
            case 'Fill in the Blank':
                correctAnswer = question.correctBlanks.join(', ');
                isCorrect = question.correctBlanks.some(
                    correct => String(correct).trim().toLowerCase() ===
                        String(userAnswer.answer).trim().toLowerCase()
                );
                break;
        }

        pointsEarned = isCorrect ? question.points : 0;
        totalScore += pointsEarned;

        return {
            questionId: userAnswer.questionId,
            answer: userAnswer.answer,
            pointsEarned,
            isCorrect,
            correctAnswer
        };
    }).filter(Boolean); // to remove the null values

    return {
        score: totalScore,
        answers: evaluatedAnswers
    };
}