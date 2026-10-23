const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// =====================================================
// 1. CONNECT TO MONGODB
// =====================================================

mongoose
  .connect("mongodb://127.0.0.1:27017/noorbuilders")
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Error:", err));

// =====================================================
// 2. EMAIL TRANSPORTER
// =====================================================
// =====================================================
// 2. EMAIL CONFIGURATION
// =====================================================

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
  console.error(
    "Email credentials missing. Please check your .env file."
  );
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

// =====================================================
// 3. CONTACT FORM SCHEMA
// =====================================================

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

// =====================================================
// 4. CONTACT FORM API
// =====================================================

app.post("/api/contact", async (req, res) => {
  try {
    const formData = new Form(req.body);
    await formData.save();

   await transporter.sendMail({
  from: `Noor Builders Website <${GMAIL_USER}>`,
  to: GMAIL_USER,
  replyTo: req.body.email,
  subject: "New Enquiry from Noor Builders Website",
  text: `
NEW ENQUIRY RECEIVED

Name: ${req.body.name}
Email: ${req.body.email}
Phone: ${req.body.phoneno}
Location: ${req.body.location}
Land Area: ${req.body.landAreaInput} sq.ft
Requirement: ${req.body.requirement}
  `,
});

    return res.status(200).json({
      message: "Contact form saved and email sent successfully!",
    });
  } catch (error) {
    console.error("Contact API Error:", error);

    return res.status(500).json({
      message: "Contact details could not be saved or emailed.",
    });
  }
});

// =====================================================
// 5. COST ESTIMATE SCHEMA
// =====================================================

const estimateSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },

  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
  },

  address: {
    type: String,
    required: true,
    trim: true,
  },

  constructionArea: {
    type: Number,
    default: null,
  },

  plotArea: {
    type: Number,
    required: true,
  },

  selectedPackage: {
    type: Number,
    required: true,
  },

  packageName: String,
  constructionType: String,
  floors: String,

  siteLocation: {
    type: String,
    required: true,
  },

  approvalAuthority: String,

  sumpLitres: {
    type: Number,
    default: 0,
  },

  wasteWaterTank: {
    type: Number,
    required: true,
  },

  compoundWall: {
    type: Number,
    default: 0,
  },

  solarPower: {
    type: Number,
    default: 0,
  },

  boreDepth: {
    type: Number,
    default: null,
  },

  boreCost: {
    type: Number,
    default: 0,
  },

  ebConnection: {
    type: String,
    required: true,
  },

  ebCost: {
    type: Number,
    default: 0,
  },

  constructionCost: {
    type: Number,
    required: true,
  },

  totalCost: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Estimate = mongoose.model("Estimate", estimateSchema);

// =====================================================
// 6. SAVE ESTIMATE + SEND EMAIL
// =====================================================

app.post("/api/estimates", async (req, res) => {
  try {
    const {
      fullName,
      phoneNumber,
      email,
      address,
      constructionArea,
      plotArea,
      selectedPackage,
      constructionType,
      floors,
      siteLocation,
      approvalAuthority,
      sumpLitres,
      wasteWaterTank,
      compoundWall,
      solarPower,
      boreDepth,
      ebConnection,
    } = req.body;

    // Validate customer and project details
    if (
      typeof fullName !== "string" ||
      !fullName.trim() ||
      typeof phoneNumber !== "string" ||
      !/^[6-9]\d{9}$/.test(phoneNumber.trim()) ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
      typeof address !== "string" ||
      !address.trim() ||
      typeof siteLocation !== "string" ||
      !siteLocation.trim() ||
      typeof constructionType !== "string" ||
      !constructionType.trim() ||
      !["Single Phase", "Three Phase"].includes(ebConnection)
    ) {
      return res.status(400).json({
        message: "Please enter valid customer and project details.",
      });
    }

    // Convert numerical values
    const area = Number(plotArea);
    const packagePrice = Number(selectedPackage);
    const sump = Number(sumpLitres ?? 0);
    const tank = Number(wasteWaterTank);
    const wall = Number(compoundWall ?? 0);
    const solar = Number(solarPower ?? 0);

    const depth =
      boreDepth === null || boreDepth === undefined || boreDepth === ""
        ? null
        : Number(boreDepth);

    const numericValues = [area, packagePrice, sump, tank, wall, solar];

    if (
      !numericValues.every((value) => Number.isFinite(value) && value >= 0) ||
      area < 100 ||
      area > 100000 ||
      tank <= 0 ||
      ![2350, 2550, 2800, 3000].includes(packagePrice) ||
      (depth !== null &&
        (!Number.isFinite(depth) || ![400, 600, 800].includes(depth)))
    ) {
      return res.status(400).json({
        message: "Please enter valid calculator values.",
      });
    }

    // Calculate construction cost
    const constructionCost = area * packagePrice;

    // Calculate borewell cost
    let boreCost = 0;

    if (depth === 400) {
      boreCost = 105000;
    } else if (depth === 600) {
      boreCost = 160000;
    } else if (depth === 800) {
      boreCost = 200000;
    }

    // Calculate EB cost
    const ebCost = ebConnection === "Single Phase" ? 25000 : 65000;

    // Calculate total cost on the server
    const totalCost =
      constructionCost +
      boreCost +
      sump * 25 +
      tank * 30000 +
      wall * 2000 +
      solar * 75000 +
      ebCost;

    const packageNames = {
      2350: "Standard",
      2550: "Premium",
      2800: "Luxury",
      3000: "Elite",
    };

    // Save estimate in MongoDB first
    const estimate = await Estimate.create({
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      email: email.trim(),
      address: address.trim(),

      constructionArea:
        constructionArea == null || constructionArea === ""
          ? null
          : Number(constructionArea),

      plotArea: area,
      selectedPackage: packagePrice,
      packageName: packageNames[packagePrice],

      constructionType: constructionType.trim(),
      floors: floors || "",
      siteLocation: siteLocation.trim(),
      approvalAuthority: approvalAuthority || "",

      sumpLitres: sump,
      wasteWaterTank: tank,
      compoundWall: wall,
      solarPower: solar,

      boreDepth: depth,
      boreCost,

      ebConnection,
      ebCost,

      constructionCost,
      totalCost,
    });

    // Format amounts for the email
    const money = (amount) => "₹" + Number(amount || 0).toLocaleString("en-IN");

    // Send the estimate email
    let emailSent = false;
    let emailErrorMessage = "";

    try {
      await transporter.sendMail({
  from: `Noor Builders Website <${GMAIL_USER}>`,
  to: GMAIL_USER,
  replyTo: estimate.email,
  subject: `New Construction Estimate - ${estimate.fullName}`,

  text: `
NOOR BUILDERS AND ASSOCIATES
CONSTRUCTION COST ESTIMATE

Customer: ${estimate.fullName}
Phone: ${estimate.phoneNumber}
Email: ${estimate.email}
Address: ${estimate.address}

Construction Type: ${estimate.constructionType}
Floors: ${estimate.floors || "Not specified"}
Site Location: ${estimate.siteLocation}
Plot Area: ${estimate.plotArea} sq.ft

Package: ${estimate.packageName}
Rate: ₹${estimate.selectedPackage}/sq.ft
Construction Cost: ₹${estimate.constructionCost}

Sump: ${estimate.sumpLitres} litres
Waste Water Tank: ${estimate.wasteWaterTank}
Compound Wall: ${estimate.compoundWall}
Solar Power: ${estimate.solarPower}
Borewell Depth: ${estimate.boreDepth ?? "Not selected"} ft
Borewell Cost: ₹${estimate.boreCost}
EB Connection: ${estimate.ebConnection}
EB Cost: ₹${estimate.ebCost}

TOTAL ESTIMATED COST: ₹${estimate.totalCost}

Estimate ID: ${estimate._id}
Date: ${estimate.createdAt.toLocaleString("en-IN")}
  `,
});

      emailSent = true;
      console.log("Estimate email sent successfully.");
    } catch (mailError) {
      emailErrorMessage = mailError.message;
      console.error("Estimate Email Error:", mailError);
    }

    // The estimate remains saved even if email delivery fails
    return res.status(201).json({
      message: emailSent
        ? "Estimate saved and email sent successfully!"
        : "Estimate saved, but email could not be sent.",
      emailSent,
      emailError: emailSent ? undefined : emailErrorMessage,
      estimateId: estimate._id,
      totalCost: estimate.totalCost,
      estimate,
    });
  } catch (error) {
    console.error("Estimate API Error:", error);

    return res.status(500).json({
      message: "Failed to save estimate. Please try again.",
    });
  }
});

// =====================================================
// 7. GET ALL SAVED ESTIMATES
// =====================================================

app.get("/api/estimates", async (req, res) => {
  try {
    const estimates = await Estimate.find().sort({
      createdAt: -1,
    });

    return res.status(200).json(estimates);
  } catch (error) {
    console.error("Fetch Estimates Error:", error);

    return res.status(500).json({
      message: "Failed to retrieve estimates.",
    });
  }
});

// =====================================================
// 8. START SERVER
// =====================================================

app.listen(5000, () => {
  console.log("Noor Builders API running on port 5000");
});
