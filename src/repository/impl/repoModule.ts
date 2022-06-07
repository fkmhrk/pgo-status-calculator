import { IRepositories } from "../repositories";
import { AttackRepository } from "./attack/attackRepository";
import { PokemonRepository } from "./pokemon/pokemonRepository";

export const newRepositories = () => {
  return {
    pokemon: new PokemonRepository(),
    attack: new AttackRepository(),
  } as IRepositories;
};
