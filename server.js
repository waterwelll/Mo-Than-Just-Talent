const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Endpoint to handle form submission
app.post("/send-email", async (req, res) => {
	const { name, email, message } = req.body;

	console.log("Received form data:", { name, email, message }); // Log incoming data

	// Configure Nodemailer
	const transporter = nodemailer.createTransport({
		service: "gmail", // Use your email provider
		auth: {
			user: "tiishetsoseragi@gmail.com", // Replace with your email
			pass: "cbuf hjyo llkt wqdi", // Replace with your email password
		},
	});

	// Email options
	const mailOptions = {
		from: email,
		to: "tiishetsoseragi@gmail.com", // Replace with the website's email
		subject: `New Contact Form Submission from ${name}`,
		text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
	};

	try {
		await transporter.sendMail(mailOptions);
		console.log("Email sent successfully"); // Log success
		res.status(200).send("Email sent successfully");
	} catch (error) {
		console.error("Error sending email:", error); // Log error
		res.status(500).send("Error sending email");
	}
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
