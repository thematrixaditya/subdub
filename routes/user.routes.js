import { Router } from "express";

const userRouter = Router();

// get all the users
userRouter.get("/users", (req, res) => {
  res.send({ title: "Get all users endpoint" });
});

// get user details
userRouter.get("/:id", (req, res) => {
  res.send(`Get user with ID`);
});

// create a new user
userRouter.post("/", (req, res) => {
  res.send({ title: "Create a new user endpoint" });
});

// update user details
userRouter.put("/:id", (req, res) => {
  res.send({ title: `Update user with ID` });
});

// delete a user
userRouter.delete("/:id", (req, res) => {
  res.send({ title: `Delete user with ID` });
});

export default userRouter;
