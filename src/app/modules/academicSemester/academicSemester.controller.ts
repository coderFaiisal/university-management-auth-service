import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AcademicSemisterService } from './academicSemester.service';

const createSemester: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemisterService.createSemester(
      academicSemesterData,
    );
    res.status(200).json({
      success: true,
      message: 'Academic semester created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AcademicSemesterController = {
  createSemester,
};
