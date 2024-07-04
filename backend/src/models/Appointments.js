const mongoose = require("mongoose");

const AppointmentsSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    name: { type: String, require: true },
    company: { type: String },
    address: { type: String, require: true },
    date: { type: Date, require: true },
    status: {
      type: String,
      enum: ["completed", "upcoming"],
      default: "upcoming",
      require: true,
    },
    notes: { type: String },
    created_at: { type: Date, default: Date.now },
  },
  { collection: "appointments" }
);

module.exports = mongoose.model("Appointments", AppointmentsSchema);
