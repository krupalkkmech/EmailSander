const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const cors = require("cors");
const app = express();

const PORT = 6969;

app.use(bodyParser.json());
app.use(cors());

const nonprofits = {};
const foundations = {};
const emailsSent = [];

app.post("/nonprofits", (req, res) => {
  const { name, address, email } = req.body;
  nonprofits[email] = { name, address, email };
  res.status(201).json({ message: "Nonprofit created successfully" });
});

app.post("/foundations", (req, res) => {
  const { name, email } = req.body;
  foundations[email] = { name, email };
  res.status(201).json({ message: "Foundation created successfully" });
});

app.post("/send-email", (req, res) => {
  const { foundationEmail, nonprofitEmails } = req.body;

  if (!foundations[foundationEmail]) {
    return res.status(404).json({ error: "Foundation not found" });
  }

  nonprofitEmails.forEach((email) => {
    if (!nonprofits[email]) {
      return res
        .status(404)
        .json({ error: `Nonprofit with email ${email} not found` });
    }

    const nonprofit = nonprofits[email];
    const message = `Sending money to nonprofit ${nonprofit.name} at address ${nonprofit.address}.`;
    const emailDetails = {
      id: uuidv4(),
      from: foundationEmail,
      to: nonprofit.email,
      message,
      date: new Date().toISOString(),
    };
    console.log(
      `From: ${foundationEmail}\nTo: ${nonprofit.email}\nMessage: ${message}\nDate: ${emailDetails.date}\n`
    );
    emailsSent.push(emailDetails);
  });

  res.status(200).json({ message: "Emails sent successfully" });
});

app.get("/emails-sent", (req, res) => {
  res.status(200).json(emailsSent);
});

app.get("/nonprofits", (req, res) => {
  res.status(200).json(Object.values(nonprofits));
});

app.get("/foundations", (req, res) => {
  res.status(200).json(Object.values(foundations));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
