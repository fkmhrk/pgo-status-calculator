import { useRef, useState } from "react";
import { IPokemonStatus } from "../../entity/pokemon";
import { IPokemonSet } from "../../repository/pokemon";
import { IRepositories } from "../../repository/repositories";
import { Scaffold } from "../../Scaffold";
import TopAppBar from "../../TopAppBar";
import ContainedButton from "../../widget/ContainedButton";
import Select from "../../widget/Select";
import TextField from "../../widget/TextField";

export default function TopScreen(props: {
  allPokemons: IPokemonSet;
  repo: IRepositories;
}) {
  const levelEl = useRef<TextField>(null);
  const attackEl = useRef<TextField>(null);
  const defenceEl = useRef<TextField>(null);
  const hpEl = useRef<TextField>(null);
  const [pokemonID, setPokemonID] = useState(0);
  const [status, setStatus] = useState<IPokemonStatus>();

  const items = props.allPokemons.asList().map((p) => {
    return {
      label: p.name,
      value: `${p.id}`,
    };
  });

  const calc = () => {
    if (pokemonID == 0) return;
    const level = Number(levelEl.current?.getValue() ?? "0");
    const attach = Number(attackEl.current?.getValue() ?? "0");
    const defence = Number(defenceEl.current?.getValue() ?? "0");
    const hp = Number(hpEl.current?.getValue() ?? "0");

    const status = props.repo.pokemon.calcStatus(
      pokemonID,
      level,
      attach,
      defence,
      hp
    );
    setStatus(status);
  };

  return (
    <Scaffold topBar={<TopAppBar title="PGO Status Calculator" />}>
      <div>
        <Select
          defaultValue={""}
          label="Pokemon"
          items={items}
          onChange={(value) => setPokemonID(Number(value))}
        />
      </div>
      <div>
        <TextField
          ref={levelEl}
          id="pokemon-level"
          type="number"
          label="Level"
          min={1}
          max={51}
          step={0.5}
          defaultValue={"1"}
        />
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
        />
        <TextField
          ref={defenceEl}
          id="pokemon-defence"
          type="number"
          label="Defence"
          min={0}
          max={15}
          defaultValue={"0"}
        />
        <TextField
          ref={hpEl}
          id="pokemon-hp"
          type="number"
          label="HP"
          min={0}
          max={15}
          defaultValue={"0"}
        />
      </div>
      <div>
        <ContainedButton onClick={calc}>Calc</ContainedButton>
      </div>
      {status !== undefined ? (
        <div>
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <td>
                  {status.name} Lv{status.level}
                </td>
              </tr>
              <tr>
                <th>CP</th>
                <td>{status.cp}</td>
              </tr>
              <tr>
                <th>Attack</th>
                <td>{status.attack}</td>
              </tr>
              <tr>
                <th>Defence</th>
                <td>{status.defence}</td>
              </tr>
              <tr>
                <th>HP</th>
                <td>{status.hp}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}
    </Scaffold>
  );
}
