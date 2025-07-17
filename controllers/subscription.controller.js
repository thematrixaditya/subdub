import Subscription from '../models/subscription.model.js';

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({ ...req.body, user: req.user._id });

    const response = { success: true, message: "Subscription created successfully", data: subscription };
    console.log("Subscription created successfully: ", response);

    res.status(201).send(response);
  } catch (error) {
    console.error("Error creating subscription:", error);
    res.status(500).send({ error: error.message });

    next(error);
  }
};