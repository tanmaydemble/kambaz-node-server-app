// import Database from "../Database/index.js";
// import { v4 as uuidv4 } from "uuid";

// export function enrollUserInCourse(userId, courseId) {
//     const { enrollments } = Database;
//     enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
// }
// export default {
//     findEnrollmentsForUser: (userId) => {
//         return Database.enrollments.filter(e => e.user === userId);
//     },
//     enrollUserInCourse: (userId, courseId) => {
//         const newEnrollment = {
//             _id: uuidv4(),
//             user: userId,
//             course: courseId
//         };
//         Database.enrollments.push(newEnrollment);
//         return newEnrollment;
//     },
//     unenrollUserFromCourse: (userId, courseId) => {
//         const index = Database.enrollments.findIndex(
//             e => e.user === userId && e.course === courseId
//         );
//         if (index !== -1) {
//             return Database.enrollments.splice(index, 1)[0];
//         }
//         return null;
//     }
// };

import model from "./model.js";
export async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
}
export async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
}
export function enrollUserInCourse(user, course) {
    return model.create({ user, course });
}
export function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
}
