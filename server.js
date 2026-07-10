const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 1️⃣ Connect MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/noorbuilders", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// 2️⃣ Schema
const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneno: String,
  location: String,
  landAreaInput: String,
  requirement: String,
  date: { type: Date, default: Date.now },
});
const Form = mongoose.model("Form", formSchema);

// 3️⃣ API endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const formData = new Form(req.body);
    await formData.save();

    // 4️⃣ Configure Gmail (App Password needed)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "noorbuildersandassociates2018@gmail.com",
        pass: "xndk higd fofi evvr", // ⚠️ Use Gmail App Password
      },
    });

    const mailOptions = {
      from: "Noor Builders Website <noorbuildersandassociates2018@gmail.com>",
      to: "noorbuildersandassociates2018@gmail.com",
      subject: "🧱 New Enquiry from Noor Builders Website",
      text: `
New Enquiry Received:

Name: ${req.body.name}
Email: ${req.body.email}
Phone: ${req.body.phoneno}
Location: ${req.body.location}
Land Area: ${req.body.landAreaInput} sq.ft
Requirement: ${req.body.requirement}
      `,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ message: "Form saved and email sent successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error saving data or sending email" });
  }
});

// 5️⃣ Run Server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
