import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export function findAllCourses() {
    // return Database.courses;
    return model.find();
}
export function findCoursesForEnrolledUser(userId) {
    const { courses, enrollments } = Database;
    const enrolledCourses = courses.filter((course) =>
        enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
    return enrolledCourses;
}
export function createCourse(course) {
    delete course._id;
    return model.create(course)
    // const newCourse = { ...course, _id: uuidv4() };
    // Database.courses = [...Database.courses, newCourse];
    // return newCourse;
}

export function deleteCourse(courseId) {
    // const { courses, enrollments } = Database;
    // Database.courses = courses.filter((course) => course._id !== courseId);
    // Database.enrollments = enrollments.filter(
    //     (enrollment) => enrollment.course !== courseId
    // );
    return model.deleteOne({ _id: courseId });
}

export function updateCourse(courseId, courseUpdates) {
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
    // const { courses } = Database;
    // const course = courses.find((course) => course._id === courseId);
    // Object.assign(course, courseUpdates);
    // return course;
}
