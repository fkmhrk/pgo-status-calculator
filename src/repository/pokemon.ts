import { IPokemon, IPokemonStatus } from "../entity/pokemon";

export interface IPokemonRepository {
  fetchAll(): Promise<IPokemonSet>;
  findById(id: string): IPokemon;

  calcStatus(
    id: string,
    level: number,
    attack: number,
    defence: number,
    hp: number,
    isShadow: boolean
  ): IPokemonStatus;

  findLevel(
    id: string,
    attack: number,
    defence: number,
    hp: number,
    limitCP: number
  ): number;
}

export interface IPokemonSet {
  asList(): IPokemon[];
  getById(id: string): IPokemon;
}
