import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import PokemonEntity from '../entities/pokemon.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PokemonEntityKeys } from '../entities/types';
import readXLSXFile from 'src/utils/read-xlsx-file';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(PokemonEntity)
    private readonly pokemonRepository: Repository<PokemonEntity>,
    private readonly logger: Logger,
  ) {}

  async create() {
    const pokemons = readXLSXFile<PokemonEntity>(
      'dist/database/seeders/PokemonGo.xlsx',
      () => new PokemonEntity(),
    );
    return pokemons.map(async (p) => await p.save());
  }

  async seed() {
    await this.create()
      .then((completed) => {
        this.logger.debug('Successfuly completed seeding pokemons...');
        Promise.resolve(completed);
      })
      .catch((error) => {
        this.logger.error('Failed seeding pokemons...');
        Promise.reject(error);
      });
  }

  async onApplicationBootstrap() {
    await this.seed();
  }
}
