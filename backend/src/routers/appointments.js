const express = require("express");
const {
  getAllAppointments,
  addNewAppointment,
  deleteAppointmentById,
  getAppointmentById,
  updateAppointment,
} = require("../controllers/appointments");
const router = express.Router();

router.get("/appts", getAllAppointments);
router.put("/appts", addNewAppointment);
router.delete("/appts/:id", deleteAppointmentById);
router.post("/appts/:id", getAppointmentById);
router.patch("/appts/:id", updateAppointment);

module.exports = router;
