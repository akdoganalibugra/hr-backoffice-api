import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { UserResponse } from '../common/types/user.types';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(): Promise<UserResponse[]> {
    const users: UserResponse[] = await this.db.user.findMany();
    return users;
  }

  async findOne(id: string): Promise<UserResponse> {
    const user = await this.db.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user as UserResponse;
  }

  async update(
    id: string,
    updateUserDto: Prisma.UserUpdateInput,
  ): Promise<UserResponse> {
    const updatedUser: UserResponse = await this.db.user.update({
      where: { id },
      data: updateUserDto,
    });

    return updatedUser;
  }

  async remove(id: string): Promise<{ message: string }> {
    await this.db.user.delete({
      where: { id },
    });

    return { message: 'User deleted successfully' };
  }
}
