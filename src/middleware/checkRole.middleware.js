import { StatusCodes } from 'http-status-codes';
import prisma from '../db/prisma';

const checkRole = (requiredRoles) => {
    return async (req, res, next) => {
        try {
            const userId = req.user.data.id;

            const user = await prisma.user.findUnique({ where: {id: userId}});
            

            if (!user || !requiredRoles.includes(user.role)) {
                return res.status(StatusCodes.FORBIDDEN).json({ message: 'Forbidden' });
            }


            next();
        } catch (error) {
            
            res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorize' });
        }
    };
};

export default checkRole;

