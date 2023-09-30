require('dotenv').config()
const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')
const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

app.post('/sendEmail', async (req, res) => {
    let {initials, email, phone, good, model, comment} = req.body;

    if (comment) {
        comment = '\nКомментарий пользователя: ' + comment + '.'
    }

    const mailOptions = {
        from: 'site.prioritet@gmail.com',
        to: 'info@tc-prioritet.ru',
        subject: 'Запрос на технику',
        text: `Пользователь ${initials} сделал запрос на ${good} ${model}.\nПочта: ${email}.\nТелефон: ${phone}. ${comment}`
    }

    transporter.sendMail(mailOptions)
})

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()