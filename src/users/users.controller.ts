import { Controller, Get, Post, Body, Param, Delete, Put, Query, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { changePasswordDto } from './dto/change-password.dto';

@ApiTags('Users')
@Controller('/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  /**
   * Create a new user
   * @param dto - Data Transfer Object for creating a user
   * @returns The created user
   */
  @Post('/')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: UserDto })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async createUser(@Body() dto: UserDto) {
    return this.usersService.createUser(dto);
  }

  /**
   * Get all users
   * @returns An array of users
   */
  @Get('/')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  @ApiResponse({ status: 404, description: 'No users found.' })
  async getUsers() {
    return this.usersService.getUsers();
  }

  /**
   * Get user by ID
   * @param id - ID of the user
   * @returns The user with the given ID
   */
  @Get('/details/:id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the user' })
  @ApiResponse({ status: 200, description: 'Return user details by ID.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  /**
   * Update user by ID
   * @param id - ID of the user to update
   * @param data - Data for updating the user
   * @returns The updated user
   */
  @Put('/:id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the user' })
  @ApiBody({ type: UserDto })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async updateUser(@Param('id') id: number, @Body() data: UserDto) {
    return this.usersService.updateUser(id, data);
  }

  /**
     * Delete a list of users by IDs
     * @param id[] - An array of IDs of the users to delete
     * @returns A success message
     */
  @Delete('/')
  async deleteAllUsers(@Body('ids') ids: Array<number>) {
    return this.usersService.deleteAllUsers(ids);
  }

  /**
     * Delete user by ID
     * @param id - ID of the user to delete
     * @returns A success message
     */
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the user' })
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }

  /**
   * Search users
   * @param query - Search query
   * @returns An array of users matching the search query
   */
  @Get('/search')
  @ApiOperation({ summary: 'Search users' })
  @ApiQuery({ name: 'query', required: true, description: 'Search query' })
  @ApiResponse({ status: 200, description: 'Return search results for users.' })
  @ApiResponse({ status: 404, description: 'No users found.' })
  async searchUsers(@Query('query') query: string) {
    return this.usersService.searchUsers(query);
  }



  /**
   * Change user password
   * @param dto - Data Transfer Object for changing the password
   * @returns A success message
   */
  @Patch('/change-password')
  @ApiOperation({ summary: 'Change user password' })
  @ApiBody({ type: changePasswordDto })
  @ApiResponse({ status: 200, description: 'The password has been successfully changed.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async changePassword(@Body() dto: changePasswordDto) {
    return await this.usersService.changePassword(dto);
  }
}
