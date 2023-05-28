import { IPokemonStatus } from "../../entity/pokemon";

export default function StatusArea(props: {
  className?: string;
  status: IPokemonStatus;
}) {
  const status = props.status;
  return (
    <div className={props.className}>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <td>
              {status.name} {status.isShadow ? "(Shadow)" : ""} Lv{status.level}
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
  );
}
