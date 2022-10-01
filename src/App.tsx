import { useState, useEffect } from "react";
import "./index.css";
const getRandomHex = () => {
  let hex = "#";
  const hexValues = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];
  for (let i = 0; i < 6; i++) {
    const index = Math.floor(Math.random() * hexValues.length);
    hex += hexValues[index];
  }
  return hex;
};
function App() {
  const [color, setColor] = useState<string>("");
  const [answer, setAnswer] = useState<string[]>();
  const [check, setCheck] = useState<boolean | undefined>(false);

  const processNext = () => {
    const correctColor = getRandomHex();
    setColor(correctColor);
    // setAnswer([correctColor, getRandomHex(), getRandomHex()]); // it done the first one is always correct
    // so we need to sort random so it will not be index 1 to guess
    setAnswer(
      [correctColor, getRandomHex(), getRandomHex()].sort(
        () => 0.5 - Math.random()
      )
    );
  };
  useEffect(() => {
    processNext();
  }, []);

  const handleAnswer = (answer: string) => {
    if (answer === color) {
      processNext();
      setCheck(true);
    } else {
      setCheck(false);
    }
  };
  return (
    <div className="App">
      <h1 className="heading">choose the correct color pallete</h1>
      <div className="box" style={{ background: color }}></div>
      <div className="show">
        {/* <p className="color">{color}</p> */}
        {answer?.map((ans, indx) => (
          <div key={indx} className="answer">
            <button className="ans" onClick={() => handleAnswer(ans)}>
              {ans}
            </button>
          </div>
        ))}
      </div>
      <p>{check === true && <span className="correct">correct ✅</span>}</p>
      <p>{check === false && <span className="wrong">wrong 😒</span>}</p>
    </div>
  );
}

export default App;
