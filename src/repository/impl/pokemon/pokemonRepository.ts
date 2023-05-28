import { IPokemon, IPokemonStatus } from "../../../entity/pokemon";
import { IPokemonRepository, IPokemonSet } from "../../pokemon";
import { getCPM } from "./cpm";
import { allPokemons } from "./pokemonData";

export class PokemonRepository implements IPokemonRepository {
  async fetchAll(): Promise<IPokemonSet> {
    return new PokemonSet(allPokemons);
  }

  findById(id: string): IPokemon {
    const pokemon = allPokemons.find((p) => p.id == id);
    if (pokemon === undefined) return allPokemons[0];
    return pokemon!;
  }

  calcStatus(
    id: string,
    level: number,
    attack: number,
    defence: number,
    hp: number,
    isShadow: boolean
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
      id: id,
      name: pokemon.name,
      level: level,
      cp: cp,
      attack: actualAttack * (isShadow ? 1.2 : 1),
      defence: actualDefence * (isShadow ? 0.833 : 1),
      hp: Math.floor(actualHP),
      attackIV: attack,
      defenceIV: defence,
      hpIV: hp,
      isShadow: isShadow,
    } as IPokemonStatus;
  }

  findLevel(
    id: string,
    attack: number,
    defence: number,
    hp: number,
    limitCP: number
  ): number {
    const pokemon = allPokemons.find((p) => p.id == id);
    if (pokemon === undefined) return 1;

    const baseAttack = pokemon.attack + attack;
    const baseDefence = pokemon.defence + defence;
    const baseHP = pokemon.hp + hp;

    return findLevel(baseAttack, baseDefence, baseHP, limitCP);
  }
}

const findLevel = (
  baseAttack: number,
  baseDefence: number,
  baseHP: number,
  limit: number
) => {
  let level = 1;
  let maxLevel = 1;
  while (level <= 50) {
    const cpm = getCPM(level);
    const actualAttack = baseAttack * cpm;
    const actualDefence = baseDefence * cpm;
    const actualHP = baseHP * cpm;

    const cp = Math.floor(
      (actualAttack * Math.sqrt(actualDefence) * Math.sqrt(actualHP)) / 10
    );
    if (cp > limit) {
      return maxLevel;
    }
    maxLevel = level;

    level += 0.5;
  }
  return 50;
};

class PokemonSet implements IPokemonSet {
  private asMap: { [key: string]: IPokemon };

  constructor(private data: IPokemon[]) {
    this.asMap = data.reduce((m, p) => {
      m[p.id] = p;
      return m;
    }, {} as { [key: string]: IPokemon });
  }

  asList(): IPokemon[] {
    return this.data;
  }

  getById(id: string): IPokemon {
    return this.asMap[id];
  }
}
