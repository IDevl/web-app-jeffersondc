require("dotenv").config();
const router = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const shortid = require('shortid');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "46c69d340f0e8a",
        pass: "4c8f8c31b9526b"
    }
});

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


const UserCareerSchema = new mongoose.Schema({
    career_id: {
        type: String,
        required: true,
    },
    career_name: {
        type: String,
        required: true,
    },
    career_description: {
        type: String,
        required: true,
    },
    career_targetDate: {
        type: String,
        required: true,
    },
    career_completedDate: {
        type: String,
        required: true,
    },
});


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
                var mailOptions = {
                    from: 'jbdelacruz411@gmail.com',
                    to: result.email,
                    subject: 'JBDC Web App - Forgot Password',
                    text: 'Your password is ' + result.password
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        res.json("Error!");
                    } else {
                        res.json("Password sent to your email! Please Check.");
                    }
                });
            }
        });
    }

    if (user.email) {
        if (user.request === "showcareers") {
            const UserCareerModel = mongoose.model(user.email, UserCareerSchema);
            UserCareerModel.find({}, (err, result) => {
                if (result) {
                    res.json(result);
                }
                else {
                    res.json("No items found!");
                }
            });
        }

        if (user.request === "getcareerdata") {
            const UserCareerModel = mongoose.model(user.email, UserCareerSchema);
            UserCareerModel.findOne({ career_id: user.career_id }, (err, result) => {
                if (result) {
                    res.json(result);
                }
                else {
                    res.json("No career found!");
                }
            });
        }

        if (user.request === "deletecareer") {
            const UserCareerModel = mongoose.model(user.email, UserCareerSchema);
            UserCareerModel.deleteOne({ career_id: user.career_id }, (err, result) => {
                if (result) {
                    res.json("Career Deleted.");
                }
                else {
                    res.json("No items found!");
                }
            });
        }

        if (user.request === "addcareer") {
            const UserCareerModel = mongoose.model(user.email, UserCareerSchema);
            UserCareerModel.findOne({ career_name: user.career_name }, (err, result) => {
                if (!result) {
                    const newUserCareer = new UserCareerModel({
                        career_id: "C" + shortid.generate(),
                        career_name: user.career_name,
                        career_description: user.career_description,
                        career_targetDate: user.career_targetDate,
                        career_completedDate: user.career_completedDate
                    })
                    newUserCareer.save();
                    res.json("Career added successfully!");
                }
                else {
                    res.json("Career already exists!");
                }
            });
        }

        if (user.request === "editcareer") {
            const UserCareerModel = mongoose.model(user.email, UserCareerSchema);
            UserCareerModel.updateOne({ career_id: user.career_id }, {
                career_name: user.career_name,
                career_description: user.career_description,
                career_targetDate: user.career_targetDate,
                career_completedDate: user.career_completedDate
            }, (err, result) => {
                if (result) {
                    res.json("Career edited successfully!");
                }
                else {
                    res.json("No career found!");
                }
            });
        }
    }
    else {
        res.json("Session Timeout! Please relogin!");
    }

})




module.exports = router;