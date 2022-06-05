import React from "react";

export function Scaffold(props: {
  topBar?: JSX.Element;
  children?: React.ReactNode;
}) {
  return (
    <React.Fragment>
      {props.topBar}
      <main className="mdc-top-app-bar--fixed-adjust">{props.children}</main>
    </React.Fragment>
  );
}
