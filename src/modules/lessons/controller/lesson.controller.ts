import { Body, Controller, Get, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { LessonsService } from '../services/lessons.service';
import { CreateLessonDto } from '../dtos/create.lesson.dto';

@Controller('api/private/lesson')
export class LessonController {
  constructor(private lessonService: LessonsService) {}

  @Post()
  async createLesson(@Res() res: any,@Req() req: any, @Body() createLessonDto: CreateLessonDto) {
    try {
      const lesson = await this.lessonService.createLesson(req,createLessonDto);
      return res.status(HttpStatus.CREATED).json({ message: 'Lesson created', lesson });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Put(':id')
  async updateLesson(
    @Res() res: any,
    @Param('id') id: string,
    @Body() updateLessonDto: Partial<CreateLessonDto>
  ) {
    try {
      const lesson = await this.lessonService.updateLesson(id, updateLessonDto);
      return res.status(HttpStatus.OK).json({ message: 'Lesson updated', lesson });
    } catch (error) {
      return res.status(error.status || HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Get()
  async getAllLessons(@Res() res: any) {
    try {
      const lessons = await this.lessonService.getAllLessons();
      return res.status(HttpStatus.OK).json({ lessons });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Get(':id')
  async getLesson(@Res() res: any, @Param('id') id: string) {
    try {
      const lesson = await this.lessonService.getLesson(id);
      return res.status(HttpStatus.OK).json({ lesson });
    } catch (error) {
      return res.status(error.status || HttpStatus.NOT_FOUND).json({ message: error.message });
    }
  }

  @Get('teacher/:teacherId')
  async getLessonsByTeacher(@Res() res: any, @Param('teacherId') teacherId: string) {
    try {
      const lessons = await this.lessonService.getLessonsByTeacher(teacherId);
      return res.status(HttpStatus.OK).json({ lessons });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

}
