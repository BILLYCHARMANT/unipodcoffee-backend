import dotenv from 'dotenv';
import Jwt from "jsonwebtoken";

dotenv.config();

const generateToken = (data) => {
    const token = Jwt.sign({ data }, process.env.JWT_SECRET, {
        expiresIn: process.env.EXPIRE_TIME,
    });
    return token;
};

const generateEmailVerificationToken = (data) => {
    const token = Jwt.sign({ data }, process.env.JWT_VERIF_SECRET , {
        expiresIn: process.env.EXPIRE_VERIF_TIME,
    });
    return token;
};

const generateForgotPasswordToken = (data) => {
    const token = Jwt.sign({ data }, process.env.JWT_SECRET);
    return token;
};

const verifyToken = (token, type) => {
    if (type === "verify-email") {
        return Jwt.verify(token, process.env.JWT_VERIF_SECRET, (err, decoded) => {
            if (err) {
                return err;
            }
            return decoded;
        });
    }

    return Jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return err;
        }
        return decoded;
    });
};

export { generateToken, generateEmailVerificationToken, verifyToken, generateForgotPasswordToken };
