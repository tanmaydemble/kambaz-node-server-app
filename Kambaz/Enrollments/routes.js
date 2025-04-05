import * as enrollmentDao from "./dao.js";
export default function EnrollmentRoutes(app) {
    const enrollUser = async (req, res) => {
        const { userId, courseId } = req.params;
        try {
            const enrollment = enrollmentDao.enrollUserInCourse(userId, courseId);
            res.json(enrollment);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    const unenrollUser = async (req, res) => {
        const { userId, courseId } = req.params;
        try {
            const result = enrollmentDao.unenrollUserFromCourse(userId, courseId);
            if (result) {
                res.sendStatus(200);
            } else {
                res.status(404).json({ message: "Enrollment not found" });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    const getUserEnrollments = async (req, res) => {
        const { userId } = req.params;
        try {
            const enrollments = enrollmentDao.findEnrollmentsForUser(userId);
            res.json(enrollments);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    };

    app.post("/api/users/:userId/enroll/:courseId", enrollUser);
    app.delete("/api/users/:userId/unenroll/:courseId", unenrollUser);
    app.get("/api/users/:userId/enrollments", getUserEnrollments);
}
