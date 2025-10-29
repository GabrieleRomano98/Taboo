import { useState } from 'react';
import './various.css';

function Button(props) {
    const [down, setDown] = useState(false);
    const buttonStyle = { backgroundColor: props.color,
                          opacity: down ? "70%" : "100%",
                          color: "#dff1ff",
                          boxShadow: "6px 6px" + (props.lightBg ? "#282c3433" : "#dff1ff33"),
                          ...props.style };
    return (
      <div onClick={props.onClick}
              onTouchStart={() => setDown(true)}
              onTouchEnd={() => setDown(false)}
              className={props.className + " button-class unselectable"}
              style={buttonStyle}>
              {props.text}
      </div>
    );
}

export {
  Button
}