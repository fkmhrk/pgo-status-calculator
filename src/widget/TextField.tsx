import React from "react";

import { MDCTextField } from "@material/textfield";
import { makeClassName } from "./util/className";

export default class TextField extends React.Component<{
  id: string;
  className?: string;
  style?: React.CSSProperties;
  label: string;
  type?: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue: string;
  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}> {
  private rootEl!: React.RefObject<HTMLLabelElement>;
  textField!: MDCTextField;

  constructor(props: any) {
    super(props);
    this.rootEl = React.createRef();
  }

  setValue(value: string) {
    this.textField.value = value;
  }

  getValue(): string {
    return this.textField.value;
  }

  componentDidMount() {
    if (this.rootEl.current == null) return;
    this.textField = new MDCTextField(this.rootEl.current);
  }

  componentWillUnmount() {
    this.textField.destroy();
  }

  render() {
    const inputType = this.props.type == null ? "text" : this.props.type;
    const required = this.props.required ?? false;
    const min = this.props.min ?? 0;
    const max = this.props.max ?? 0;
    const className = makeClassName(
      "mdc-text-field mdc-text-field--filled",
      this.props
    );
    return (
      <label ref={this.rootEl} className={className} style={this.props.style}>
        <span className="mdc-text-field__ripple"></span>
        <span className="mdc-floating-label" id={this.props.id}>
          {this.props.label}
        </span>
        <input
          className="mdc-text-field__input"
          type={inputType}
          aria-labelledby={this.props.id}
          defaultValue={this.props.defaultValue}
          min={min}
          max={max}
          step={this.props.step}
          required={required}
          onChange={this.props.onChange}
        />
        <span className="mdc-line-ripple"></span>
      </label>
    );
  }
}
