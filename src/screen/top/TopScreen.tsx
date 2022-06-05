import { Scaffold } from "../../Scaffold";
import TopAppBar from "../../TopAppBar";

export default function TopScreen(props: {}) {
  return (
    <Scaffold topBar={<TopAppBar title="PGO Status Calculator" />}></Scaffold>
  );
}
