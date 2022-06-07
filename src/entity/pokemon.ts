export interface IPokemon {
  id: number;
  name: string;
  attack: number;
  defence: number;
  hp: number;
  fastAttacks: number[];
  chargedAttacks: number[];
}

export interface IPokemonStatus {
  id: number;
  name: string;
  level: number;
  cp: number;
  attack: number;
  defence: number;
  hp: number;
}
