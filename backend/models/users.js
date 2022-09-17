require("dotenv").config();
const router = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });


router.post('/', async (req, res) => {
    const user = req.body;
    const UserModel = mongoose.model("users", UserSchema);

    if (user.request === "register") {
        user.password = await bcrypt.hash(user.password, 10);
        UserModel.findOne({ email: user.email }, (err, result) => {
            if (!result) {
                const newUser = new UserModel({
                    email: user.email.toLowerCase(),
                    password: user.password
                })

                newUser.save();
                res.json("Success");
            }
            else {
                res.json("Email already taken!");
            }
        });
    }

    if (user.request === "login") {
        UserModel.findOne({ email: user.email }, (err, result) => {
            if (!result) {
                res.json("Email does not exists!");
            }
            else {
                bcrypt.compare(user.password, result.password).then(isCorrect => {
                    if (isCorrect) {
                        res.json(result);
                    }
                    else {
                        res.json("Wrong password!");
                    }
                })
            }
        });
    }

    if (user.request === "forgotpassword") {
        UserModel.findOne({ email: user.email }, (err, result) => {
            if (!result) {
                res.json("Email does not exists!");
            }
            else {
                res.json("Success!");
            }
        });
    }

})


module.exports = router;