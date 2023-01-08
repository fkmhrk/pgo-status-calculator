import { MDCTabBar } from "@material/tab-bar";
import { timeStamp } from "console";
import React from "react";

export default class TabBar extends React.Component<{
  items: String[];
  onTabChanged: (index: number) => void;
}> {
  private rootEl!: React.RefObject<HTMLDivElement>;
  tabBar!: MDCTabBar;

  constructor(props: any) {
    super(props);
    this.rootEl = React.createRef();
  }

  componentDidMount() {
    if (this.rootEl.current == null) return;
    this.tabBar = new MDCTabBar(this.rootEl.current);
    this.tabBar.listen("MDCTabBar:activated", (e: any) => {
      console.log(e);
      this.props.onTabChanged(e.detail.index);
    });
  }

  componentWillUnmount() {
    this.tabBar.destroy();
  }

  render() {
    return (
      <div ref={this.rootEl} className="mdc-tab-bar" role="tablist">
        <div className="mdc-tab-scroller">
          <div className="mdc-tab-scroller__scroll-area">
            <div className="mdc-tab-scroller__scroll-content">
              {this.props.items.map((item, index) => (
                <button
                  className={index == 0 ? "mdc-tab mdc-tab--active" : "mdc-tab"}
                  role="tab"
                  aria-selected={index == 0}
                  tabIndex={index}
                  key={index}
                >
                  <span className="mdc-tab__content">
                    <span className="mdc-tab__text-label">{item}</span>
                  </span>
                  <span
                    className={
                      index == 0
                        ? "mdc-tab-indicator mdc-tab-indicator--active"
                        : "mdc-tab-indicator"
                    }
                  >
                    <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                  </span>
                  <span className="mdc-tab__ripple"></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
