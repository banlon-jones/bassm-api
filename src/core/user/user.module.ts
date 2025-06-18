import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema}])
  ],
  exports: [UserService],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
