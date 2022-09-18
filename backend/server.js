require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieSession = require("cookie-session");
const app = express();
const UserRoute = require("./models/user");
const path = require('path');

mongoose.connect("mongodb+srv://cgitech:Fb7AxGsPTrydfwou@cluster0.vi7lzcx.mongodb.net/?retryWrites=true&w=majority")

app.use(express.json());
app.use(cors());

app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

const parentPath = path.resolve(__dirname, '..');

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(parentPath, "/frontend/build")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(parentPath, "frontend", "build", "index.html"))
	});
}

app.use("/", UserRoute);



const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listenting on port ${port}...`));