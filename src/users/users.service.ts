import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(userData: Partial<User>) {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

    findAll() {
      return this.usersRepository.find();
    }

  findOne(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }
  
  async findByEmail(email: string) {
  return this.usersRepository.findOne({ where: { email } });
  }

  async update(id: number, updateData: Partial<User>) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, updateData);
    return this.usersRepository.save(user);
  }

    async remove(id: number) {
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) {
        throw new Error('User not found');
      }
      return this.usersRepository.remove(user);
    }

}
