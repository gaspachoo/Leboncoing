import { Controller, Post, Get, Patch, Body, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/users/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // POST /users
  @Post()
  create(@Body() userData: Partial<User>) {
    return this.usersService.create(userData);
  }

    // GET /users
    @Get()
    findAll() {
      return this.usersService.findAll();
    }

  // GET /users/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  // PATCH /users/:id
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<User>,
  ) {
    return this.usersService.update(id, updateData);
  }

    // DELETE /users/:id
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.usersService.remove(id);
    }
}
