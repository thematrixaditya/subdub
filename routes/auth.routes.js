import { Router } from "express";

const authRouter = Router();

// sign-in
authRouter.post("/sign-in", (req, res) => {
  res.send("Login endpoint");
});

// sign-up
authRouter.post("/sign-up", (req, res) => {
  res.send("Registration endpoint");
});

// sign-out
authRouter.post("/sign-out", (req, res) => {
  res.send("Logout endpoint");
});

export default authRouter;