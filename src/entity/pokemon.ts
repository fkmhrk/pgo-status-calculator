export interface IPokemon {
  id: string;
  name: string;
  type1: number;
  type2: number;
  attack: number;
  defence: number;
  hp: number;
  fastAttacks: number[];
  chargedAttacks: number[];
}

export interface IPokemonStatus {
  id: string;
  name: string;
  level: number;
  cp: number;
  attack: number;
  defence: number;
  hp: number;
  attackIV: number;
  defenceIV: number;
  hpIV: number;
  isShadow: boolean;
}
