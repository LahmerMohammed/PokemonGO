import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import PokemonEntity from '../../database/entities/pokemon.entity';
import pokemonsStubs from './__mocks__/pokemons.stub';
import { FindOptions, Repository } from 'typeorm';
import { MockType, repositoryMockFactory } from './__mocks__/repository.mock';
import { PokemonType, PokemonWeather } from './types';
import { PaginatedResult } from 'src/shared/types';

describe('PokemonService', () => {
  let pokemonService: PokemonService;
  let pokemonMockRepository: MockType<Repository<PokemonEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        {
          provide: getRepositoryToken(PokemonEntity),
          useFactory: repositoryMockFactory<PokemonEntity>,
        },
      ],
    }).compile();

    pokemonService = module.get<PokemonService>(PokemonService);
    pokemonMockRepository = module.get(getRepositoryToken(PokemonEntity));
  });

  it('Should be defined', () => {
    expect(pokemonService).toBeDefined();
  });

  describe('Get all pokemons', () => {
    it('Should return an array of all pokemons', async () => {
      pokemonMockRepository.find?.mockReturnValue(pokemonsStubs);
      const pokemons = await pokemonService.getPokemonsList();
      expect(pokemons).toEqual(pokemonsStubs);
    });
  });

  describe('Search pokemon by name', () => {
    it('Should return list of pokemons that matches a name', async () => {
      const searchQuery = 'saur';
      const expectedPokemons = pokemonsStubs.filter((p) =>
        p.name.includes(searchQuery),
      );
      pokemonMockRepository.find?.mockReturnValue(expectedPokemons);
      const foundedPokemons = await pokemonService.getPokemonsList({
        q: searchQuery,
      });
      expect(foundedPokemons).toEqual(expectedPokemons);
    });
  });

  describe('Search pokemon by pokedex number', () => {
    it('Should return list of pokemons that matches a given pokdex number', async () => {
      const searchQuery = '1';
      const expectedPokemons = pokemonsStubs.filter((p) =>
        p.name.includes(searchQuery),
      );
      pokemonMockRepository.find?.mockReturnValue(expectedPokemons);
      const foundedPokemons = await pokemonService.getPokemonsList({
        q: searchQuery,
      });
      expect(foundedPokemons).toEqual(expectedPokemons);
    });
  });

  describe('Get pokemon by id', () => {
    it('Should return a pokemon give an id', async () => {
      const expectedPokemon = pokemonsStubs[0];
      pokemonMockRepository.findOne?.mockReturnValue(expectedPokemon);
      const foundedPokemon = await pokemonService.getPokemon(
        expectedPokemon.id,
      );
      expect(foundedPokemon).toEqual(expectedPokemon);
      expect(pokemonMockRepository.findOne).toBeCalledWith({
        where: { id: expectedPokemon.id },
      });
    });
  });

  describe('Filter pokemons by type or weather', () => {
    it('Should return a list of pokemons that matches specific type', async () => {
      const pokemonType = 'grass' as PokemonType;
      const expectedPokemon = pokemonsStubs.filter(
        (p) => p.type1 === pokemonType || p.type2 === pokemonType,
      );
      pokemonMockRepository.find?.mockReturnValue(expectedPokemon);
      const foundedPokemon = await pokemonService.getPokemonsList({
        type: pokemonType,
      });

      expect(foundedPokemon).toEqual(expectedPokemon);
      expect(pokemonMockRepository.find).toBeCalledWith(
        expect.objectContaining({
          where: expect.arrayContaining([
            [{ type1: pokemonType }, { type2: pokemonType }],
          ]),
        }),
      );
    });

    it('Should return a list of pokemons that matches specific weather', async () => {
      const pokemonWeather = 'Rainy' as PokemonWeather;
      const expectedPokemon = pokemonsStubs.filter(
        (p) => p.weather1 === pokemonWeather || p.weather2 === pokemonWeather,
      );
      pokemonMockRepository.find?.mockReturnValue(expectedPokemon);
      const foundedPokemon = await pokemonService.getPokemonsList({
        weather: pokemonWeather,
      });

      expect(foundedPokemon).toEqual(expectedPokemon);
      expect(pokemonMockRepository.find).toBeCalledWith(
        expect.objectContaining({
          where: expect.arrayContaining([
            [{ weather1: pokemonWeather }, { weather2: pokemonWeather }],
          ]),
        }),
      );
    });
  });

  describe('Paginate pokemon list', () => {
    it('Should return a paginated list of pokemons', async () => {
      const page = 1;
      const page_size = 3;

      const expectedPokemon = pokemonsStubs.slice(1, 4);
      pokemonMockRepository.findAndCount?.mockReturnValue(expectedPokemon);

      const skip = (page - 1) * page_size;
      const foundedPokemon = (await pokemonService.getPokemonsList({
        pagination: true,
        page: 1,
        page_size: 3,
      })) as PaginatedResult<PokemonEntity>;

      expect(pokemonMockRepository.findAndCount).toBeCalledWith(
        expect.objectContaining({
          skip: skip,
          take: page_size,
        }),
      );
    });
  });
});
