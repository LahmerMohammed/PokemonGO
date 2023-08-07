import { Controller, Get, Param, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonListQueryParams } from './dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Pokemons')
@Controller('pokemons')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async getPokemonsList(@Query() query?: PokemonListQueryParams) {
    return await this.pokemonService.getPokemonsList(query);
  }

  @Get('/:id')
  @ApiParam({ name: 'id', type: String })
  async getPokemon(@Param('id') pokemonId: string) {
    return await this.pokemonService.getPokemon(pokemonId);
  }
}
