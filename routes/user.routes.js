import { Router } from "express";
import { getUserById, getUsers } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

// get all the users
userRouter.get("/", authorize, getUsers);

// get user details
userRouter.get("/:id", authorize, getUserById);

// create a new user
userRouter.post("/", (req, res) => {
  res.send({ title: "Create a new user endpoint" });
});

// update user details
userRouter.put("/:id", (req, res) => {
  res.send({ title: "Update user with ID" });
});

// delete a user
userRouter.delete("/:id", (req, res) => {
  res.send({ title: "Delete user with ID" });
});

export default userRouter;
