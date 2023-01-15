const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sendEmail = require("./utils/sendEmail");

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors())

// Route
app.get("/", (req,res) => {
    res.send("Home page");
})
app.post("/api/sendEmail", async (req,res) => {
    const {email} = req.body;

    try {
        const send_to = email;
        const sent_from = process.env.EMAIL_USER;
        const reply_to = email;
        const subject = "Thank You Message"
        const message = `
            <h3>Hello baby</h3>
            <p>Thank you for being a bitch</p>
            <p>Regards</p>
        `
        await sendEmail(subject, message, send_to, sent_from, reply_to);
        res.status(200).json({
            success: true,
            message: "Email sent",
            data: null
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);  
})