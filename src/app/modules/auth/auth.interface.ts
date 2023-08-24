export type ILoginUser = {
  id: string;
  password: string;
};

export type IUserResponse = {
  accessToken: string;
  refreshToken: string;
  needsPasswordChange: boolean;
};
