import bcrypt from "bcrypt";

const hashPassword = (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds)
}

const comparePassword = (password, hashPassword) => {
    return bcrypt.compare(password, hashPassword);
}

export {hashPassword, comparePassword}