import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuizModel',
        required: true
    },
    questionType: {
        type: String,
        enum: ['Multiple Choice', 'True/False', 'Fill in the Blank'],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true,
        default: 1
    },
    question: {
        type: String,
        required: true
    },
    choices: [{
        text: String,
        isCorrect: Boolean
    }],
    correctBoolean: {
        type: Boolean
    },
    correctBlanks: [{
        type: String
    }]
}, { collection: 'questions' });

export default schema;