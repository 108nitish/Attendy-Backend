import express from "express";

import { createStudent, deleteStudent, getStudent, getStudents, updateStudent } from "../controlers/studentControler.js";
import auth from "../middleware/auth.js";

const studentRouter = express.Router();

studentRouter.get("/", auth, getStudents);
studentRouter.get("/:id", auth, getStudent);
studentRouter.post("/", auth, createStudent);
studentRouter.post("/update/:id", auth, updateStudent);
studentRouter.post("/delete/:id", auth, deleteStudent);

export default studentRouter;
