import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PokemonEntity from '../entities/pokemon.entity';
import { SeederService } from './seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([PokemonEntity])],
  controllers: [],
  providers: [SeederService, Logger],
})
export class SeederModule {}
