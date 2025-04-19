import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "Unnamed Quiz"
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CourseModel',
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    points: {
        type: Number,
        required: true,
        default: 0
    },
    numQuestions: {
        type: Number,
        default: 0
    },
    availableDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    untilDate: {
        type: Date,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    published: {
        type: Boolean,
        default: false
    },
    quizType: {
        type: String,
        enum: ['Graded Quiz', 'Practice Quiz', 'Graded Survey', 'Ungraded Survey'],
        default: 'Graded Quiz'
    },
    assignmentGroup: {
        type: String,
        enum: ['Quizzes', 'Exams', 'Assignments', 'Project'],
        default: 'Quizzes'
    },
    shuffleAnswers: {
        type: Boolean,
        default: true
    },
    isTimeLimitEnabled: {
        type: Boolean,
        default: true
    },
    timeLimit: {
        type: Number,
        default: 20
    },
    multipleAttempts: {
        type: Boolean,
        default: false
    },
    attemptsAllowed: {
        type: Number,
        default: 1
    },
    showCorrectAnswers: {
        type: Boolean,
        default: false
    },
    accessCode: {
        type: String,
        default: ""
    },
    oneQuestionAtATime: {
        type: Boolean,
        default: true
    },
    webcamRequired: {
        type: Boolean,
        default: false
    },
    lockQuestionsAfterAnswering: {
        type: Boolean,
        default: false
    },
}, { collection: "quizzes" });

export default schema;