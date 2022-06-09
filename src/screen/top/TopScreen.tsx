import { useEffect, useRef, useState } from "react";
import { IPokemonStatus } from "../../entity/pokemon";
import { IPokemonSet } from "../../repository/pokemon";
import { IRepositories } from "../../repository/repositories";
import { Scaffold } from "../../Scaffold";
import TopAppBar from "../../TopAppBar";
import ContainedButton from "../../widget/ContainedButton";
import Select from "../../widget/Select";
import TextField from "../../widget/TextField";
import AttackArea from "./AttackArea";
import StatusArea from "./Status";

import "./TopScreen.scss";

const vsTypeItems = [
  { label: "Raid", value: "1" },
  { label: "Trainer", value: "2" },
];

export default function TopScreen(props: {
  allPokemons: IPokemonSet;
  repo: IRepositories;
}) {
  const levelEl = useRef<TextField>(null);
  const attackEl = useRef<TextField>(null);
  const defenceEl = useRef<TextField>(null);
  const hpEl = useRef<TextField>(null);
  const [level, setLevel] = useState(1);
  const [attack, setAttack] = useState(0);
  const [defence, setDefence] = useState(0);
  const [hp, setHp] = useState(0);
  const [pokemonID, setPokemonID] = useState("0");
  const [status, setStatus] = useState<IPokemonStatus>();
  const [pokeBox, setPokeBox] = useState<IPokemonStatus[]>([]);
  const [aSide, setASide] = useState<IPokemonStatus>();
  const [bSide, setBSide] = useState<IPokemonStatus>();
  const [vsType, setVSType] = useState<"1" | "2">("1");

  const items = props.allPokemons.asList().map((p) => {
    return {
      label: p.name,
      value: p.id,
    };
  });

  const findGL = () => findLevel(1500);
  const findUL = () => findLevel(2500);

  const findLevel = (limit: number) => {
    if (pokemonID === "0") return;
    const foundLevel = props.repo.pokemon.findLevel(
      pokemonID,
      attack,
      defence,
      hp,
      limit
    );
    setLevel(foundLevel);
    levelEl.current?.setValue(`${foundLevel}`);
  };

  const add = () => {
    if (status === undefined) return;

    pokeBox.push(status);
    setPokeBox(pokeBox);
    setLevel(1);
    levelEl.current?.setValue("1");
  };

  useEffect(() => {
    if (pokemonID === "0") return;

    const status = props.repo.pokemon.calcStatus(
      pokemonID,
      level,
      attack,
      defence,
      hp
    );
    setStatus(status);
  }, [pokemonID, level, attack, defence, hp]);

  return (
    <Scaffold topBar={<TopAppBar title="PGO Status Calculator" />}>
      <div className="top">
        <div>
          <Select
            defaultValue={""}
            label="Pokemon"
            items={items}
            onChange={(value) => setPokemonID(value)}
          />
        </div>
        <div>
          <TextField
            ref={levelEl}
            id="pokemon-level"
            type="number"
            label="Level"
            min={1}
            max={55}
            step={0.5}
            defaultValue={"1"}
            onChange={(e) => setLevel(e.target.valueAsNumber)}
          />
          <ContainedButton onClick={findGL}>GL</ContainedButton>
          <ContainedButton onClick={findUL}>UL</ContainedButton>
        </div>
        <div>
          <TextField
            ref={attackEl}
            id="pokemon-attack"
            type="number"
            label="Attack"
            min={0}
            max={15}
            defaultValue={"0"}
            onChange={(e) => setAttack(e.target.valueAsNumber)}
          />
          <TextField
            ref={defenceEl}
            id="pokemon-defence"
            type="number"
            label="Defence"
            min={0}
            max={15}
            defaultValue={"0"}
            onChange={(e) => setDefence(e.target.valueAsNumber)}
          />
          <TextField
            ref={hpEl}
            id="pokemon-hp"
            type="number"
            label="HP"
            min={0}
            max={15}
            defaultValue={"0"}
            onChange={(e) => setHp(e.target.valueAsNumber)}
          />
        </div>
        <div>
          <ContainedButton onClick={add}>Add</ContainedButton>
        </div>
        {status !== undefined ? <StatusArea status={status} /> : null}

        {pokeBox.length > 0 ? (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>CP</th>
                  <th>Level</th>
                  <th>IV</th>
                  <th>Attack</th>
                  <th>Defence</th>
                  <th>HP</th>
                </tr>
              </thead>
              <tbody>
                {pokeBox.map((status, index) => (
                  <tr key={index}>
                    <th>{status.name}</th>
                    <td>{status.cp}</td>
                    <td>Lv{status.level}</td>
                    <td>
                      {status.attackIV}/{status.defenceIV}/{status.hpIV}
                    </td>
                    <td>{status.attack}</td>
                    <td>{status.defence}</td>
                    <td>{status.hp}</td>
                    <td>
                      <ContainedButton onClick={() => setASide(status)}>
                        A
                      </ContainedButton>
                    </td>
                    <td>
                      <ContainedButton onClick={() => setBSide(status)}>
                        B
                      </ContainedButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        <div style={{ display: "flex" }}>
          {aSide !== undefined ? (
            <StatusArea status={aSide} />
          ) : (
            <div className="side-box">A</div>
          )}
          {bSide !== undefined ? (
            <StatusArea status={bSide} />
          ) : (
            <div className="side-box">B</div>
          )}
        </div>

        <div>
          <Select
            defaultValue={"1"}
            label="VS"
            items={vsTypeItems}
            onChange={(value) => setVSType(value as "1" | "2")}
          />
        </div>

        {aSide !== undefined && bSide !== undefined ? (
          <>
            <AttackArea
              repo={props.repo}
              vsType={vsType}
              attackSide={aSide}
              defenceSide={bSide}
            />
            <AttackArea
              repo={props.repo}
              vsType={vsType}
              attackSide={bSide}
              defenceSide={aSide}
            />
          </>
        ) : null}
      </div>
    </Scaffold>
  );
}
