const AppointmentsModel = require("../models/Appointments");

const getAllAppointments = async (req, res) => {
  try {
    const allAppointments = await AppointmentsModel.find();
    res.json(allAppointments);
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "error getting appointments" });
  }
};

const addNewAppointment = async (req, res) => {
  try {
    const newAppointments = {
      title: req.body.title,
      name: req.body.name,
      company: req.body.company,
      address: req.body.address,
      date: req.body.date,
      notes: req.body.notes,
    };
    await AppointmentsModel.create(newAppointments);
    res.json({ status: "ok", msg: "appointment created" });
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "error creating appointment" });
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const appointment = await AppointmentsModel.findById(req.params.id);
    res.json(appointment);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error getting appointment" });
  }
};

const updateAppointment = async (req, res) => {
  try {
    await AppointmentsModel.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      name: req.body.name,
      company: req.body.company,
      address: req.body.address,
      date: req.body.date,
      notes: req.body.notes,
    });
    res.json({ status: "ok", msg: "appointment updated" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error getting appointment" });
  }
};

const deleteAppointmentById = async (req, res) => {
  try {
    await AppointmentsModel.findByIdAndDelete(req.params.id);
    res.json({ status: "ok", msg: "appointment deleted" });
  } catch (error) {
    console.error(error.message);
    res
      .status(400)
      .json({ status: "error", msg: "error deleting appointment" });
  }
};

module.exports = {
  getAllAppointments,
  addNewAppointment,
  getAppointmentById,
  deleteAppointmentById,
  updateAppointment,
};
