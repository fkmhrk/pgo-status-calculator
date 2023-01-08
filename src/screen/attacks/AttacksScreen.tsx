import { useState } from "react";
import { IAttack } from "../../entity/attack";
import { toTypeString } from "../../entity/type";
import {
  allChargedAttacks,
  allFastAttacks,
} from "../../repository/impl/attack/attackData";
import { IPokemonSet } from "../../repository/pokemon";
import { IRepositories } from "../../repository/repositories";
import { Scaffold } from "../../Scaffold";
import TopAppBar from "../../TopAppBar";
import TabBar from "../../widget/TabBar";

export default function AttacksScreen(props: {
  allPokemons: IPokemonSet;
  repo: IRepositories;
}) {
  const [tabIndex, setTabIndex] = useState(0);
  const items: IAttack[] = tabIndex == 0 ? allFastAttacks : allChargedAttacks;

  return (
    <Scaffold topBar={<TopAppBar title="Attacks" />}>
      <TabBar items={["Fast", "Special"]} onTabChanged={setTabIndex} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Raid</th>
            <th>Trainer</th>
            <th>Energy</th>
          </tr>
        </thead>
        <tbody>
          {items.map((attack) => (
            <tr>
              <th>{attack.name}</th>
              <td>{toTypeString(attack.type)}</td>
              <td>{attack.raidValue}</td>
              <td>{attack.trainerValue}</td>
              <td>{attack.energy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Scaffold>
  );
}
