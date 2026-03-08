const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

/* ================= CORS ================= */

app.use(cors({
  origin: "*"
}));

app.use(express.json());

/* ================= DATABASE ================= */

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

connectDB();

/* ================= CONTACT MODEL ================= */

const Contact = mongoose.model("Contact", {
  name: String,
  email: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/* ================= CONTACT API ================= */

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {

    /* Save to Database */
    const newMessage = new Contact({
      name,
      email,
      message
    });

    await newMessage.save();

    /* Send Email */
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `Contact from ${name}`,
      text: message
    });

    res.json({ message: "Message sent and saved successfully!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send message." });
  }
});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Webinor Backend Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});