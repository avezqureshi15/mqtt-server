import { Body, Injectable } from '@nestjs/common';
import { UsersDbService } from '../db/users/users-db.service';
import { Prisma, User } from '@prisma/client';
import { ResponseUtil } from '../common/response/response.util';
import { UserDto } from './dto/user.dto';
import { MESSAGES } from '../common/response/response-messages';
import { changePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersDbService: UsersDbService) { }

  /**
   * Create a new user
   * @param dto - Data Transfer Object for creating a user
   * @returns The response containing the created user and a success message
   */
  async createUser(dto: UserDto) {
    const user = await this.usersDbService.createUser(dto);
    return ResponseUtil.success(user, MESSAGES.USER.CREATED);
  }

  /**
   * Get all users
   * @returns The response containing an array of users and a success message
   */
  async getUsers() {
    const users = await this.usersDbService.getUsers();
    return ResponseUtil.success(users, MESSAGES.USER.FETCHED);
  }

  /**
   * Get user by ID
   * @param id - ID of the user
   * @returns The response containing the user with the given ID and a success message or an error message if not found
   */
  async getUserById(id: number) {
    const user = await this.usersDbService.getUserById(id);
    return user ? ResponseUtil.success(user, MESSAGES.USER.FETCHED) : ResponseUtil.error('User not found', 404);
  }

  /**
   * Update a user by ID
   * @param id - ID of the user to update
   * @param data - Data for updating the user
   * @returns The response containing the updated user and a success message
   */
  async updateUser(id: number, data: Prisma.UserUpdateInput) {
    const user = await this.usersDbService.updateUser(id, data);
    return ResponseUtil.success(user, MESSAGES.USER.UPDATED);
  }

  /**
   * Delete a user by ID
   * @param id - ID of the user to delete
   * @returns The response containing a success message
   */
  async deleteUser(id: number) {
    await this.usersDbService.deleteUser(id);
    return ResponseUtil.success(null, MESSAGES.USER.DELETED);
  }

  /**
  * Delete all users by an array of IDs
  * @param id[] - IDs of all the users to delete
  * @returns The response containing a success message
  */
  async deleteAllUsers(ids: Array<number>) {
    const deleted_obj = await this.usersDbService.deleteAllUsers(ids);
    return ResponseUtil.success(null, `${deleted_obj.count} ${MESSAGES.USER.DELETED_MULTIPLE}`);
  }

  /**
    * Search users by query
    * @param query - Query to search users by email or name
    * @returns The response containing an array of users matching the query and a success message
    */
  async searchUsers(query: string) {
    const users = await this.usersDbService.searchUsers(query);
    return ResponseUtil.success(users, MESSAGES.USER.FETCHED);
  }


  /**
   * Change the password of a user
   * @param dto - Data Transfer Object for changing the password
   * @returns The response containing the result of the password change operation and a success message
   */
  async changePassword(@Body() dto: changePasswordDto) {
    const result = await this.usersDbService.changePassword(dto);
    return ResponseUtil.success(result, MESSAGES.USER.FETCHED);
  }
}
