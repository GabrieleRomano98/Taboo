import { useState, useEffect } from 'react';
import PlayingBottom from './PlayingBottom.js';
import PlayingTop from './PlayingTop.js';
import './playing.css';

function Playing(props) {
  const [redTurn, setRedTurn] = useState(false);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(true);
  const [points, setPoints] = useState([0, 0]);
  const [skipsLeft, setSkipsLeft] = useState(props.skips);
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setHidden(false);
    }, 40);
  }, []);
  const timeUp = () => {
    setStarted(false);
    setRedTurn(!redTurn);
    setSkipsLeft(props.skips);
    setPaused(true);
  }
  const playStyle = {
    backgroundColor: !started ? "#dff1ff" : redTurn ? "#f57b51" : "#589aff" 
  }
  return (
    <div className="playing-container" style={playStyle}>
      <PlayingTop points={points} time={props.time}
                  redTurn={redTurn} setRedTurn={setRedTurn}
                  paused={paused} setPaused={setPaused}
                  started={started} timeUp={timeUp} hidden={hidden} />
      <PlayingBottom started={started} setStarted={setStarted} setHidden={setHidden}
                     paused={paused} setPaused={setPaused}
                     skipsLeft={skipsLeft} setSkipsLeft={setSkipsLeft}
                     index={props.index} setIndex={props.setIndex}
                     points={points} setPoints={setPoints} redTurn={redTurn}
                     limitType={props.limitType} limit={props.limit} />
    </div>
  );
}

export default Playing;