export const PokeType = {
  empty: 0,
  normal: 1, //ノーマル
  fighting: 2, // かくとう
  flying: 3, // ひこう
  poison: 4, // どく
  ground: 5, // じめん
  rock: 6, // いわ
  bug: 7, // むし
  ghost: 8, // ゴースト
  steel: 9, // はがね
  fire: 10, // ほのお
  water: 11, // みず
  grass: 12, // くさ
  electric: 13, // でんき
  psychic: 14, // エスパー
  ice: 15, // こおり
  dragon: 16, // ドラゴン
  dark: 17, // あく
  fairy: 18, // フェアリー
};

const typeStringMap = [
  "",
  "ノーマル",
  "かくとう",
  "ひこう",
  "どく",
  "じめん",
  "いわ",
  "むし",
  "ゴースト",
  "はがね",
  "ほのお",
  "みず",
  "くさ",
  "でんき",
  "エスパー",
  "こおり",
  "ドラゴン",
  "あく",
  "フェアリー",
];

export const toTypeString = (type: number) => {
  return typeStringMap[type];
};
