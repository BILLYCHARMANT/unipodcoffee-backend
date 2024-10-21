import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import prisma from "../db/prisma";
import { comparePassword } from "../service/bcrypt.service";
import { generateToken } from "../service/token.service";


passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, async (username, password, done) => {
  try {
    
    const userFound = await prisma.user.findFirst({
        where: {
          OR: [
            { email: username },
            { phoneNumber: username }
          ]
        }
      });

    if (!userFound) {
      return done(null, false);
    }

    const isPasswordValid = userFound.password ? await comparePassword(password, userFound.password) : false;

    if (!isPasswordValid) {
      return done(null, false);
    }
    
    const userData = await prisma.user.findFirst({ where: {id: userFound.id}});
    const {id, email, role, status} = userFound;

    const userDataPayLoad = {
      id,
      userId: userData?.id,
      email,
      role,
      status
    }

    const token = generateToken(userDataPayLoad);
    return done(null, { userFound: userFound, token });
  } catch (error) {
    return done(error);
  }
}))

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser(async (userInfo, done) => {
  try {
    const { id }= userInfo.userFound;
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
