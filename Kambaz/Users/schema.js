import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => Math.random().toString(36).substring(2, 15)
    },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    email: String,
    lastName: String,
    dob: Date,
    role: {
        type: String,
        enum: ["STUDENT", "FACULTY", "ADMIN", "USER"],
        default: "USER",
    },
    loginId: String,
    section: String,
    lastActivity: Date,
    totalActivity: String,
},
    { collection: "users" }
);
export default userSchema;