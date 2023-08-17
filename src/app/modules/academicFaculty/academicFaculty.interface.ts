import { Model } from 'mongoose';

export const academicFacultyFilterableFields = ['searchTerm', 'title'];

export const academicFacultySearchableFields = ['title'];

export type IPaginationFilters = {
  searchTerm?: string;
};

export type IAcademicFaculty = {
  title: string;
};

export type AcademicFacultyModel = Model<IAcademicFaculty>;
