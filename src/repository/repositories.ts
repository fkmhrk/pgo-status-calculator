import { IAttackRepository } from "./attack";
import { IPokemonRepository } from "./pokemon";

export interface IRepositories {
  pokemon: IPokemonRepository;
  attack: IAttackRepository;
}
