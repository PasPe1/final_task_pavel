import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { UpdateUserDto, UpdatePassword } from './user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  getProfiles() {
    return this.repository.find();
  }

  async getByName() {
    return await this.repository.find({
      order: {
          nick_name: 'ASC'
      }
    })
  }

  async getByIdAll() {
    return await this.repository.find({
        order: {
            id: 'ASC'
        }
    })
  }

  async getById(id: number) {
    const user = await this.repository.findOne({ where: {id}});
    if (user) {
      return user;
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
  }

  async getByEmail(email: string) {
    const user = await this.repository.findOne({ where: {email}});
    if (user) {
      return user;
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }

  public async updateUser(body: UpdateUserDto, req: Request): Promise<User> {
    const { nick_name, email, last_name, first_name, description, position, img, phone_number, role  }: UpdateUserDto = body;
    const user: User = <User>req.user;

    console.log(user);

    user.nick_name = nick_name;
    user.description = description;
    user.email = email;
    user.first_name = first_name;
    user.img = img;
    user.phone_number = phone_number;
    user.position = position;
    user.last_name = last_name;
    user.role = role;

    return this.repository.save(user);
  }

  async deleteUsers(id: number): Promise<void> {
     await this.repository.delete(id);
  }

  async UpdatePassword(body: UpdatePassword, req: Request): Promise<User> {
    const {password}: UpdatePassword = body
    const user: User = <User>req.user;

    const salt: string = bcrypt.genSaltSync(10);

    const passwordH = bcrypt.hashSync(password, salt);
      user.password = passwordH;
    return this.repository.save(user);
  }

  public async updateAdmin(body: UpdateUserDto) {
    const { id }: UpdateUserDto = body;
    return this.repository.update({id}, body)
  }
}
