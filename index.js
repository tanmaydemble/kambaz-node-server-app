import express from 'express';
import Hello from './Hello.js';
import Lab5 from './Lab5/index.js';
import cors from "cors";
import UserRoutes from "./Kambaz/Users/routes.js";
import session from "express-session";
import "dotenv/config";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";
import AssignmentRoutes from './Kambaz/Assignments/routes.js';
import QuizRoutes from './Kambaz/Quizzes/routes.js';
import QuestionRoutes from './Kambaz/Questions/routes.js';
import QuizAttemptRoutes from './Kambaz/QuizAttempts/routes.js';
import mongoose from "mongoose";
import "dotenv/config";

const CONNECTION_STRING = "mongodb://127.0.0.1:27017/kambaz" || process.env.MONGO_CONNECTION_STRING

console.log(CONNECTION_STRING);
mongoose.connect(CONNECTION_STRING)
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.error("Failed to connect to MongoDB:", err));
// console.log("MongoDB Connection String:", process.env.MONGO_CONNECTION_STRING);

const app = express();
app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173",
        "https://67e5f0e2920fd76cfc11d7ee--kanbaz-react-web-app.netlify.app",
        process.env.NETLIFY_URL,
        "https://a6--kanbaz-react-web-app.netlify.app",
        /\.netlify\.app$/
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}
));
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));
app.use(express.json());
Hello(app);
Lab5(app);
UserRoutes(app);
CourseRoutes(app);
EnrollmentRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
QuizRoutes(app);
QuestionRoutes(app);
QuizAttemptRoutes(app);
app.listen(process.env.PORT || 4000);