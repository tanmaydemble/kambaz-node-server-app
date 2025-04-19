import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuizModel',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    score: {
        type: Number,
        default: 0
    },
    answers: [{
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'QuestionModel'
        },
        answer: mongoose.Schema.Types.Mixed,
        isCorrect: Boolean,
        pointsEarned: {
            type: Number,
            default: 0
        }
    }],
    attemptsCount: {
        type: Number,
        default: 0
    }
}, { collection: 'quizattempts' });

export default schema;