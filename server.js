const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Endpoint to handle form submission
app.post("/send-email", async (req, res) => {
	console.log("Raw req.body:", req.body); // Add this line
	const { name, email, message } = req.body;

	console.log("Received form data:", { name, email, message }); // Log incoming data

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "tiishetsoseragi@gmail.com",
			pass: "navp aisg yted fahc",
		},
	});

	const mailOptions = {
		from: "tiishetsoseragi@gmail.com",
		to: "tiishetsoseragi@gmail.com",
		replyTo: email,
		subject: `New Contact Form Submission from ${name}`,
		text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
	};

	try {
		await transporter.sendMail(mailOptions);
		console.log("Email sent successfully");
		res.status(200).json({ success: true, message: "Email sent successfully" }); // <-- JSON
	} catch (error) {
		console.error("Error sending email:", error);
		res.status(500).json({
			success: false,
			message: "Error sending email: " + error.message,
		}); // <-- JSON
	}
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
