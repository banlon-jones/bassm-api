export class CreateLessonDto {
  title: string; // Title of the lesson
  description?: string; // Optional description of the lesson
  content: string; // Main content of the lesson, could be text, HTML, etc.
  duration: number; // Duration of the lesson in minutes
  academyYearId: string; // Reference to the academy year
  classId: string; // Reference to the class this lesson belongs to
  teacherId: string; // Reference to the teacher who created or is responsible for this lesson
}