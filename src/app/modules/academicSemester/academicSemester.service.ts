import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createSemester = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester> => {
  const semester = await AcademicSemester.create(payload);
  return semester;
};

export const AcademicSemisterService = {
  createSemester,
};
