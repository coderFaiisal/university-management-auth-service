import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelper } from '../../helpers/jwtHelper';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      let varifiedUser = null;
      try {
        varifiedUser = jwtHelper.verifyToken(
          token,
          config.jwt.secret as Secret,
        );
      } catch (error) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Token!');
      }
      console.log(varifiedUser, requiredRoles);

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
