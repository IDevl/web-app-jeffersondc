const router = require("express").Router();
const mongoose = require("mongoose");

const UserCareerSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    targetDate: {
        type: String,
        required: true,
    },
    completedDate: {
        type: String,
        required: true,
    },
});

router.post('/', async (req, res) => {
    const careerData = req.body;
    const UserModel = mongoose.model(user.email, UserCareerSchema);

    if (user.request === "addcareer") {
       console.log(careerData);
    }
})

module.exports = router;
