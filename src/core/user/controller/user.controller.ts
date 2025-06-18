import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDTO } from '../dto/createUserDTO';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { QueryDTO } from '../../../commons/types/queryDTO';

@ApiTags("User")
@Controller('api/private/user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBearerAuth()
  @Post('/add-user')
  async addStaff(@Res() res, @Body() createUserDTO: CreateUserDTO) {
    try {
      const newUser = await this.userService.createStaff(createUserDTO);
      return res.status(201).json({
        message: 'user added successfully',
        user: newUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error adding user',
        error: error.message,
      });
    }
  }

  @Get('/get-all-staff')
  async getAllStaff(@Res() res, @Query() query: QueryDTO) {
    try {
      const staff = await this.userService.getAllStaff(query);
      return res.status(200).json({
        message: 'Staff retrieved successfully',
        staff: staff,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error retrieving staff',
        error: error.message,
      });
    }
  }

  @Get('/:id')
  async getUserById(@Res() res, @Param('id') id: string) {
    try {
      const user = await this.userService.getUserById(id);
      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        });
      }
      return res.status(200).json({
        message: 'User retrieved successfully',
        user: user,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error retrieving user',
        error: error.message,
      });
    }
  }

  @Put("/:id")
  async updateUser(@Res() res, @Param('id') id: string, @Body() updateUserDTO: Partial<CreateUserDTO>) {
    try {
      const updatedUser = await this.userService.updateUser(id, updateUserDTO);
      if (!updatedUser) {
        return res.status(404).json({
          message: 'User not found',
        });
      }
      return res.status(200).json({
        message: 'User updated successfully',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error updating user',
        error: error.message,
      });
    }
  }

  @Delete("/:id")
  async disableUser(@Res() res, @Param('id') id: string) {
    try {
      const result = await this.userService.disableUser(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        message: 'Error disabling user',
        error: error.message,
      });
    }
  }
}
