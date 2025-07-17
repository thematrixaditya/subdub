import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";

const subscriptionRouter = Router();

// get all subscriptions
subscriptionRouter.get("/", (req, res) => {
  res.send({ title: "Get all subscriptions endpoint" });
});

// get subscription details
subscriptionRouter.get("/:id", (req, res) => {
  res.send({ title: "Get subscription with ID" });
});

// create a new subscription
subscriptionRouter.post("/", authorize, (req, res) => {
  res.send({ title: "Create a new subscription endpoint" });
});

// update subscription details
subscriptionRouter.put("/:id", (req, res) => {
  res.send({ title: "Update subscription with ID" });
});

// delete a subscription
subscriptionRouter.delete("/:id", (req, res) => {
  res.send({ title: "Delete subscription with ID" });
});

// get all subscriptions for a user
subscriptionRouter.get("/user/:id", (req, res) => {
  res.send({ title: "Get all subscriptions for user with ID" });
});

// cancel a subscription
subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send({ title: "Cancel subscription with ID" });
});

// get all upcoming renewals
subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({ title: "Get all upcoming renewals" });
});

export default subscriptionRouter;
