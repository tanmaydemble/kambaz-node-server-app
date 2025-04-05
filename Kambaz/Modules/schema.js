import mongoose from "mongoose";
const schema = new mongoose.Schema(
    {
        name: String,
        description: String,
        course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
    },
    { collection: "modules", _id: { type: mongoose.Schema.Types.ObjectId, auto: true } }
);
export default schema;