import express from "express";
import { createClass, deleteClass, getClass, getClasses, updateClass } from "../controlers/classControler.js";
import auth from "../middleware/auth.js";

const classRouter = express.Router();

classRouter.get("/", auth, getClasses);
classRouter.get("/:id", auth, getClass);
classRouter.post("/", auth, createClass);
classRouter.post("/update/:id", auth, updateClass);
classRouter.post("/delete/:id", deleteClass);

export default classRouter; 