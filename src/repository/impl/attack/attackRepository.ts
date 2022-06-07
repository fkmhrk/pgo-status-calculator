import { IFastAttack } from "../../../entity/attack";
import { IAttackRepository } from "../../attack";

export class AttackRepository implements IAttackRepository {
  getFastAttacks(idList: number[]): Promise<IFastAttack[]> {
    throw new Error("Method not implemented.");
  }
  getChargedAttacks(idList: number[]): Promise<IFastAttack[]> {
    throw new Error("Method not implemented.");
  }
}
