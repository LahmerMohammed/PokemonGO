import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import PokemonEntity from '../entities/pokemon.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as XLSX from 'xlsx';
import { PokemonEntityKeys } from '../entities/types';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(PokemonEntity)
    private readonly pokemonRepository: Repository<PokemonEntity>,
    private readonly logger: Logger,
  ) {}

  async create() {
    const pokemons = this.read_data('dist/database/seeders/PokemonGo.xlsx');
    return pokemons.map(async (p) => await p.save());
  }

  read_data(filePath: string): Array<PokemonEntity> {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rows: Array<Array<never>> = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
    });

    const headers = rows.shift() as string[];

    const data = rows.map((row) => {
      const pokemonEntity = new PokemonEntity();
      for (let index = 0; index < row.length; index++) {
        const header = headers[index] as PokemonEntityKeys;
        pokemonEntity[header] =
          row[index] === '' ? (null as never) : row[index];
      }
      return pokemonEntity;
    });
    return data;
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
