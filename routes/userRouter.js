import express from "express"
import { loginUser, registerUser } from "../controlers/userControler.js"

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("User Router")
});
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;