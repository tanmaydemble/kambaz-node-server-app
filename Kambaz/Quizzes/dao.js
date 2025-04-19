import model from "./model.js";
import mongoose from 'mongoose';

export function findQuizzesForCourse(courseId) {
    if (!mongoose.isValidObjectId(courseId)) {
        throw new Error(`Invalid course ID format: ${courseId}`);
    }
    return model.find({ course: courseId });
}

export function createQuiz(quiz) {
    const newQuiz = { ...quiz };
    delete newQuiz._id;
    return model.create(newQuiz);
}

export function updateQuiz(quizId, quizUpdates) {
    if (!mongoose.isValidObjectId(quizId)) {
        throw new Error(`Invalid ID format: ${quizId}`);
    }
    return model.findOneAndUpdate(
        { _id: quizId },
        { $set: quizUpdates },
        { new: true }
    );
}

export function deleteQuiz(quizId) {
    if (!mongoose.isValidObjectId(quizId)) {
        throw new Error(`Invalid ID format: ${assignmentId}`);
    }
    return model.deleteOne({ _id: quizId });
}

export function findQuizById(quizId) {
    if (!mongoose.isValidObjectId(quizId)) {
        throw new Error(`Invalid ID format: ${quizId}`);
    }
    return model.findById(quizId);
}

