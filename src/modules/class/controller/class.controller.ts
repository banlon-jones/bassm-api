import { Body, Controller, Get, Param, Post, Put, Query, Res } from '@nestjs/common';
import { ClassService } from '../service/class.service';
import { CreateClassDTO } from '../dto/createClassDTO';
import { AssignStudentToClassDTO } from '../dto/assignStudentToClassDTO';

@Controller('api/private/class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post('/create')
  async createClass(@Res() res, @Body() createClassDTO: CreateClassDTO) {
    try {
      const newClass = await this.classService.createClass(createClassDTO);
      return res.status(201).json({
        message: 'Class created successfully',
        class: newClass,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error creating class',
        error: error.message,
      });
    }
  }

  @Get('/get-all')
  async getAllClasses(@Res() res, @Query() query: any) {
    try {
      const classes = await this.classService.getAllClasses(query);
      return res.status(200).json({
        message: 'Classes retrieved successfully',
        ...classes,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error retrieving classes',
        error: error.message,
      });
    }
  }

  @Get('/:id')
  async getClassById(@Res() res, @Param('id') id: string) {
    try {
      const classObj = await this.classService.getClassById(id);
      if (!classObj) {
        return res.status(404).json({
          message: 'Class not found',
        });
      }
      return res.status(200).json({
        message: 'Class retrieved successfully',
        class: classObj,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error retrieving class',
        error: error.message,
      });
    }
  }

  @Put("/:id")
  async updateClass(@Res() res, @Param('id') id: string, @Body() updateClassDTO: CreateClassDTO) {
    try {
      const updatedClass = await this.classService.updateClass(id, updateClassDTO);
      if (!updatedClass) {
        return res.status(404).json({
          message: 'Class not found',
        });
      }
      return res.status(200).json({
        message: 'Class updated successfully',
        class: updatedClass,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error updating class',
        error: error.message,
      });
    }
  }

  @Post('/:classId/assign-student')
  async assignStudentToClass(
    @Res() res,
    @Body() assignStudent: AssignStudentToClassDTO
  ) {
    try {
      const result = await this.classService.assignStudentToClass( assignStudent.classId, assignStudent.studentId, assignStudent.academyYearId);
      if (!result) {
        return res.status(400).json({ message: 'Assignment failed. Check IDs.' });
      }
      return res.status(201).json({ message: 'Student assigned to class', assignment: result });
    } catch (error) {
      return res.status(500).json({ message: 'Error assigning student', error: error.message });
    }
  }

  @Get('/:classId/students')
  async getStudentsInClassAndAcademyYear(
    @Res() res,
    @Param('classId') classId: string,
    @Query('academyYearId') academyYearId: string
  ) {
    try {
      const students = await this.classService.getStudentsInClassAndAcademyYear(classId, academyYearId);
      return res.status(200).json({ message: 'Students retrieved', students });
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving students', error: error.message });
    }
  }

  // Update a student's enrollment status in a class for a given academy year
  @Put('/:classId/student/:studentId/status')
  async updateStudentClassStatus(
    @Res() res,
    @Param('classId') classId: string,
    @Param('studentId') studentId: string,
    @Query('academyYearId') academyYearId: string,
    @Body('status') status: 'enrolled' | 'completed' | 'dropped'
  ) {
    try {
      const updated = await this.classService.updateStudentClassStatus(classId, studentId, academyYearId, status);
      if (!updated) {
        return res.status(404).json({ message: 'Enrollment not found' });
      }
      return res.status(200).json({ message: 'Enrollment status updated', enrollment: updated });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating status', error: error.message });
    }
  }

  // Update a student's assigned class for a given academy year
  @Put('/student/:studentId/class')
  async updateStudentClass(
    @Res() res,
    @Param('studentId') studentId: string,
    @Query('academyYearId') academyYearId: string,
    @Body('classId') classId: string
  ) {
    try {
      const updated = await this.classService.updateStudentClass(studentId, academyYearId, classId);
      if (!updated) {
        return res.status(404).json({ message: 'Enrollment not found' });
      }
      return res.status(200).json({ message: 'Student class updated', enrollment: updated });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating class', error: error.message });
    }
  }


  @Get('/student/:studentId/class')
  async getStudentClasses(
    @Res() res,
    @Param('studentId') studentId: string
  ) {
    try {
      const classes = await this.classService.getStudentClasses(studentId);
      if (!classes || classes.length === 0) {
        return res.status(404).json({ message: 'No classes found for this student' });
      }
      return res.status(200).json({ message: 'Student classes retrieved', classes });
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving student classes', error: error.message });
    }
  }

  @Get('/student/:studentId/class-by-academy-year')
  async getStudentClassByStudentIdAndAcademyYearId(
    @Res() res,
    @Param('studentId') studentId: string,
    @Query('academyYearId') academyYearId: string
  ) {
    try {
      const result = await this.classService.getStudentClassByStudentIdAndAcademyYearId(studentId, academyYearId);
      return res.status(200).json({ message: 'Student class retrieved', class: result });
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving student class', error: error.message });
    }
  }


}
