import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'src/constants';
import PokemonEntity from 'src/database/entities/pokemon.entity';
import { PaginatedResult } from 'src/shared/types';
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
    const findOptions: Record<string, number | Array<unknown>> = {
      where: [
        { name: Like(`%${searchQuery}%`) },
        { pokedexId: Like(`%${searchQuery}%`) },
        query?.type && { type1: query?.type },
        query?.type && { type2: query?.type },
        query?.weather && { weather1: query?.weather },
        query?.weather && { weather2: query?.weather },
      ],
    };

    const pagination = query?.pagination;
    if (pagination) {
      findOptions.take = query?.page_size ?? DEFAULT_PAGE_SIZE;

      const page = query?.page ?? DEFAULT_PAGE;
      findOptions.skip = (page - 1) * findOptions.take;

      const [results, count] = await this.pokemonRepository.findAndCount(
        findOptions,
      );

      return {
        results,
        count,
      };
    }

    return await this.pokemonRepository.find(findOptions);
  }

  async getPokemon(pokemonId: string) {
    return await this.pokemonRepository.findOne({ where: { id: pokemonId } });
  }
}
