import { IFastAttack } from "../entity/attack";

export interface IAttackRepository {
  getFastAttacks(idList: number[]): Promise<IFastAttack[]>;
  getChargedAttacks(idList: number[]): Promise<IFastAttack[]>;
}
