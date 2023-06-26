import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(
    @Query('name') name?: string,
    @Query('email') email?: string,
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 100,
  ) {
    // TO DO: realizar validação dos parâmetros, se necessário
    return await this.userService.getUsers({ name, email, page, pageSize });
  }

  @Get(':userId')
  getUserById(@Param('userId') userId: string) {
    //TO DO: criar validadção de parametros, vai ser via DTO?
    return this.userService.getUserById(userId);
  }

  @Post()
  createUser(@Body() user) {
    //TO DO: criar validadção de parametros, vai ser via DTO?
    return this.userService.createUser(user);
  }

  @Patch(':userId')
  updateParcialUser(@Param('userId') userId: number, @Body() user) {
    //TO DO: criar validadção de parametros, vai ser via DTO?
    return this.userService.updateUserById(userId, user);
  }

  @Delete(':userId')
  deleteUserById(@Param('userId') userId: string) {
    const parsedUserId = parseInt(userId);
    if (isNaN(parsedUserId)) {
      throw new BadRequestException('O ID do usuário é inválido.');
    }
    return this.userService.deleteUserById(parsedUserId);
  }
}
