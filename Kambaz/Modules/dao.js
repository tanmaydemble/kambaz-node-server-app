import model from "./model.js";
import mongoose from 'mongoose';

export function findModulesForCourse(courseId) {
    return model.find({ course: courseId });
}
export function createModule(module) {
    return model.create(module);
}

export async function deleteModule(moduleId) {
    if (!mongoose.isValidObjectId(moduleId)) {
        throw new Error(`Invalid ID format: ${moduleId}`);
    }

    return model.deleteOne({
        _id: moduleId
    });
}

export function updateModule(moduleId, moduleUpdates) {
    return model.updateOne({ _id: moduleId }, moduleUpdates);
}

