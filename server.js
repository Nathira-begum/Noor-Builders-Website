// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 1️⃣ Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/noorbuilders", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(err));

// 2️⃣ Define schema and model
const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  service: String,
  message: String,
  date: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);

// 3️⃣ API endpoint to receive contact form data
app.post("/api/contact", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();

    // 4️⃣ Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nathirabegum987@gmail.com", // your sender email
        pass: "ubqq syyv fabr bufk", // use app password (not normal password)
      },
    });

    const mailOptions = {
      from: `${req.body.firstName} ${req.body.lastName} <${req.body.email}>`, // dynamic sender info
      to: "nathirabegum987@gmail.com", // your recipient email
      subject: `New Contact Message from ${req.body.firstName} ${req.body.lastName}`,
      text: `
    Name: ${req.body.firstName} ${req.body.lastName}
    Email: ${req.body.email}
    Phone: ${req.body.phone}
    Service: ${req.body.service}
    Message: ${req.body.message}
  `,
      replyTo: req.body.email, // allows you to reply directly to user’s email
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ message: "Contact saved and email sent successfully!" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Error saving contact or sending email" });
  }
});

// 5️⃣ Start server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
