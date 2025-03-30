import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollNo: { type: String, required: true},
    faceDescriptor: { type: [Number], required: true }, // Array of numbers for face
    attendance: [{
        date: { type: Date, required: true },
        status: { type: String, enum: ["Present", "Absent"], required: true }
    }]
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);

export default Student;
