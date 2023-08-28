import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelper } from '../../../helpers/jwtHelper';
import { User } from '../user/user.model';
import {
  IChangePassword,
  ILoginResponse,
  ILoginUser,
  IRefreshTokenResponse,
} from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<ILoginResponse> => {
  const { id, password } = payload;

  //check user
  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
  }

  //check password
  const isPasswordMatched = await User.isPasswordMatched(
    password,
    isUserExist.password,
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access & refresh token

  const { id: userId, role, needsPasswordChange } = isUserExist;

  const accessToken = jwtHelper.createToken(
    {
      userId,
      role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelper.createToken(
    {
      userId,
      role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify refreshToken
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelper.verifyToken(
      token,
      config.jwt.refresh_secret as Secret,
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token!');
  }

  const { userId } = verifiedToken;

  //check user
  const isUserExist = await User.isUserExist(userId);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Doesn't Exist!");
  }

  //generate accessToken
  const newAccessToken = jwtHelper.createToken(
    {
      userId: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword,
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  //check user
  const isUserExist = await User.findOne({ id: user?.userId }).select(
    '+password',
  );

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not found!');
  }

  //check old password
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect!');
  }

  //set new password
  isUserExist.password = newPassword;
  isUserExist.needsPasswordChange = false;

  // updating using save()
  isUserExist.save();
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
};

//different technique for hashing & change password

//hash password before saving
// const newHashedPassword = await bcrypt.hash(
//   newPassword,
//   Number(config.bycrypt_salt_rounds)
// );

// const query = { id: user?.userId };
// const updatedData = {
//   password: newHashedPassword,  //
//   needsPasswordChange: false,
//   passwordChangedAt: new Date(), //
// };

// await User.findOneAndUpdate(query, updatedData);
