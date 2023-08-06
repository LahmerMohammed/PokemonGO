import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { PokemonType, PokemonWeather } from '../types';

export class PokemonListQueryParams {
  @IsString()
  @IsOptional()
  q?: string;

  @IsBoolean()
  @IsOptional()
  pagination?: boolean;

  @IsPositive()
  @IsNumber()
  @IsOptional()
  page?: number;

  @IsPositive()
  @IsNumber({}, { each: true })
  @IsOptional()
  page_size?: number;

  @IsOptional()
  @IsEnum(PokemonType)
  type?: PokemonType;

  @IsOptional()
  @IsEnum(PokemonWeather)
  weather?: PokemonWeather;
}
