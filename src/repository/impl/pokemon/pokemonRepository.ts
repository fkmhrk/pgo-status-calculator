import { IPokemon, IPokemonStatus } from "../../../entity/pokemon";
import { IPokemonRepository, IPokemonSet } from "../../pokemon";
import { getCPM } from "./cpm";
import { allPokemons } from "./pokemonData";

export class PokemonRepository implements IPokemonRepository {
  async fetchAll(): Promise<IPokemonSet> {
    return new PokemonSet(allPokemons);
  }

  calcStatus(
    id: number,
    level: number,
    attack: number,
    defence: number,
    hp: number
  ): IPokemonStatus {
    const pokemon = allPokemons.find((p) => p.id == id);
    if (pokemon === undefined) return {} as IPokemonStatus;
    const cpm = getCPM(level);
    const baseAttack = pokemon.attack + attack;
    const baseDefence = pokemon.defence + defence;
    const baseHP = pokemon.hp + hp;

    const actualAttack = baseAttack * cpm;
    const actualDefence = baseDefence * cpm;
    const actualHP = baseHP * cpm;

    const cp = Math.floor(
      (actualAttack * Math.sqrt(actualDefence) * Math.sqrt(actualHP)) / 10
    );

    return {
      name: pokemon.name,
      level: level,
      cp: cp,
      attack: actualAttack,
      defence: actualDefence,
      hp: Math.floor(actualHP),
    } as IPokemonStatus;
  }
}

class PokemonSet implements IPokemonSet {
  private asMap: { [key: number]: IPokemon };

  constructor(private data: IPokemon[]) {
    this.asMap = data.reduce((m, p) => {
      m[p.id] = p;
      return m;
    }, {} as { [key: number]: IPokemon });
  }

  asList(): IPokemon[] {
    return this.data;
  }

  getById(id: number): IPokemon {
    return this.asMap[id];
  }
}
