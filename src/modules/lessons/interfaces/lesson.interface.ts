export interface Lesson {
  title: string; // Title of the lesson
  description?: string; // Description of the lesson
  class: string; // Reference to the class
  content: string; // Content of the lesson, could be a URL or text
  createdBy: string; // Reference to the user who created the lesson
  duration: number; // Duration of the lesson in minutes
  assignedTo?: string[]; // Array of staff IDs to whom the lesson is assigned
}