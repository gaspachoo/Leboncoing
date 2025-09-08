import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Annonce } from './entities/annonce.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AnnoncesService {
  constructor(
    @InjectRepository(Annonce)
    private annoncesRepository: Repository<Annonce>,
  ) {}

  async create(data: Partial<Annonce>, userId: number) {
    const annonce = this.annoncesRepository.create({
      ...data,
      user: { id: userId } as User, // associe au user sans recharger tout l’objet
    });
    return this.annoncesRepository.save(annonce);
  }

  findAll() {
    return this.annoncesRepository.find({ relations: ['user'] });
  }

  findOne(id: number) {
    return this.annoncesRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async update(id: number, updateData: Partial<Annonce>, userId: number) {
    const annonce = await this.findOne(id);
    if (!annonce) throw new NotFoundException('Annonce not found');
    if (annonce.user.id !== userId) {
      throw new ForbiddenException('Not allowed to update this annonce');
    }
    Object.assign(annonce, updateData);
    return this.annoncesRepository.save(annonce);
  }

  async remove(id: number, userId: number) {
    const annonce = await this.findOne(id);
    if (!annonce) throw new NotFoundException('Annonce not found');
    if (annonce.user.id !== userId) {
      throw new ForbiddenException('Not allowed to delete this annonce');
    }
    return this.annoncesRepository.remove(annonce);
  }
}
