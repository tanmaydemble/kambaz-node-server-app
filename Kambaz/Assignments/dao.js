import model from "./model.js";
import mongoose from 'mongoose';

export function findAssignmentsForCourse(courseId) {
    if (!mongoose.isValidObjectId(courseId)) {
        throw new Error(`Invalid course ID format: ${courseId}`);
    }
    return model.find({ course: courseId });
}
export function createAssignment(assignment) {
    const newAssignment = { ...assignment };
    delete newAssignment._id;
    return model.create(newAssignment);
}
export function deleteAssignment(assignmentId) {
    if (!mongoose.isValidObjectId(assignmentId)) {
        throw new Error(`Invalid ID format: ${assignmentId}`);
    }
    return model.deleteOne({ _id: assignmentId });
}
export function updateAssignment(assignmentId, assignmentUpdates) {
    if (!mongoose.isValidObjectId(assignmentId)) {
        throw new Error(`Invalid ID format: ${assignmentId}`);
    }
    return model.updateOne(
        { _id: assignmentId },
        { $set: assignmentUpdates }
    );
}
