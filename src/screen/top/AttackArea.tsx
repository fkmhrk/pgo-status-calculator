import { IPokemonStatus } from "../../entity/pokemon";
import { IRepositories } from "../../repository/repositories";

export default function AttackArea(props: {
  repo: IRepositories;
  attackSide: IPokemonStatus;
  defenceSide: IPokemonStatus;
}) {
  const repo = props.repo;
  const attackPokemon = repo.pokemon.findById(props.attackSide.id);
  const defencePokemon = repo.pokemon.findById(props.defenceSide.id);
  const fastAttacks = attackPokemon.fastAttacks
    .map((id) => repo.attack.getFastAttack(id))
    .map((attack) => {
      const damage = repo.attack.calcDamage(
        attackPokemon,
        props.attackSide,
        defencePokemon,
        props.defenceSide,
        attack
      );
      return {
        name: attack.name,
        raidValue: attack.raidValue,
        trainerValue: attack.trainerValue,
        typeMultiply: damage.typeMultiply,
        effective: damage.effective,
        raidDamage: damage.raidDamage,
        trainerDamage: damage.trainerDamager,
      };
    });
  const chargedAttacks = attackPokemon.chargedAttacks
    .map((id) => repo.attack.getChargedAttack(id))
    .map((attack) => {
      const damage = repo.attack.calcDamage(
        attackPokemon,
        props.attackSide,
        defencePokemon,
        props.defenceSide,
        attack
      );
      return {
        name: attack.name,
        raidValue: attack.raidValue,
        trainerValue: attack.trainerValue,
        typeMultiply: damage.typeMultiply,
        effective: damage.effective,
        raidDamage: damage.raidDamage,
        trainerDamage: damage.trainerDamager,
      };
    });
  return (
    <div>
      <h2>
        {props.attackSide.name}が{props.defenceSide.name}を攻撃
      </h2>
      <h3>Fast Attack</h3>
      <h4>Raid</h4>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
            <th>Type</th>
            <th>Effective</th>
            <th>Damage</th>
          </tr>
        </thead>
        <tbody>
          {fastAttacks.map((attack, index) => (
            <tr key={index}>
              <th>{attack.name}</th>
              <td>{attack.raidValue}</td>
              <td>x{attack.typeMultiply}</td>
              <td>x{attack.effective}</td>
              <td>{attack.raidDamage}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Trainer</h4>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
            <th>Type</th>
            <th>Effective</th>
            <th>Damage</th>
          </tr>
        </thead>
        <tbody>
          {fastAttacks.map((attack, index) => (
            <tr key={index}>
              <th>{attack.name}</th>
              <td>{attack.trainerValue}</td>
              <td>x{attack.typeMultiply}</td>
              <td>x{attack.effective}</td>
              <td>{attack.trainerDamage}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Charged Attack</h3>
      <h4>Raid</h4>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
            <th>Type</th>
            <th>Effective</th>
            <th>Damage</th>
          </tr>
        </thead>
        <tbody>
          {chargedAttacks.map((attack, index) => (
            <tr key={index}>
              <th>{attack.name}</th>
              <td>{attack.raidValue}</td>
              <td>x{attack.typeMultiply}</td>
              <td>x{attack.effective}</td>
              <td>{attack.raidDamage}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Trainer</h4>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
            <th>Type</th>
            <th>Effective</th>
            <th>Damage</th>
          </tr>
        </thead>
        <tbody>
          {chargedAttacks.map((attack, index) => (
            <tr key={index}>
              <th>{attack.name}</th>
              <td>{attack.trainerValue}</td>
              <td>x{attack.typeMultiply}</td>
              <td>x{attack.effective}</td>
              <td>{attack.trainerDamage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
