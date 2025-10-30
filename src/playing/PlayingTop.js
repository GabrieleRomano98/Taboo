import { useEffect, useState } from 'react';
import { FaRegPauseCircle, FaRegPlayCircle } from 'react-icons/fa';

function TimeBar(props) {
  const unit = props.time.slice(-1);
  const amount = parseInt(props.time.slice(0, -1));
  const timeInSeconds = amount * (unit === "m" ? 60 : 1);
  const [timeLeft, setTimeLeft] = useState(timeInSeconds);
  const getPercentLeft = () => (timeLeft / timeInSeconds) * 100;
  const [intervalId, setIntervalId] = useState(null);
  useEffect(() => {
    if(!props.started) {
      clearInterval(intervalId);
      setTimeLeft(timeInSeconds);
      return;
    }
    if(intervalId) {
      clearInterval(intervalId);
    }
    setIntervalId(setInterval(() => {
      if(!props.paused) {
        setTimeLeft(prev => {
          if(prev > 0)
            return prev - 1;
          clearInterval(intervalId);
          props.timeUp();
          return 0;
        });
      }
    }, 1000));
  }, [props.paused, props.started]);
  const handlePause = () => {
    props.setPaused(true);
    clearInterval(intervalId);
  };
  const handleStart = () => props.setPaused(false);
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `0${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }
  const timebarStyle = {
    backgroundColor: props.redTurn ? "#f57b51" : "#589aff",
    width: `${getPercentLeft()}%`
  }
  return <div style={{flex: 1, padding: "0 20px"}}>
    {props.started && <>
      <div style={{fontSize: "20px"}}>
        <div>{props.paused ?
          <FaRegPlayCircle style={{marginRight: "10px"}} onClick={handleStart}/> : 
          <FaRegPauseCircle style={{marginRight: "10px"}} onClick={handlePause}/>}
        {formatTime(timeLeft)}</div>
      </div>
      <div className="timebar">
        <div className="timebar-content" style={timebarStyle}></div>
      </div>
    </>}
  </div>;
}

function PlayingTop(props) {
  const topStyle = {
    paddingTop: props.hidden ? "100vh" : "0"
  }
  return (
    <div className="playing-top" style={topStyle}>
      <div style={{fontSize: "42px", color: "#f57b51"}}>{props.points[0]}</div>
      <TimeBar  time={props.time} started={props.started}
                timeUp={props.timeUp} redTurn={props.redTurn}
                paused={props.paused} setPaused={props.setPaused} />
      <div style={{fontSize: "42px", color: "#589aff"}}>{props.points[1]}</div>
    </div>
  );
}

export default PlayingTop;