import config from '../../../config';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';

const createStudent = async (
  student: IStudent,
  user: IUser,
): Promise<IUser | null> => {
  //default password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }

  const createdStudent = await User.create(user);
  if (!createdStudent) {
    throw new Error('Failed to create student');
  }
  return createdStudent;
};

export const UserService = {
  createStudent,
};
