import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AnnoncesService } from './annonces.service';
import { Annonce } from './entities/annonce.entity';

@Controller('annonces')
export class AnnoncesController {
  constructor(private readonly annoncesService: AnnoncesService) {}

  // POST /annonces (protégé)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() data: Partial<Annonce>, @Request() req) {
    const userId = req.user.userId; // récupéré depuis le token
    return this.annoncesService.create(data, userId);
  }

  @Get()
  findAll() {
    return this.annoncesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.annoncesService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateData: Partial<Annonce>, @Request() req) {
    const userId = req.user.userId;
    return this.annoncesService.update(id, updateData, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const userId = req.user.userId;
    return this.annoncesService.remove(id, userId);
  }
}
