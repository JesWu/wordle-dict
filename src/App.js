import React, { useEffect, useState } from "react";
import "./App.css";
import WordBox from "./Components/WordBox.jsx";
import ResBox from "./Components/ResBox";
import { WordleDict } from "./Components/Helpers";
import RefreshIcon from "./refresh.svg";

function App() {
  const [tMap, setTMap] = useState([
    ["", 0],
    ["", 0],
    ["", 0],
    ["", 0],
    ["", 0],
  ]);
  const [ts, setTS] = useState([]);
  const [wd, setWD] = useState(null);
  const [res, setRes] = useState([]);

  const mapVal = (val) => {
    const { key } = val;

    if ("a" <= key && key <= "z") {
      for (let i = 0; i < tMap.length; i++) {
        if (tMap[i][0] === "") {
          tMap[i][0] = key;
          setTMap([...tMap]);
          break;
        }
      }
    } else if (key === "Backspace") {
      for (let i = tMap.length - 1; i >= 0; i--) {
        if (tMap[i][0] !== "") {
          tMap[i][0] = "";
          setTMap([...tMap]);
          break;
        }
      }
    } else if (key === "Enter") {
      enterValues();
    }
  };

  const enterValues = () => {
    if (!validSubmission()){
      return;
    }
    wd.setInfo(tMap);
    let ans = [];
    wd.findWords(ans);
    setRes(ans);
    ts.push(tMap);
    setTS([...ts]);
    setTMap([
      ["", 0],
      ["", 0],
      ["", 0],
      ["", 0],
      ["", 0],
    ]);
  };

  const validSubmission = () => {
    for (const data of tMap){
      if(data[0] === ""){
        return false;
      }
    }
    return true;
  }

  const sCb = (p) => {
    if (tMap[p][0]) {
      tMap[p][1] = (tMap[p][1] + 1) % 3;
      setTMap([...tMap]);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", mapVal, false);
    return () => {
      document.removeEventListener("keydown", mapVal, false);
    };
  });

  useEffect(() => {
    setWD(new WordleDict());
  }, []);

  return (
    <div className="App">
      <div className="Left">
        {ts.length > 0 && <h1>Entered Words:</h1>}
        {ts.length > 0 && (
          <div className="historyContainer">
            {ts.map((d) => {
              return (
                <div className="historyDiv">
                  {d.map((data, idx) => {
                    const letter = data[0];
                    const state = data[1];
                    return (
                      <React.Fragment key={idx}>
                        <WordBox letter={letter} state={state} />
                      </React.Fragment>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="Center">
        <div className="AppHeader">Wordle Dictionary</div>
        <div className="typeableDiv">
          {tMap.map((data, idx) => {
            const letter = data[0];
            const state = data[1];
            return (
              <React.Fragment key={idx}>
                <WordBox
                  letter={letter}
                  state={state}
                  cb={() => {
                    sCb(idx);
                  }}
                />
              </React.Fragment>
            );
          })}
        </div>
        <div className="buttonDiv">
          <button
            className="button submit"
            onClick={() => {
              enterValues();
            }}
          >
            Submit
          </button>
          <button
            className="button"
            onClick={() => {
              setTMap([
                ["", 0],
                ["", 0],
                ["", 0],
                ["", 0],
                ["", 0],
              ]);
              setTS([]);
              setRes([]);
            }}
          >
            <img alt="refresh" className="refresh" src={RefreshIcon} />
          </button>
        </div>
      </div>
      <div className="Right">
        {res.length > 0 && <h1>Possibilites:</h1>}
        <ResBox res={res} />
      </div>
    </div>
  );
}

export default App;
