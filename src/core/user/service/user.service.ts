import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../intefaces/user.interface';
import { CreateUserDTO } from '../dto/createUserDTO';
import { QueryDTO } from '../../../commons/types/queryDTO';
import { firebaseApp } from '../../../config/firebaseConfig';
import { getAuth, UserRecord } from 'firebase-admin/auth';
import { CreateFirebaseUserDto } from '../dto/createFirebaseUser';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  async createStaff(createUserDTO: CreateUserDTO) {
    try {
      const user: CreateFirebaseUserDto = {
        email: createUserDTO.email,
        password: `${process.env.DEFAULT_PWD}`,
        displayName: createUserDTO.name,
        phoneNumber: createUserDTO.phone_number,
      };
      const userRecord: UserRecord | undefined = await this.registerUserOnFirebase(user);
      const newUser = new this.userModel({...createUserDTO, uid: userRecord?.uid});
      return await newUser.save();
    } catch (e) {
      console.log(e);
    }
  }

  async getAllStaff(query: QueryDTO) {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;

    let filterCondition: any = { role: `STAFF` };
    if (search) {
      filterCondition.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
        { street_address: { $regex: search, $options: 'i' } },
      ];
    }

    const [staff, total] = await Promise.all([
      this.userModel
        .find(filterCondition)
        .skip(skip)
        .limit(limit)
        .sort('createdAt')
        .exec(),
      this.userModel.countDocuments(filterCondition).exec(),
    ]);

    return {
      staff,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getUserById(id: string){
    return await this.userModel.findById(id).exec();
  }

  async updateUser(id: string, updateUserDTO: Partial<CreateUserDTO>) {
    return await this.userModel.findByIdAndUpdate(id, updateUserDTO).exec();
  }

  async registerUserOnFirebase(createFirebaseUserDTO: CreateFirebaseUserDto) {
    const auth = getAuth(firebaseApp);
    try {
      return await auth.createUser(createFirebaseUserDTO);
    } catch (e) {
      console.log(`Error creating user on Firebase: ${e.message}`);
    }
  }

  async disableUser(userId: string) {
    const user = await this.getUserById(userId)
    const auth = getAuth(firebaseApp);
    if (user){
      try {
        await auth.updateUser(user?.uid, { disabled: true });
        return { message: 'User disabled successfully' };
      } catch (error) {
        throw new Error(`Failed to disable user: ${error.message}`);
      }
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      if (user) {
        return user;
      }
    }catch (e) {
      console.log(`Error fetching user by email: ${e.message}`);
    }
  }
}
