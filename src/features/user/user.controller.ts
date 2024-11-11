import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreatedUserDto, CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiCreatedResponse,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
@UsePipes(new ValidationPipe())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({
    type: CreatedUserDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Missing required fields in the request body.',
  })
  @ApiBody({
    description: 'The user data to create a user.',
    type: CreateUserDto,
  })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved users.',
    type: [CreatedUserDto],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error while retrieving users.',
  })
  findAll() {
    return this.userService.findAllOmit();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User found.',
    type: CreatedUserDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid user ID format (not a valid UUID).',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found with the provided ID.',
  })
  @ApiParam({ name: 'id', description: 'ID of the user' })
  findOne(id: string) {
    return this.userService.findOneOmit(id);
  }

  @Put(':id')
  @ApiBody({
    description: 'The user data to update the users password.',
    type: UpdatePasswordDto,
  })
  @ApiOperation({ summary: 'Update user password' })
  @ApiResponse({
    status: 200,
    description: 'Password updated successfully.',
    type: CreatedUserDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid user ID or missing data.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Incorrect old password provided.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found with the provided ID.',
  })
  @ApiParam({ name: 'id', description: 'ID of the user' })
  update(id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.userService.updatePassword(id, updatePasswordDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 204, description: 'User deleted successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Invalid user ID format (not a valid UUID).',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found with the provided ID.',
  })
  @ApiParam({ name: 'id', description: 'ID of the user' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(id: string) {
    return this.userService.remove(id);
  }
}
