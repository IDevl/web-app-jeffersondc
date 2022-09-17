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
    name: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

router.post('/', async (req, res) => {
    const user = req.body;
    const UserModel = mongoose.model("users", UserSchema);

    if (user.request === "register") {
       
    }
})

module.exports = router;
