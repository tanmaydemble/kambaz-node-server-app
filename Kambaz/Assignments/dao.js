// import Database from "../Database/index.js";
// import { v4 as uuidv4 } from 'uuid';
import model from "./model.js";
import mongoose from 'mongoose';
// const { ObjectId } = mongoose.Types;

export function findAssignmentsForCourse(courseId) {
    // const { assignments } = Database;
    // return assignments.filter((assignment) => assignment.course === courseId);
    if (!mongoose.isValidObjectId(courseId)) {
        throw new Error(`Invalid course ID format: ${courseId}`);
    }
    return model.find({ course: courseId });
}
export function createAssignment(assignment) {
    // const newAssignment = { ...assignment, _id: uuidv4() };
    // Database.assignments = [...Database.assignments, newAssignment];
    // return newAssignment;
    console.log("old assignment");
    console.log(assignment);
    const newAssignment = { ...assignment };
    delete newAssignment._id;
    console.log("new assignment");
    console.log(newAssignment);
    return model.create(newAssignment);
}
export function deleteAssignment(assignmentId) {
    // const { assignments } = Database;
    // Database.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
    if (!mongoose.isValidObjectId(assignmentId)) {
        throw new Error(`Invalid ID format: ${assignmentId}`);
    }
    return model.deleteOne({ _id: assignmentId });
}
export function updateAssignment(assignmentId, assignmentUpdates) {
    // const { assignments } = Database;
    // const assignment = assignments.find((assignment) => assignment._id === assignmentId);
    // console.log(assignmentId)
    // if (!assignment) {
    //     throw new Error(`Assignment with ID ${assignmentId} not found.`);
    // }
    // Object.assign(assignment, assignmentUpdates);
    // return assignment;
    if (!mongoose.isValidObjectId(assignmentId)) {
        throw new Error(`Invalid ID format: ${assignmentId}`);
    }
    return model.updateOne(
        { _id: assignmentId },
        { $set: assignmentUpdates }
    );
}
