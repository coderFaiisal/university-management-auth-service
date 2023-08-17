import { Model } from 'mongoose';

export type IPaginationFilters = {
  searchTerm?: string;
};

export type IAcademicFaculty = {
  title: string;
};

export type AcademicFacultyModel = Model<
  IAcademicFaculty,
  Record<string, unknown>
>;
