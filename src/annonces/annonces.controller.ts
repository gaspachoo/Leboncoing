import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { AnnoncesService } from './annonces.service';
import { Annonce } from 'src/annonces/annonce.entity';

@Controller('annonces')
export class AnnoncesController {
  constructor(private readonly annoncesService: AnnoncesService) {}

  // POST /annonces
  @Post()
  create(@Body() data: Partial<Annonce>) {
    return this.annoncesService.create(data);
  }

  // GET /annonces
  @Get()
  findAll() {
    return this.annoncesService.findAll();
  }

  // GET /annonces/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.annoncesService.findOne(id);
  }

  // PATCH /annonces/:id
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<Annonce>,
  ) {
    return this.annoncesService.update(id, updateData);
  }

  // DELETE /annonces/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.annoncesService.remove(id);
  }
}
