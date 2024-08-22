import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { UsersDbRepository } from './users-db.repository';
import { User, Prisma } from '@prisma/client';
import { UserDto } from '../../users/dto/user.dto';
import { MESSAGES } from '../../common/response/response-messages';
import { hashPassword } from '../../auth/helpers/auth.helpers';
import { changePasswordDto } from '../../users/dto/change-password.dto';

@Injectable()
export class UsersDbService {
  constructor(private readonly usersDbRepository: UsersDbRepository) { }

  /**
   * Create a new user
   * @param dto - Data Transfer Object for creating a user
   * @returns The created user
   */
  async createUser(dto: UserDto): Promise<User> {
    try {
      const existingUser = await this.usersDbRepository.findUserByEmail(dto.email);
      if (existingUser) {
        throw new ConflictException(MESSAGES.USER.EMAIL_ERROR);
      }

      // Hash the password before saving the user
      const hashedPassword = await hashPassword(dto.password);
      const userData = {
        ...dto,
        password: hashedPassword,
      };

      return await this.usersDbRepository.createUser(userData);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException(MESSAGES.USER.FAILED_TO_CREATE);
    }
  }

  /**
   * Get all users
   * @returns An array of users
   */
  async getUsers(): Promise<User[]> {
    try {
      return await this.usersDbRepository.getUsers();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(MESSAGES.USER.FAILED_TO_GET);
    }
  }

  /**
   * Get user by ID
   * @param id - ID of the user
   * @returns The user with the given ID
   */
  async getUserById(id: number): Promise<User> {
    try {
      const user = await this.usersDbRepository.getUserById(id);
      if (!user) {
        throw new NotFoundException(MESSAGES.USER.NOT_FOUND);
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(MESSAGES.USER.FAILED_TO_GET);
    }
  }

  /**
   * Update a user by ID
   * @param id - ID of the user to update
   * @param data - Data for updating the user
   * @returns The updated user
   */
  async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    await this.getUserById(id);
    try {
      const user = await this.usersDbRepository.updateUser(id, data);
      if (!user) {
        throw new NotFoundException(MESSAGES.USER.NOT_FOUND);
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(MESSAGES.USER.FAILED_TO_UPDATE);
    }
  }

  /**
   * Delete a user by ID
   * @param id - ID of the user to delete
   * @returns The deleted user
   */
  async deleteUser(id: number): Promise<User> {
    await this.getUserById(id);
    try {
      const user = await this.usersDbRepository.deleteUser(id);
      if (!user) {
        throw new NotFoundException(MESSAGES.USER.NOT_FOUND);
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(MESSAGES.USER.FAILED_TO_DELETE);
    }
  }

  async deleteAllUsers(ids: Array<number>): Promise<Prisma.BatchPayload> {
    try {
      const delete_obj = await this.usersDbRepository.deleteAllUsers(ids);
      if (delete_obj.count == 0) {
        throw new NotFoundException(MESSAGES.USER.FAILED_TO_DELETE);
      }
      return delete_obj;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(MESSAGES.USER.FAILED_TO_DELETE);
    }
  }

  /**
    * Search users by query
    * @param query - Query to search users by email or name
    * @returns An array of users matching the query
    */
  async searchUsers(query: string): Promise<User[]> {
    try {
      return await this.usersDbRepository.searchUsers(query);
    } catch (error) {
      throw new InternalServerErrorException(MESSAGES.USER.FAILED_TO_GET);
    }
  }


  /**
   * Change the password of a user
   * @param dto - Data Transfer Object for changing the password
   * @returns The result of the password change operation
   */
  async changePassword(dto: changePasswordDto): Promise<any> {
    try {
      // Validate email
      if (!dto.email) {
        throw new BadRequestException('Email is a required field');
      }
      // Validate password
      if (!dto.password) {
        throw new BadRequestException('Password is a required field');
      }
      // Hash the new password
      const hashedPassword = await hashPassword(dto.password);
      dto.password = hashedPassword;
      return await this.usersDbRepository.changePassword(dto);
    } catch (error) {
      throw new InternalServerErrorException(MESSAGES.USER.FAILED_TO_GET);
    }
  }
}
