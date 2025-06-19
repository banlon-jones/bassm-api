import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PreAuthMiddleware } from './commons/middlewares/preAuth.middleware';
import { UserModule } from './core/user/user.module';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassModule } from './modules/class/class.module';
import { AcademyYearModule } from './modules/academy-year/academy-year.module';
import { FeeManagementModule } from './modules/fee-management/fee-management.module';
import { LessionsModule } from './modules/lessons/lessions.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './commons/guards/roles/roles.guard';
dotenv.config();

@Module({
  imports: [
  MongooseModule.forRoot(`${process.env.MONGODB_URI}`, {
  }),
    UserModule,
    ClassModule,
    AcademyYearModule,
    FeeManagementModule,
    LessionsModule,
    AttendanceModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },

  ],
})
export class AppModule implements NestModule {
  configure(consumer: any) {
    consumer.apply(PreAuthMiddleware)
      .forRoutes('/api/private/*'); // Apply the middleware to all routes
  }
}
