import { MDCSelect } from "@material/select";
import React from "react";

export default class Select extends React.Component<{
  className?: string;
  style?: React.CSSProperties;
  defaultValue: string;
  label: string;
  items: { label: string; value: string }[];
  onChange?: (value: string) => void;
}> {
  private rootEl: React.RefObject<HTMLDivElement>;
  select!: MDCSelect;

  constructor(props: any) {
    super(props);
    this.rootEl = React.createRef();
  }

  setValue(value: string) {
    this.select.value = value;
  }

  componentDidMount() {
    if (this.rootEl.current == null) return;
    this.select = new MDCSelect(this.rootEl.current);
    this.select.value = this.props.defaultValue;
    this.select.listen("MDCSelect:change", () => {
      if (this.props.onChange != null) {
        this.props.onChange(this.select.value);
      }
    });
  }

  componentWillUnmount() {
    this.select.destroy();
  }

  render() {
    const options = this.props.items.map((item) => {
      const isSelected = item.value === this.props.defaultValue;
      const className = isSelected
        ? "mdc-deprecated-list-item mdc-list-item--selected"
        : "mdc-deprecated-list-item";
      return (
        <li
          key={item.value}
          className={className}
          aria-selected={isSelected}
          data-value={item.value}
          role="option"
        >
          <span className="mdc-deprecated-list-item__ripple"></span>
          <span className="mdc-deprecated-list-item__text">{item.label}</span>
        </li>
      );
    });

    return (
      <div
        ref={this.rootEl}
        className="mdc-select mdc-select--filled demo-width-class"
      >
        <div
          className="mdc-select__anchor"
          role="button"
          aria-haspopup="listbox"
          aria-expanded="false"
          aria-labelledby="demo-label demo-selected-text"
        >
          <span className="mdc-select__ripple"></span>
          <span id="demo-label" className="mdc-floating-label">
            {this.props.label}
          </span>
          <span className="mdc-select__selected-text-container">
            <span
              id="demo-selected-text"
              className="mdc-select__selected-text"
            ></span>
          </span>
          <span className="mdc-select__dropdown-icon">
            <svg
              className="mdc-select__dropdown-icon-graphic"
              viewBox="7 10 10 5"
              focusable="false"
            >
              <polygon
                className="mdc-select__dropdown-icon-inactive"
                stroke="none"
                fillRule="evenodd"
                points="7 10 12 15 17 10"
              ></polygon>
              <polygon
                className="mdc-select__dropdown-icon-active"
                stroke="none"
                fillRule="evenodd"
                points="7 15 12 10 17 15"
              ></polygon>
            </svg>
          </span>
          <span className="mdc-line-ripple"></span>
        </div>

        <div className="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth">
          <ul
            className="mdc-deprecated-list"
            role="listbox"
            aria-label="Food picker listbox"
          >
            {options}
          </ul>
        </div>
      </div>
    );
  }
}
