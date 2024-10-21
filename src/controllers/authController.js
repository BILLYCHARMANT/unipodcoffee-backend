import { StatusCodes } from "http-status-codes";
import passportLocal from "../config/passportLocal";
import templateMails from "../util/templateMails";
import { generateForgotPasswordToken } from "../service/token.service";
import prisma from "../db/prisma";

export const userLogin = (req, res, next) => {
  passportLocal.authenticate("local", (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({
          status: StatusCodes.BAD_REQUEST,
          message: "Invalid email or password",
        });
    }
    try {
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(StatusCodes.OK).json({
          message: "Login successful",
          user,
        });
      });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          status: ReasonPhrases.INTERNAL_SERVER_ERROR,
          error: "Server error",
        });
    }
  })(req, res, next);
};

export const forgotPassword = async(req, res) => {
    const {email}= req.body
    const user = await prisma.findUnique({where: { email }});
    
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: 'User with email does not exist!',
        });
      }
    const userMeta = {
        email,
        id: user.id
    }
    const verifToken = generateForgotPasswordToken(userMeta);
    const emailBody = templateMails.ForgortPasswordTemplate(verifToken);
    await sendEmail(email, "Reset password link", emailBody);
    return res
      .status(StatusCodes.OK)
      .json({ message: `we have sent password reset link to your email 📩 ${email}` });
    };