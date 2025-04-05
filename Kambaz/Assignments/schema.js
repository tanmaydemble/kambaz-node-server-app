import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        title: String,
        description: String,
        points: Number,
        availableFrom: Date,
        dueDate: Date,
        course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
    },
    { collection: "assignments", _id: { type: mongoose.Schema.Types.ObjectId, auto: true } }
);

export default schema;