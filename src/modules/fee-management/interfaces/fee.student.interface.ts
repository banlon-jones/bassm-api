export interface FeeStudent {
  fee: string; // Reference to the fee
  student: string; // Reference to the student
  academyYear: string; // Reference to the academy year
  dueDate?: Date; // Due date for the fee payment
}