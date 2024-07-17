const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'himanshusharmabthinda@gmail.com',
        pass: 'cavd tjod fdem otdu',
    },
    secure: true,
});

module.exports = transporter;