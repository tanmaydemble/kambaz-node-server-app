import model from "./model.js";
import mongoose from 'mongoose';

export function findQuestionsForQuiz(quizId) {
    if (!mongoose.isValidObjectId(quizId)) {
        throw new Error(`Invalid ID format: ${quizId}`);
    }
    return model.find({ quizId: quizId });
}

export function addQuestion(question) {
    return model.create(question);
}

export function updateQuestion(questionId, question) {
    if (!mongoose.isValidObjectId(questionId)) {
        throw new Error(`Invalid ID format: ${questionId}`);
    }
    return model.findByIdAndUpdate(questionId, question, { new: true });
}

export function deleteQuestion(questionId) {
    if (!mongoose.isValidObjectId(questionId)) {
        throw new Error(`Invalid ID format: ${questionId}`);
    }
    return model.findByIdAndDelete(questionId);
}