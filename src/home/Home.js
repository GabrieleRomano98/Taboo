import { useState } from 'react';
import './home.css';
import { Carousel } from "react-bootstrap";
import { Button } from '../various/Button';
import { useNavigate } from 'react-router-dom';

function SettingsCarousel(props) {
  const elementStyle = {
    height: "100px",
    fontSize: "30px",
    fontWeight: "bold",
    marginTop: "-30px"
  };
  const onSelect = index => props.setSelected(props.values[index]);
  return (
    <Carousel className="mb-3" style={{width: "100%"}} interval={null} onSelect={onSelect}>
      {props.values.map((value, i) =>
        <Carousel.Item key={value + i}>
          <div className="d-flex justify-content-center align-items-center" style={elementStyle} >
            {value}
          </div>
        </Carousel.Item>
      )}
    </Carousel>
  );
}

function ControlLimitType(props) {
  const selectedStyle = {  textDecoration: "underline" };
  const unselectedStyle = { opacity: "50%" };
  const limitTypes = ["Turns", "Points"];
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
  const limSettingsValues = {
    Turns: [[2, 4, 6, 8, 10, "∞"], props.setLimitTurns],
    Points: [[20, 30, 50, 100, "∞"], props.setLimitPoints]
  };
  const [limSettings, setLimSettings] = useState(limSettingsValues.Turns);
  const switchLimType = type => {
    setLimSettings(limSettingsValues[type]);
    props.setLimitType(type)
  }
  const settings = [
    ["Time",  ["00:30", "01:00", "02:00", "03:00", "05:00"], props.setTime],
    ["Skips", [0, 5, 10, 15, "∞"], props.setSkips],
  ];
  const settingsLabelStyle = {fontSize: "35px", color: "#f9f871"};
  const navigate = useNavigate();
  const startGame = () => {
    navigate("/playing");
  };
  return ( 
    <div className="container unselectable">
      {settings.map(setting =><div style={{width: "100%"}} key={setting[0]}>
        <div style={settingsLabelStyle}>{setting[0]}</div>
        <SettingsCarousel values={setting[1]} setSelected={setting[2]}/>
      </div>)}
      <div style={{width: "100%"}}  key={"Limit"}>
        <div style={settingsLabelStyle}>Limit</div>
        <ControlLimitType selected={props.limitType} setSelected={switchLimType} />
        <SettingsCarousel values={limSettings[0]} setSelected={limSettings[1]}/>
      </div>
      <Button className="start-button" onClick={startGame} color={"#18b385"} text={"Start"}/>
    </div>
  );
}

export default Home