const AppointmentModel = require('../models/Appointment');

const mongoose = require('mongoose');

const bcrypt = require("bcryptjs");

const fs = require('fs');

const showAppointments = (req, res) => {
    AppointmentModel.find({})
        .then(appointments => {
            res.send(appointments)
        })
        .catch(error => (error));
};
const reserveAppointment = async (req, res) => {

    let bodyData = req.body;

    try {
        const appointment = await new AppointmentModel({
            userId: bodyData.userId,
            date: bodyData.date,
            state: bodyData.state
        }).save();

        res.send({
            message: "Appointment succesfully reserved",
            userId: appointment.userId,
            date: appointment.date,
            state: appointment.state
        });

    } catch (error) {

        res.send(error);

    };
};

const deleteAppointment = async (req, res) => {
    
    let appointmentId = req.body.id;

	AppointmentModel.findByIdAndDelete(
		id
	).then ( (removeAppointment) => {
		
		if (removeAppointment) {
			res.send({
				message: `Appointment ${removeAppointment.id} deleted succesfully by: ${removeAppointment.userId} for: ${removeAppointment.date}`
			});
		} else {
			res.status(404);
			res.send({
				error: `The ${appointmentId} appointment wasn't found.`
			})
		};
		
	}).catch( (err) => {
		console.log( err );
	});
};


const cancelAppointment = async (req, res) => {
    
    let appointmentId = req.body.id;
    let state = req.bodyData.this.state;
	AppointmentModel.findByIdAndUpdate(
		id
	).then ( (appointmentCancelled) => {
		
		if (appointmentCancelled) {
			res.send({
                state = "Cancelled",
				message: `Appointment ${appointmentCancelled.id} succesfully cancelled by: ${appointmentCancelled.userId} for: ${appointmentCancelled.date}`
			});
		} else {
			res.status(404);
			res.send({
				error: `The ${appointmentId} appointment wasn't found.`
			})
		};
		
	}).catch( (err) => {
		console.log( err );
	});
};


module.exports = {
    showAppointments,
    reserveAppointment,
    deleteAppointment,
    cancelAppointment
};