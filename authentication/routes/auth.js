const router = require("express").Router();
const User = require("../models/user");
const CryptoJS = require("crypto-js")

//REGISTER
router.post("/register", async (request, response) => {
    // if (!request.body.email || !request.body.username || !request.body.password || !request.body.birthdate || !request.body.role) {
    //     response.setHeader('Content-Type', 'application/json').status(400).json({
    //         "response": "Bad json format!"
    //     });
    // }
    var date = new Date();
    date = date.toISOString().split("T")[0] + " " + date.toISOString().split("T")[1].split(".")[0];
    console.log("DATE!!!!!", date)
    const newUser = new User({
        email: request.body.email,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        password: CryptoJS.AES.encrypt(request.body.password, process.env.PASSWORD_SECRET).toString(),
        birthDate: request.body.birthdate,
        role: request.body.role,
        createdAt: date,
        modifiedAt: date
    });
    try {
        await newUser.save();
        response.setHeader('Content-Type', 'application/json').status(201).json({
            "response": "User successfully registred!"
        });
    } catch (error) {
        response.status(500).json(error);

    }
});

//LOGIN
router.post("/login", async (request, response) => {
    const user = await User.findOne({
        username: request.body.username,
        password: request.body.password
    })
    const password = CryptoJS.AES.decrypt(request.body.password, process.env.PASSWORD_SECRET);
    const uncryptedPassword = password.toString(CryptoJS.enc.Utf8);
    console.log(password);
    console.log(uncryptedPassword);
    try {
        const savedUser = await newUser.save();
        console.log(savedUser);
        response.setHeader('Content-Type', 'application/json').status(201).json({
            "response": "User successfully registred!"
        });
    } catch (error) {
        response.status(500).json(error);

    }
});

module.exports = router;