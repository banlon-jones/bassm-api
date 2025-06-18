export class CreateFirebaseUserDto {
  email: string;
  password: string;
  displayName?: string;
  emailVerified?: boolean;
  phoneNumber?: string;
  photoURL?: string;
  disabled?: boolean;
}