const express = require("express");
const router = express.Router();
const Appointment = require("../Models/Appointment");
const Queue = require("../Models/Queueinfo");
const Bill = require("../Models/Billinfo");
const Patient = require("../Models/Patientinfo");

const {sendAppointmentApprovalEmail , sendAppointmentRejectionEmail} = require('../Utility/Sendmail')

const VerifyToken = require('../Middleware/VerifyToken')
const AuthorizedRoles = require('../Middleware/AuthorizedRoles')

router.post("/createappointment", async (req, res) => {
  try {
    const { doctorid,doctorname,  doctorspecialization, patientid, scheduleddate, scheduledtime, type, disease } = req.body;
    console.log(req.body);

    const appointment = await Appointment.create({
      doctorid: doctorid,
      doctorname: doctorname,
      doctorspecialization: doctorspecialization,
      patientid: patientid,
      scheduleddate: scheduleddate,
      scheduledtime: scheduledtime,
      type: type,
      disease: disease,
      status: "Pending",
      consultantfee: "100",
    });

    res.status(200) .json({
      success: true,
      message: "Appointment Booked Sucessfully successfully",
      appointment,
    });
    console.log("Inserted:", appointment);
  } catch (error) {
    console.error("Insertion Error:", error);
    res.status(500).json({
      message: "Error inserting appointment details",
      error: error.message,
    });
  }
});

// get all Pending appointments
router.post("/allappointment", async (req, res) => {
  try {
    const appointment = await Appointment.find({ 'status' : "Pending" });
    res.status(200).json(appointment);
    // console.log(appointment)
  } catch (error) {
    console.error("Error fetching appointment:", error);
    res.status(500).json({
      message: "Error fetching appointment data",
      error: error.message,
    });
  }
});

// get all appointment of a perticular patient
router.post("/details/:patientId", async (req, res) => {
  const { patientId } = req.params;

  try {
    const appointments = await Appointment.find({ patientid: patientId }).sort({scheduleddate: -1});
    if (!appointments.length) {
      return res.status(404).json({
        success: false,
        message: "No appointments found for this patient",
      });
    }

    res.status(200).json({ success: true, appointments });
    console.log(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// DELETE route to Cancel a Appointment by Id
router.post("/cancelappointment", async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);

    const appointment = await Appointment.findOneAndDelete({ _id: id });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({ message: "Appointment Canceled Successfully" });

  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Cancelling Appointment", error: error.message });
    console.log(error.message);
  }
});


// Update appointment status to approved and add to queue
router.post("/approve/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const appointment = await Appointment.findOneAndUpdate(
      { _id: id },
      { status: "approved" },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const patient = await Patient.findOne({ 'id' : appointment.patientid });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const queue = await Queue.create({
      id: appointment.patientid,
      name: patient.name,
      gender: patient.gender,
      disease: appointment.disease,
      type: appointment.type,
      mobileno: patient.phone,
      doctorid: appointment.doctorid,
      date: appointment.scheduleddate,
    });

    await Bill.create({
      patientid: patient.id,
      patientname: patient.name,
    });

    sendAppointmentApprovalEmail(patient.email, patient.name, appointment.scheduleddate, appointment.doctorname);

    res.status(200).json({ message: "Appointment approved and added to queue", appointment, queue });

  } catch (error) {
    console.error("Error approving appointment:", error);
    res.status(500).json({ message: "Error approving appointment", error: error.message });
  }
});

// Update appointment status to rejected
router.post("/reject/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findOneAndUpdate(
      { _id: id },
      { status: "rejected" },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const patient = await Patient.findOne({ 'id' : appointment.patientid });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    sendAppointmentRejectionEmail(  patient.email , patient.name, appointment.scheduleddate, "Doctor is not available");

    res.status(200).json({ message: "Appointment rejected", appointment });

  } catch (error) {
    console.error("Error rejecting appointment:", error);
    res.status(500).json({ message: "Error rejecting appointment", error: error.message });
  }
});

module.exports = router;