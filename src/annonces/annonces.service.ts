import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Annonce } from 'src/annonces/entities/annonce.entity';

@Injectable()
export class AnnoncesService {
  constructor(
    @InjectRepository(Annonce)
    private annoncesRepository: Repository<Annonce>,
  ) {}

  create(data: Partial<Annonce>) {
    const annonce = this.annoncesRepository.create(data);
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

  async update(id: number, updateData: Partial<Annonce>) {
    const annonce = await this.annoncesRepository.findOne({ where: { id } });
    if (!annonce) {
      throw new Error('Annonce not found');
    }
    Object.assign(annonce, updateData);
    return this.annoncesRepository.save(annonce);
  }

  remove(id: number) {
    return this.annoncesRepository.delete(id);
  }
}
