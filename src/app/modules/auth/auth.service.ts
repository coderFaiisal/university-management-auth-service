import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';

const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;
  const user = new User();

  //check user
  const isExist = await user.isUserExist(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
  }

  //check password
  const isPasswordMatched =
    isExist.password && user.isPasswordMatched(password, isExist.password);

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }
};

export const AuthService = {
  loginUser,
};
