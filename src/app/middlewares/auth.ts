import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { TUserRole } from '../modules/User/user.interface';
import status from 'http-status';
import { verifyToken } from '../modules/Auth/auth.utils';
import config from '../config';
import User from '../modules/User/user.model';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../errors/AppError';

const auth = (...requireRoles: TUserRole[]) => {
  // console.log(requireAuth);
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    console.log('token', token);

    //check if the token is sent from client
    if (!token) {
      throw new AppError(status.UNAUTHORIZED, 'You are not authorized');
    }

    //check if the token is valid

    // const decoded = jwt.verify(
    //   token,
    //   config.jwt_access_secret as string,
    // ) as JwtPayload;

    const decoded = verifyToken(token, config.jwt_access_secret as string);
    console.log('decoded from auth.ts', decoded);

    // const role = decoded.role;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { emailOrPhone, role, iat } = decoded;

    //check if user is exist
    const user = await User.isUserExistByEmailOrPhone(emailOrPhone);

    if (!user) {
      throw new AppError(status.NOT_FOUND, '🔍❓ User not Found');
    }

    if (requireRoles && !requireRoles.includes(role)) {
      throw new AppError(status.UNAUTHORIZED, 'You are not authorized');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};
export default auth;
