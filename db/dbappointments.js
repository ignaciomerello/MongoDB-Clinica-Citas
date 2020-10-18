const AppointmentModel = require('../models/Appointment');

const mongoose = require('mongoose');

const bcrypt = require("bcryptjs");

const moment = require("moment");

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
			state: bodyData.state,
			title: bodyData.title,
			description: bodyData.description
        }).save();

        res.send({
            message: "Appointment succesfully reserved",
            userId: appointment.userId,
            date: appointment.date,
			state: appointment.state,
			title: appointment.title,
			description: appointment.description
        });

    } catch (error) {

        res.send(error);

    };
};

const deleteAppointment = async (req, res) => {
    
	let appointmentId = req.params.id;
	
	AppointmentModel.findByIdAndDelete(
		appointmentId
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
    
    let appointmentId = req.params.id;

	AppointmentModel.findByIdAndUpdate(
		appointmentId,
		{ state: "cancelled",}
		// appointmentId, {
		// 	state: req.body.state,
		// 	title: req.body.title
		// }
	).then ( (appointmentCancelled) => {
		
		if (appointmentCancelled) {
			res.send({
				message: `Appointment ${appointmentCancelled.id} has changed it's status succesfully by: ${appointmentCancelled.userId} for: ${appointmentCancelled.date}`
			});
		} else {
			res.status(418);
			res.send({
				error: `The ${appointmentId} appointment could not be updated.`
			})
		};
		
	}).catch( (error) => {
		console.log( error );
	});
};


module.exports = {
    showAppointments,
    reserveAppointment,
    deleteAppointment,
    cancelAppointment
};