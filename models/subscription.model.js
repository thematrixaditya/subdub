import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 2,
    maxLength: 100,
  },
  price: {
    type: Number,
    required: [true, "subscription price is required"],
    min: [0, "price must be a greater than or equal to 0"],
  },
  currency: {
    type: String,
    required: [true, "currency is required"],
    enum: ["USD", "EUR", "GBP", "INR"],
    default: "USD",
    frequency: {
      type: String,
      required: true,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      required: true,
      enum: ["sports", "news", "entertainment", "lifestyle", "technology", "finance", "politics", "education", "other"],
      default: "basic",
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message: "Start date must be in the past or today",
      },
    },
    renewalDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value > this.startDate,
        message: "Renewal date must be after the start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
}, { timestamps: true });

// auto calculate renewal date if missing
SubscriptionSchema.pre("save", function (next) {
  if (!this.startDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
  }

  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }

  next();
});

const Subscription = mongoose.model("Subscription", SubscriptionSchema);

export default Subscription;