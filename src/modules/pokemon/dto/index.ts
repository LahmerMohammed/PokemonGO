import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { PokemonType, PokemonWeather } from '../types';
import { ApiProperty } from '@nestjs/swagger';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'src/constants';

export class PokemonListQueryParams {
  @ApiProperty({
    name: 'q',
    type: String,
    required: false,
    description: 'Search by pokemons by name or by pokedex number',
  })
  @IsString()
  @IsOptional()
  q?: string;

  @ApiProperty({
    type: Boolean,
    required: false,
    description: 'Enable/Disable pagination',
  })
  @IsBoolean()
  @IsOptional()
  pagination?: boolean;

  @ApiProperty({
    type: Number,
    minimum: 0,
    default: DEFAULT_PAGE,
    required: false,
    description: 'Represent page you want to get',
  })
  @IsPositive()
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiProperty({
    type: Number,
    minimum: 0,
    default: DEFAULT_PAGE_SIZE,
    required: false,
    description: 'Represent page size',
  })
  @IsPositive()
  @IsNumber({}, { each: true })
  @IsOptional()
  page_size?: number;

  @ApiProperty({
    enum: PokemonType,
    required: false,
    description: 'Filter by pokemon type',
  })
  @IsOptional()
  @IsEnum(PokemonType)
  type?: PokemonType;

  @ApiProperty({
    enum: PokemonWeather,
    required: false,
    description: 'Filter by pokemon weather',
  })
  @IsOptional()
  @IsEnum(PokemonWeather)
  weather?: PokemonWeather;
}
