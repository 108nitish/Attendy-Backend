import express from "express";
import cors from "cors"; 
import dotenv from "dotenv";
import mongoose from "mongoose";
import studentRouter from "./routes/studentRouter.js";
import classRouter from "./routes/classRouter.js";
import userRouter from "./routes/userRouter.js";
import * as faceapi from "face-api.js";
import Student from "./models/studentModel.js";
import Class from "./models/classModel.js";
dotenv.config();
 
mongoose.connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch(err => {
    console.log('MongoDB Connection Error: ', err);
  });



const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/students', studentRouter);
app.use('/api/classes', classRouter);
app.use('/api/users', userRouter);  

app.post("/mark-attendance", async (req, res) => {
  try {
    const { descriptors, classId } = req.body;
    if (!descriptors || descriptors.length === 0) {
      return res.status(400).json({ success: false, message: "No faces detected!" });
    }
 
    const classData = await Class.findById(classId).populate("students");
    if (!classData) {
      return res.status(404).json({ success: false, message: "Class not found!" });
    }

    let presentStudents = [];
    let absentStudents = new Set(classData.students.map((s) => s._id.toString())); 
    for (const descriptor of descriptors) {
      for (let student of classData.students) {
        if (!student.faceDescriptor || !Array.isArray(student.faceDescriptor) || student.faceDescriptor.length === 0) {
          continue;  
        }
        
        const distance = faceapi.euclideanDistance(student.faceDescriptor, descriptor);
        if (distance < 0.6) { 
          presentStudents.push(student._id.toString());
          absentStudents.delete(student._id.toString());  
        }
      }
    }
 
    const today = new Date();
    await Student.updateMany(
      { _id: { $in: presentStudents } },
      { $push: { attendance: { date: today, status: "Present" } } }
    );

    await Student.updateMany(
      { _id: { $in: Array.from(absentStudents) } },
      { $push: { attendance: { date: today, status: "Absent" } } }
    );

    res.json({
      sucess: true,
      message: "Attendance marked successfully!", 
    });
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ sucess: false, message: "Error marking attendance" });
  }
});

app.get('/', (req, res) => {
  res.send('Hello India');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})