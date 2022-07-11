import { ClassSerializerInterceptor, Controller, Req, UseGuards, UseInterceptors, Put, Body, Inject, Get, Param, Post, Delete } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '@/api/user/auth/auth.guard';
import { UpdateUserDto, UpdatePassword } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  @Get('all')
  @UseGuards(JwtAuthGuard)
  getProfiles() {
      return this.service.getProfiles();
  }

  @Get('byName')
  @UseGuards(JwtAuthGuard)
  getByName() {
    return this.service.getByName();
  }

  @Get('byId')
  @UseGuards(JwtAuthGuard)
  getByIdAll() {
    return this.service.getByIdAll();
  }

  @Post('byEmail')
  @UseGuards(JwtAuthGuard)
  getByEmail(@Body('email') email: string) {
      return this.service.getByEmail(email);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getById(@Param('id') id: number) {
      return this.service.getById(id)
  }

  @Put('update')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private updateUser(@Body() body: UpdateUserDto, @Req() req: Request): Promise<User> {
    return this.service.updateUser(body, req);
  }

  @Put('updateAdmin')
  @UseGuards(JwtAuthGuard)
  private updateAdmin(@Body() body: UpdateUserDto) {
    return this.service.updateAdmin(body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteUsers(@Param('id') id: number) {
    return this.service.deleteUsers(id);
  }

  @Put('password')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private updatePassword(@Body() body: UpdatePassword, @Req() req: Request): Promise<User> {
    return this.service.UpdatePassword(body, req)
  }
}
