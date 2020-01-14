// @flow

import React, { Component } from "react";

import "../style/Tip.css";
import testHighlights from "../../demo/src/test-highlights";

type State = {
  compact: boolean,
  text: string,
  emoji: string,
  itemNo: string
};

type Props = {
  onConfirm: (comment: { text: string, emoji: string }) => void,
  onOpen: () => void,
  onUpdate?: () => void
};

class Tip extends Component<Props, State> {
  state = {
    compact: true,
    itemNo: 0,
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
    const { compact, text, emoji, itemNo } = this.state;

    return (
      <div className="Tip">
        {compact ? (
          <div
            className="Tip__compact"
            onClick={() => {
              onOpen();
              var lastFileIndex = parseInt(localStorage.getItem("lastFileIndex") || 0) + 1;
              this.setState({ compact: false, text: "0000-0000-0000-" + lastFileIndex.toString().padStart(4, 0), itemNo: lastFileIndex });
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
                localStorage["lastFileIndex"] = itemNo;
              }}
            >
              <div>
                <div>
                  {text}
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
