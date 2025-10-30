import { useState } from 'react';
import './various.css';

function Button(props) {
    const [down, setDown] = useState(false);
    const buttonStyle = { backgroundColor: props.color,
                          opacity: props.disabled ? "60%" : down ? "70%" : "100%",
                          color: "#dff1ff",
                          boxShadow: !props.disabled && !down && "6px 6px rgba(0, 0, 0, 0.5)",
                          translate: down ? "2px 2px" : "0 0",
                          ...props.style };
    return (
      <div onClick={() => !props.disabled && props.onClick()}
              onTouchStart={() => !props.disabled && setDown(true)}
              onTouchEnd={() => !props.disabled && setDown(false)}
              className={props.className + " button-class unselectable"}
              style={buttonStyle}>
              {props.text}
      </div>
    );
}

export {
  Button
}