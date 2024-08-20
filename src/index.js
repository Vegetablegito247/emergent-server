require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors')
const connection = require('./config/connection');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_RECIEVE,
        pass: process.env.EMAIL_PWD
    }
})

app.post('/sendEmail', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_RECIEVE,
        subject: `New message from ${name}`,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.error('Error occurred:', error);
            return res.status(500).send('Something went wrong. Please try again later.');
        }
        res.status(200).send('Message sent successfully!');
    })
});

connection(app, process.env.NODE_ENV || 5000)