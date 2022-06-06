import { MDCRipple } from "@material/ripple";
import { useEffect, useRef } from "react";

export default function ContainedButton(props: any) {
  const rootEl = useRef(null);
  useEffect(() => {
    if (rootEl.current == null) return;
    const ripple = new MDCRipple(rootEl.current);
    return () => {
      ripple.destroy();
    };
  });
  return (
    <button
      ref={rootEl}
      className="mdc-button mdc-button--raised"
      onClick={props.onClick}
    >
      <span className="mdc-button__label">{props.children}</span>
    </button>
  );
}
