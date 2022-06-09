import { IAttack } from "../../../entity/attack";
import { PokeType } from "../../../entity/type";

export const allAttackMap: { [key: number]: IAttack } = {
  1: {
    id: 1,
    name: "あわ",
    type: PokeType.water,
    raidValue: 12,
    trainerValue: 7,
  },
  2: {
    id: 2,
    name: "いわくだき",
    type: PokeType.rock,
    raidValue: 15,
    trainerValue: 9,
  },
  3: {
    id: 3,
    name: "サイコカッター",
    type: PokeType.psychic,
    raidValue: 5,
    trainerValue: 3,
  },
  4: {
    id: 4,
    name: "ねんりき",
    type: PokeType.psychic,
    raidValue: 20,
    trainerValue: 16,
  },
  5: {
    id: 5,
    name: "うちおとす",
    type: PokeType.rock,
    raidValue: 16,
    trainerValue: 12,
  },
  6: {
    id: 6,
    name: "アイアンテール",
    type: PokeType.steel,
    raidValue: 15,
    trainerValue: 9,
  },
  1000: {
    id: 1000,
    name: "じゃれつく",
    type: PokeType.fairy,
    raidValue: 90,
    trainerValue: 90,
  },
  1001: {
    id: 1001,
    name: "ハイドロポンプ",
    type: PokeType.water,
    raidValue: 130,
    trainerValue: 130,
  },
  1002: {
    id: 1002,
    name: "れいとうビーム",
    type: PokeType.ice,
    raidValue: 90,
    trainerValue: 90,
  },
  1003: {
    id: 1003,
    name: "サイコキネシス",
    type: PokeType.psychic,
    raidValue: 90,
    trainerValue: 90,
  },
  1004: {
    id: 1004,
    name: "きあいだま",
    type: PokeType.fighting,
    raidValue: 140,
    trainerValue: 150,
  },
  1005: {
    id: 1005,
    name: "10まんボルト",
    type: PokeType.electric,
    raidValue: 80,
    trainerValue: 90,
  },
  1006: {
    id: 1006,
    name: "かえんほうしゃ",
    type: PokeType.fire,
    raidValue: 70,
    trainerValue: 90,
  },
  1007: {
    id: 1007,
    name: "ストーンエッジ",
    type: PokeType.rock,
    raidValue: 100,
    trainerValue: 100,
  },
  1008: {
    id: 1008,
    name: "ラスターカノン",
    type: PokeType.steel,
    raidValue: 100,
    trainerValue: 110,
  },
};
