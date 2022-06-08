import { IAttack } from "../../../entity/attack";
import { IPokemon, IPokemonStatus } from "../../../entity/pokemon";
import { IAttackRepository, IAttackResult } from "../../attack";
import { allAttackMap } from "./attackData";
import { effectiveData } from "./effectiveData";

export class AttackRepository implements IAttackRepository {
  getFastAttack(id: number): IAttack {
    return allAttackMap[id];
  }
  getChargedAttack(id: number): IAttack {
    return allAttackMap[id];
  }

  calcDamage(
    attackPokemon: IPokemon,
    attackStatus: IPokemonStatus,
    defencePokemon: IPokemon,
    defenceStatus: IPokemonStatus,
    attack: IAttack
  ): IAttackResult {
    const typeMatch = isTypeMatch(attackPokemon, attack.type) ? 1.2 : 1;
    const type1Effective = getEffectiveMultiplier(
      attack.type,
      defencePokemon.type1
    );
    const type2Effective = getEffectiveMultiplier(
      attack.type,
      defencePokemon.type2
    );

    const baseValue =
      (attackStatus.attack / defenceStatus.defence) *
      typeMatch *
      type1Effective *
      type2Effective *
      0.5;

    const raidValue = baseValue * attack.raidValue;
    const trainerValue = baseValue * attack.trainerValue;

    return {
      typeMultiply: typeMatch ? 1.2 : 1,
      effective: type1Effective * type2Effective,
      raidDamage: Math.floor(raidValue),
      trainerDamager: Math.floor(trainerValue),
    };
  }
}

const isTypeMatch = (attackPokemon: IPokemon, type: number) => {
  return attackPokemon.type1 == type || attackPokemon.type2 == type;
};

const getEffectiveMultiplier = (attackType: number, defenceType: number) => {
  return effectiveData[attackType][defenceType] ?? 1;
};
