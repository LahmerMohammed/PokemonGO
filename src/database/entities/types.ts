import PokemonEntity from './pokemon.entity';

export type PokemonEntityKeys = {
  [K in keyof PokemonEntity]: K;
}[keyof PokemonEntity];
