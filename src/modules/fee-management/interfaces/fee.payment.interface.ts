export interface FeePayment {
  student: string; // Reference to the student
  fee: string; // Reference to the fee
  academyYear: string; // Reference to the academy year
  amountPaid: number; // Amount paid by the student
  paymentDate?: Date; // Date of the payment
  paymentMethod: 'CASH' | 'BANK_TRANSFER' | 'ONLINE' | 'MOMO' | 'OMO'; // Method of payment
}
