export interface Attendance {
  studentId: string; // Reference to the student
  lessonId: string; // Reference to the lesson
  academyYearId: string; // Reference to the academy year
  type: 'CLASS' | 'OUTREACH' | 'MISSION'
  date: Date; // Date of the attendance
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED'; // Attendance status
  catchUpLink?: string; // Optional link for catch-up sessions
}
