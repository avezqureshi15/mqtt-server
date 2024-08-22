import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { UserDto } from '../../users/dto/user.dto';
import { changePasswordDto } from '../../users/dto/change-password.dto';

@Injectable()
export class UsersDbRepository {
  constructor(private readonly prisma: PrismaService) { }

  /**
   * Create a new user
   * @param data - Data for creating a new user
   * @returns The created user
   */
  async createUser(data: UserDto): Promise<User> {
    return this.prisma.user.create({ data });
  }

  /**
   * Get all users
   * @returns An array of users
   */
  async getUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  /**
   * Get user by ID
   * @param id - ID of the user
   * @returns The user with the given ID or null if not found
   */
  async getUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  /**
   * Update a user by ID
   * @param id - ID of the user to update
   * @param data - Data for updating the user
   * @returns The updated user
   */
  async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  /**
   * Delete a user by ID
   * @param id - ID of the user to delete
   * @returns The deleted user
   */
  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
  /**
    * Delete a list of users
    * @param id[] - An array of ID of the users to delete
    * @returns The deleted users
    */
  async deleteAllUsers(ids: Array<number>): Promise<Prisma.BatchPayload> {
    return this.prisma.user.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    });
  }
  /**
   * Find a user by email
   * @param email - Email of the user to find
   * @returns The user with the given email or null if not found
   */
  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  /**
   * Search users by query
   * @param query - Query to search users by email or name
   * @returns An array of users matching the query
   */
  async searchUsers(query: string): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        OR: [
          {
            email: {
              contains: query,
              mode: 'insensitive', // Case insensitive search
            },
          },
          {
            name: {
              contains: query,
              mode: 'insensitive', // Case insensitive search
            },
          },
        ],
      },
    });
  }


  /**
   * Change the password of a user
   * @param dto - Data for changing the password
   * @returns The result of the password change operation
   */
  async changePassword(dto: changePasswordDto): Promise<any> {
    return this.prisma.user.update({
      where: {
        email: dto.email,
      },
      data: { password: dto.password },
    });
  }
}
