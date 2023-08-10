import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../../constants';
import PokemonEntity from '../../database/entities/pokemon.entity';
import { PaginatedResult } from '../../shared/types';
import { Like, Repository } from 'typeorm';
import { PokemonListQueryParams } from './dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(PokemonEntity)
    private readonly pokemonRepository: Repository<PokemonEntity>,
  ) {}

  async getPokemonsList(
    query?: PokemonListQueryParams,
  ): Promise<PokemonEntity[] | PaginatedResult<PokemonEntity>> {
    const searchQuery = query?.q || '';
    const findOptions: Record<string, number | Array<any>> = {
      where: [
        { name: Like(`%${searchQuery}%`) },
        { pokedexId: Like(`%${searchQuery}%`) },
      ],
    };

    if (query?.type) {
      (findOptions.where as Array<any>).push([
        { type1: query.type },
        { type2: query.type },
      ]);
    }

    if (query?.weather) {
      (findOptions.where as Array<any>).push([
        { weather1: query.weather },
        { weather2: query.weather },
      ]);
    }

    const pagination = query?.pagination;
    if (pagination) {
      findOptions.take = query?.page_size ?? DEFAULT_PAGE_SIZE;

      const page = query?.page ?? DEFAULT_PAGE;
      findOptions.skip = (page - 1) * findOptions.take;

      const [results, count] = await this.pokemonRepository.findAndCount(
        findOptions,
      );

      return {
        count,
        results,
      } as PaginatedResult<PokemonEntity>;
    }

    return await this.pokemonRepository.find(findOptions);
  }

  async getPokemon(pokemonId: string) {
    return await this.pokemonRepository.findOne({ where: { id: pokemonId } });
  }
}
