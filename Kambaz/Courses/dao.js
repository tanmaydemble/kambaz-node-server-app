import Database from "../Database/index.js";
import model from "./model.js";
import enrollmentModel from "../Enrollments/model.js";

export function findAllCourses() {
    return model.find();
}
export function findCoursesForEnrolledUser(userId) {
    const { courses, enrollments } = Database;
    const enrolledCourses = courses.filter((course) => course != null &&
        enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
    return enrolledCourses;
}
export function createCourse(course) {
    delete course._id;
    return model.create(course)
}

export async function deleteCourse(courseId) {
    try {
        await enrollmentModel.deleteMany({ course: courseId });

        const result = await model.deleteOne({ _id: courseId });

        return result;
    } catch (error) {
        console.error("Error deleting course and enrollments:", error);
        throw error;
    }
}

export function updateCourse(courseId, courseUpdates) {
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}
