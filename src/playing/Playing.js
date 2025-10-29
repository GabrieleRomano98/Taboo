import { useState } from 'react';
import './playing.css';
import { FaRegPauseCircle } from 'react-icons/fa';
import { Button } from '../various/Button';

function TimeBar(props) {
  const handlePause = () => props.setPaused(true);
  const handleStart = () => props.setPaused(false);
  return <div style={{flex: 1, padding: "0 20px"}}>
    <div style={{fontSize: "20px"}}>
      {props.started && <FaRegPauseCircle style={{marginRight: "10px"}} onClick={handlePause}/>}{props.time}
    </div>
    <div className="timebar timebar-content">
      <div className="timebar-content" style={{backgroundColor: props.redTurn ? "#f57b51" : "#589aff" }} />
    </div>
  </div>;
}

function PlayingTop(props) {
  const [timeLeft, setTimeLeft] = useState(props.time);
  return (
    <div className="playing-top">
      <div style={{fontSize: "42px", color: "#f57b51"}}>{props.usersData.red.score}</div>
      <TimeBar time={timeLeft} setTime={setTimeLeft} started={props.started} redTurn={props.redTurn} setPaused={props.setPaused} />
      <div style={{fontSize: "42px", color: "#589aff"}}>{props.usersData.blue.score}</div>
    </div>
  );
}

function PlayingBottom(props) {
  const handleStart = () => {
    if(!props.started) {
      props.setStarted(true);
    }
    props.setPaused(false);
  }
  const startButtonText = props.started ? "Resume" : "Start turn";
  return (
    <div style={{paddingTop: "20px", textAlign: "center", display:"flex", flexDirection: "column"}}>
      <Button style={{width:"60%", fontSize: "36px", alignSelf: "center", translate: props.paused ? 0 : "0 -50vh", transition: "translate 0.5s " + (!props.paused ? "ease-in-out":"") }}
              onClick={handleStart} lightBg={true}
              color={"#18b385"} text={startButtonText}/>
    </div>
  )
}

function Playing(props) {
  const [redTurn, setRedTurn] = useState(false);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(true);
  return (
    <div className="playing-container" style={{backgroundColor: redTurn ? "#f57b51" : "#589aff" }}>
      <PlayingTop usersData={props.usersData} time={props.time} redTurn={redTurn} started={started} paused={paused} setPaused={setPaused}/>
      <PlayingBottom started={started} setStarted={setStarted} paused={paused} setPaused={setPaused}/>
    </div>
  );
}

export default Playing;