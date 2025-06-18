export interface Fee {
  name: string;
  description?: string;
  amount: number;
  feeType: 'TUITION' | 'OTHER';
  isOptional?: boolean;
}