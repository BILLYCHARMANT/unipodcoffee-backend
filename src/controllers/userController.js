import { StatusCodes } from "http-status-codes";
import prisma from "../db/prisma";
import { generateEmailVerificationToken, generateForgotPasswordToken, verifyToken } from "../service/token.service";
import { Roles } from "../util/enum/Roles.enum";
import { hashPassword } from "../service/bcrypt.service";
import { sendEmail } from "../service/sendEmail.service";
import generatePasswordFromUsername from "../service/passwordGenerator.service";



export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, gender, phoneNumber } = req.body;
        const RequestUser = req.user.data;
        let role;

        const emailExist = await prisma.user.findUnique({ where: { email } });
        const phoneExist = await prisma.user.findUnique({ where: { phoneNumber } });

        if (emailExist) {
            
            return res.status(StatusCodes.BAD_REQUEST).json({status: StatusCodes.BAD_REQUEST, message: "An account with this email address already exists."});
            
        }

        if (phoneExist) {
            return res.status(StatusCodes.BAD_REQUEST).json({status: StatusCodes.BAD_REQUEST, message: "An account with this phone address already exists."});
        }

        if (RequestUser.role === Roles.SUPERADMIN) {
            role = Roles.ADMIN
        }
        else{
            role = Roles.STOCK_MANAGER
        }

        const username = firstName + lastName;
        const password = generatePasswordFromUsername(username);

        const userAccount = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                phoneNumber,
                role,
                gender,
                password: await hashPassword(password)
            }
        });

        // const verificationToken = generateEmailVerificationToken({ userId: userAccount.id });

        // const verificationUrl = `http://yourdomain.com/verify-email?token=${verificationToken}`;

        const emailMessage = `Welcome to Unipod \n Here is the credentials for your account: \n  username: ${userAccount.email} \n password: ${password}`;

        await sendEmail(email, 'UNIPOD Account credentials', emailMessage);

        return res.status(StatusCodes.CREATED).json({status: StatusCodes.CREATED, message: `Registration successful. Please ${firstName} can check inbox📩 email to get account credentials.`, data: userAccount});

    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: StatusCodes.INTERNAL_SERVER_ERROR, error: 'Server error' });
    }
}