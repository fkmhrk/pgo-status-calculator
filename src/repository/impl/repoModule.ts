import { IRepositories } from "../repositories";
import PokemonRepository from "./pokemon/pokemonRepository";

export const newRepositories = () => {
  return {
    pokemon: new PokemonRepository(),
  } as IRepositories;
};
