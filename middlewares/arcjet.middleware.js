import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied) {
      if (decision.reason.isRateLimit()) return res.status(429).send({ error: "Too Many Requests" });
      if (decision.reason.isBot()) return res.status(403).send({ error: "Bot detected" });

      return res.status(403).send({ error: "Access Denied" });
    }

    next();
  } catch (error) {
    // Handle any errors that occur during the middleware execution
    console.error("Arcjet middleware error:", error);
    res.status(500).send("Internal Server Error");

    next(error);
  }
}

export default arcjetMiddleware;