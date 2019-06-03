const crypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

exports.createUser = async (req, res) => {
    const { userName, email, password, fullName } = req.body;

    const fullNameValidation = validator.isLength(fullName || "", {
        min: 3,
        max: 35
    });
    const userNameValidation = validator.isLength(userName || "", {
        min: 5,
        max: 20
    });
    const emailValidation = validator.isEmail(email || "");
    const passwordValidation = validator.isLength(password || "", {
        min: 6,
        max: 30
    });

    if (
        userNameValidation &&
        emailValidation &&
        passwordValidation &&
        fullNameValidation
    ) {
        const isExist = await User.findOne({
            email
        });

        if (isExist)
            return res.status(400).json({
                error: "user already exists"
            });

        const salt = crypt.genSaltSync(10);
        const hashedPassword = crypt.hashSync(password, salt);

        const usersData = {
            ...req.body,
            password: hashedPassword
        };

        await new User(usersData).save();

        res.status(200).json({
            success: true
        });
    } else {
        res.status(400).json({
            error: "all fields are required"
        });
    }
};

exports.logInUser = async (req, res) => {
    const { email, password } = req.body;

    const emailValidation = validator.isEmail(email || "");
    const passwordValidation = validator.isLength(password || "", {
        min: 6,
        max: 30
    });

    if (emailValidation && passwordValidation) {
        const user = await User.findOne({
            email
        });

        if (!user)
            return res.status(404).json({
                error: "email not found"
            });

        const isPasswordsMatched = crypt.compareSync(password, user.password);

        if (isPasswordsMatched) {
            const tokenData = {
                userName: user.userName,
                fullName: user.fullName,
                avatar: user.avatar.url,
                id: user._id
            };

            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET);

            res.cookie("token", token, {
                maxAge: 900000
            });

            res.status(200).json({
                success: true
            });
        } else {
            res.status(400).json({
                error: "incorrect password"
            });
        }
    } else {
        res.status(400).json({
            error: "all fields are required"
        });
    }
};

exports.authorization = (req, res) => {
    if (req.user) {
        return res.status(200).json({ authorization: true, ...req.user });
    }

    res.status(401).json({ authorization: false });
};
