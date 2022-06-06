import { IPokemon, IPokemonStatus } from "../entity/pokemon";

export interface IPokemonRepository {
  fetchAll(): Promise<IPokemonSet>;
  calcStatus(
    id: number,
    level: number,
    attach: number,
    defence: number,
    hp: number
  ): IPokemonStatus;
}

export interface IPokemonSet {
  asList(): IPokemon[];
  getById(id: number): IPokemon;
}
