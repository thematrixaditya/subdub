import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({ ...req.body, user: req.user._id });

    const response = { success: true, message: "Subscription created successfully", data: subscription };
    console.log("Subscription created successfully: ", response);

    res.status(201).json(response);
  } catch (error) {
    console.error("Error creating subscription:", error);
    res.status(500).json({ error: error.message });

    next(error);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error("Unauthorized access to user subscriptions");
      error.status = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    const response = { success: true, message: "User subscriptions retrieved successfully", data: subscriptions };
    console.log("User subscriptions retrieved successfully: ", response);

    res.status(200).json(response);
  } catch (error) {
    console.error("Error retrieving user subscriptions:", error);
    res.status(500).json({ error: error.message });

    next(error);
  }
};