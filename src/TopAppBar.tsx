import React from "react";

export default function TopAppBar(props: {
  title: string;
  hasBackButton?: boolean;
}) {
  const backButton = props.hasBackButton ? (
    <button
      className="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button"
      aria-label="Open navigation menu"
      onClick={() => window.history.back()}
    >
      arrow_back
    </button>
  ) : null;
  return (
    <header className="mdc-top-app-bar">
      <div className="mdc-top-app-bar__row">
        <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
          {backButton}
          <span className="mdc-top-app-bar__title">{props.title}</span>
        </section>
      </div>
    </header>
  );
}
