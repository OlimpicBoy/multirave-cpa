require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

const EMAIL_USER = process.env.REACT_APP_EMAIL_USER;
const EMAIL_PASS = process.env.REACT_APP_EMAIL_PASS;
const ADMIN_EMAIL = process.env.REACT_APP_ADMIN_EMAIL;

// Email transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});

app.post('/api/buy-ticket', async (req, res) => {
    const { email } = req.body;
    const orderId = 'order_' + Date.now();

    // Email options for buyer
    const mailOptions = {
        from: EMAIL_USER,
        to: email,
        subject: 'Ваш билет на MULTIRAVE',
        text: `Ваш билет на MULTIRAVE\nID билета: ${orderId}`
    };

    try {
        await transporter.sendMail(mailOptions);
        await transporter.sendMail({
            from: EMAIL_USER,
            to: ADMIN_EMAIL,
            subject: 'Продажа билета на MULTIRAVE',
            text: `Продан билет на MULTIRAVE\nID билета: ${orderId}\nEmail покупателя: ${email}`
        });

        res.status(200).json({ message: 'Билет успешно куплен!' });
    } catch (error) {
        console.error('Ошибка при отправке email:', error);
        res.status(500).json({ error: 'Ошибка при покупке билета' });
    }
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
