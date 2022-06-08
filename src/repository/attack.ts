import { IAttack } from "../entity/attack";
import { IPokemon, IPokemonStatus } from "../entity/pokemon";

export interface IAttackRepository {
  getFastAttack(id: number): IAttack;
  getChargedAttack(id: number): IAttack;

  calcDamage(
    attackPokemon: IPokemon,
    attackStatus: IPokemonStatus,
    defencePokemon: IPokemon,
    defenceStatus: IPokemonStatus,
    attack: IAttack
  ): IAttackResult;
}

export interface IAttackResult {
  typeMultiply: number;
  effective: number;
  raidDamage: number;
  trainerDamager: number;
}
