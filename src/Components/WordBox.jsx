import React, { useState } from "react";
import "./WordBox.css";

const WordBox = (props) => {
  const { letter, state, cb } = props;

  return (
    <>
      {state === 0 && <div className="wordBox" onClick={cb}>{letter.toUpperCase()}</div>}
      {state === 1 && <div className="wordBox badBox" onClick={cb}>{letter.toUpperCase()}</div>}
      {state === 2 && <div className="wordBox goodBox" onClick={cb}>{letter.toUpperCase()}</div>}
    </>
  );
};

export default WordBox;
