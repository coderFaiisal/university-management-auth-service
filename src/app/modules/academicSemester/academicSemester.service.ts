import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { AcademicSemesterTitleCodeMapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createSemester = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester> => {
  //check semester code validation
  if (AcademicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code');
  }

  const semester = await AcademicSemester.create(payload);
  return semester;
};

export const AcademicSemisterService = {
  createSemester,
};
