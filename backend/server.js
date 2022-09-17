const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieSession = require("cookie-session");
const app = express();
const addUsersRoute = require("./models/users");

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

app.use("/", addUsersRoute);



const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listenting on port ${port}...`));