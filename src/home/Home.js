import { useEffect, useState } from 'react';
import { Button } from '../various/Button';
import { useNavigate } from 'react-router-dom';
import './home.css';

function Settings(props) {
  const elementStyle = {
    height: "100px",
    fontSize: "30px",
    fontWeight: "bold",
    marginTop: "-30px",
    cursor: "pointer"
  };
  const onSelect = index => props.setSelected(props.values[index]);
  return (
    <div style={{display: "flex", justifyContent: "space-around", marginTop: "25px"}}>
      {props.values?.map((value, i) =>
        <div key={value + i} style={{...elementStyle, opacity: props.selected === value ? 1 : 0.5}} onClick={() => onSelect(i)}>
          {value}
        </div>
      )}
    </div>
  );
}

function ControlLimitType(props) {
  const selectedStyle = {  textDecoration: "underline" };
  const unselectedStyle = { opacity: "50%" };
  const limitTypes = ["Turns", "Points", "No limits"];
  return (
    <div style={{display: "flex", justifyContent: "space-around", fontSize: "30px"}}>
      {limitTypes.map(type => 
        <div style={props.selected===type? selectedStyle : unselectedStyle} key={type}
          onClick={() => props.setSelected(type)}>{type}</div>
      )}
    </div>
  );
}

function Home(props) {
  const [starting, setStarting] = useState(true);
  useEffect(() => {
    setTimeout(() => setStarting(false), 40);
  }, []);
  const limSettingsValues = {
    Turns: [[2, 3, 5, 10, 15], props.setLimitTurns, props.limitTurns],
    Points: [[15, 20, 30, 50], props.setLimitPoints, props.limitPoints],
    "No limits": [[null], () => {}, null]
  };
  const settings = [
    ["Time",  ["30s", "1m", "2m", "3m", "5m"], props.setTime, props.time],
    ["Skips", [0, 1, 3, 5, "∞"], props.setSkips, props.skips]
  ];
  const settingsLabelStyle = {fontSize: "35px", color: "#f9f871"};
  const navigate = useNavigate();
  const startGame = () => {
    setStarting(true);
    setTimeout(() => navigate("/playing"), 500);
  };
  const settingsGroupStyle = i => ({ translate: starting && `${(i*2-1)*100}vh 0` });
  return (
    <div className="container unselectable">
      {settings.map((setting, i) =>
        <div className='settings-group' style={settingsGroupStyle(i)} key={setting[0]}>
          <div style={settingsLabelStyle}>{setting[0]}</div>
          <Settings values={setting[1]} setSelected={setting[2]} selected={setting[3]}/>
        </div>
      )}
      <div className='settings-group' style={settingsGroupStyle(0)} key={"Limit"}>
        <div style={settingsLabelStyle}>Limit</div>
        <ControlLimitType selected={props.limitType} setSelected={props.setLimitType} />
        <Settings values={limSettingsValues[props.limitType]?.[0]}
                  setSelected={limSettingsValues[props.limitType]?.[1]}
                  selected={limSettingsValues[props.limitType]?.[2]}/>
      </div>
      <Button className="start-button" onClick={startGame}
              color={"#18b385"} text={"Start"} style={{translate: starting && `0 100vh`}}/>
    </div>
  );
}

export default Home