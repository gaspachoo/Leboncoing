import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Annonce } from 'src/annonces/annonce.entity';

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

  update(id: number, updateData: Partial<Annonce>) {
    return this.annoncesRepository.update(id, updateData);
  }

  remove(id: number) {
    return this.annoncesRepository.delete(id);
  }
}
