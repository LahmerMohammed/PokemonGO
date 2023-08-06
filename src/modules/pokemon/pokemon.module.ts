import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import PokemonEntity from 'src/database/entities/pokemon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PokemonEntity])],
  controllers: [PokemonController],
  providers: [PokemonService],
  exports: [],
})
export class PokemonModule {}
