// @flow

import React from "react";

import type { T_Highlight } from "../../src/types";
type T_ManuscriptHighlight = T_Highlight;

type Props = {
  highlights: Array<T_ManuscriptHighlight>,
  resetHighlights: () => void
};

const updateHash = highlight => {
  location.hash = `highlight-${highlight.id}`;
};

function Sidebar({ highlights, resetHighlights }: Props) {
  return (
    <div className="sidebar" style={{ width: "25vw", display: "none" }}>
      <div className="description" style={{ padding: "1rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>
          <a href="/home">SpareDox</a>
        </h2>

        <p style={{ fontSize: "0.7rem" }}>
          <a href="/home">
            Back
          </a>
        </p>

        <p>
          <small>
            To create area highlight hold Option key (Alt), then click and drag.
          </small>
        </p>

        <p>
          <small>
            <input type="file" />
          </small>
        </p>
      </div>

      <ul className="sidebar__highlights">
        {highlights.map((highlight, index) => (
          <li
            key={index}
            className="sidebar__highlight"
            onClick={() => {
              updateHash(highlight);
            }}
          >
            <div>
              <strong>{highlight.comment.text}</strong>
              {highlight.content.text ? (
                <blockquote style={{ marginTop: "0.5rem" }}>
                  {`${highlight.content.text.slice(0, 90).trim()}…`}
                </blockquote>
              ) : null}
              {highlight.content.image ? (
                <div
                  className="highlight__image"
                  style={{ marginTop: "0.5rem" }}
                >
                  <img src={highlight.content.image} alt={"Screenshot"} />
                </div>
              ) : null}
            </div>
            <div className="highlight__location">
              {/* Page {highlight.position.pageNumber} */}
              <a href="#" >Add to cart</a>
            </div>
          </li>
        ))}
      </ul>
      {highlights.length > 0 ? (
        <div style={{ padding: "1rem" }}>
          <a href="#" onClick={resetHighlights}>
            Reset Marked items
          </a>
        </div>
      ) : null}
    </div>
  );
}

export default Sidebar;
