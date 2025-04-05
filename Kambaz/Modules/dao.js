// import Database from "../Database/index.js";
// import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
import mongoose from 'mongoose';
// const { ObjectId } = mongoose.Types;

export function findModulesForCourse(courseId) {
    // const { modules } = Database;
    // return modules.filter((module) => module.course === courseId);
    return model.find({ course: courseId });
}
export function createModule(module) {
    console.log(module._id);
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
    // const { modules } = Database;
    // const module = modules.find((module) => module._id === moduleId);
    // Object.assign(module, moduleUpdates);
    // return module;
    return model.updateOne({ _id: moduleId }, moduleUpdates);
}

