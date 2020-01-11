// @flow

import React, { Component } from "react";

import "../style/Tip.css";

type State = {
  compact: boolean,
  text: string,
  emoji: string
};

type Props = {
  onConfirm: (comment: { text: string, emoji: string }) => void,
  onOpen: () => void,
  onUpdate?: () => void
};

class Tip extends Component<Props, State> {
  state = {
    compact: true,
    text: "",
    emoji: ""
  };

  state: State;
  props: Props;

  // for TipContainer
  componentDidUpdate(nextProps: Props, nextState: State) {
    const { onUpdate } = this.props;

    if (onUpdate && this.state.compact !== nextState.compact) {
      onUpdate();
    }
  }

  render() {
    const { onConfirm, onOpen } = this.props;
    const { compact, text, emoji } = this.state;

    return (
      <div className="Tip">
        {compact ? (
          <div
            className="Tip__compact"
            onClick={() => {
              onOpen();
              this.setState({ compact: false });
            }}
          >
            Mark Item(s)
          </div>
        ) : (
            <form
              className="Tip__card"
              onSubmit={event => {
                event.preventDefault();
                onConfirm({ text, emoji });
              }}
            >
              <div>
                <div style={{ color: "black" }}>
                  Test
                </div>
              </div>
              <div>
                <input type="submit" value="Save" />
              </div>
            </form>
          )}
      </div>
    );
  }
}

export default Tip;
