import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
class PokemonEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  pokedexId: string;

  @Column()
  imageName: string;

  @Column()
  generation: number;

  @Column({ nullable: true })
  evolutionStage!: string;

  @Column()
  hasEvolved: boolean;

  @Column()
  familyId: string;

  @Column()
  legendary: string;

  @Column()
  isCrossGeneration: boolean;

  @Column()
  type1: string;

  @Column({ nullable: true })
  type2!: string;

  @Column()
  weather1: string;

  @Column({ nullable: true })
  weather2!: string;

  @Column()
  totalStats: number;

  @Column()
  attackStat: number;

  @Column()
  defenseStat: number;

  @Column()
  staminaStat: number;

  @Column()
  acquirable: string;

  @Column()
  spawnsInWild: boolean;

  @Column()
  isRegionalExclusive: boolean;

  @Column()
  hatchableDistance: string;

  @Column()
  isShinyAvailable: boolean;

  @Column()
  isNestSpawn: boolean;

  @Column()
  isNewEncounter: boolean;

  @Column()
  isCatchable: boolean;

  @Column()
  hasFutureEvolution: boolean;

  @Column()
  maxCP100IVLvl40: number;

  @Column()
  maxCP100IVLvl39: number;

  @Column()
  raidableTier: string;
}

export default PokemonEntity;
