
import { useEffect, useState } from 'react';
import { IoIosShareAlt } from "react-icons/io";
import { ImCross } from "react-icons/im";
import { FaCheck } from 'react-icons/fa';
import { Button } from '../various/Button';
import italianWords from '../data/italianWords.js';
import { useNavigate } from 'react-router-dom';

const wordsLength = 623;
const randomIndexes = Array.from({length: wordsLength},
                                 (_, i) => i).sort(() => Math.random() - 0.5);

function Card(props) {
  const [dragPosition, setDragPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [animationDirection, setAnimationDirection] = useState(0);
  const [animationType, setAnimationType] = useState('horizontal');

  const handleDragStart = (client) => {
    if (!props.isTopCard) return;
    setIsDragging(true);
    setStartPosition(client);
  };

  const handleDragMove = (client) => {
    if (!isDragging) return;
    const delta = client - startPosition;
    setDragPosition(delta);
  };

  const triggerAnimation = (direction, type = 'horizontal', callback) => {
    setAnimationDirection(direction);
    setAnimationType(type);
    setIsAnimatingOut(true);
    setIsDragging(false);
    setTimeout(() => {
      callback();
    }, 500);
  };

  useEffect(() => {
    if (props.trigger && props.isTopCard) {
      switch (props.trigger.type) {
        case 'correct':
          triggerAnimation(1, 'horizontal', props.correctAnswer);
          break;
        case 'wrong':
          triggerAnimation(-1, 'horizontal', props.wrongAnswer);
          break;
        case 'skip':
          triggerAnimation(1, 'vertical', props.skipAnswer);
          break;
        default:
          break;
      }
    }
  }, [props.trigger]);

  const handleDragEnd = () => {
    if (!isDragging) return;

    const swipeThreshold = 170;
    const fastSwipeThreshold = 70;
    const swipeVelocity = Math.abs(dragPosition) / 100;
    
    if (dragPosition > swipeThreshold || (dragPosition > fastSwipeThreshold && swipeVelocity > 0.5)) {
      triggerAnimation(1, 'horizontal', props.correctAnswer);
    } else if (dragPosition < -swipeThreshold || (dragPosition < -fastSwipeThreshold && swipeVelocity > 0.5)) {
      triggerAnimation(-1, 'horizontal', props.wrongAnswer);
    } else if(!isAnimatingOut) {
      setIsDragging(false);
      setDragPosition(0);
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };
  const handleMouseMove = (e) => {
    handleDragMove(e.clientX);
  };
  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    handleDragStart(touch.clientX);
  };
  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    handleDragMove(touch.clientX);
  };
  const handleTouchEnd = () => {
    handleDragEnd();
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, startPosition]);

  const rotation = dragPosition * 0.1;

  let finalX = dragPosition;
  let finalY = 0;
  let finalRotation = rotation;

  if (isAnimatingOut) {
    if (animationType === 'vertical') {
      finalX = 0;
      finalY = window.innerHeight * 1.5;
      finalRotation = 0;
    } else {
      finalX = animationDirection * window.innerWidth * 1.5;
      finalY = -200;
      finalRotation = animationDirection * 30;
    }
  }

  const cardStyle = {
    translate: props.paused ? "-100vh 0" : `${finalX}px ${finalY}px`,
    transform: `rotate(${finalRotation}deg)`,
    transition: isDragging ? "none" : 
      isAnimatingOut ? "translate 0.5s ease-in, transform 0.5s ease-in" :
      "translate 0.5s ease-in-out, transform 0.3s ease-out",
    cursor: props.isTopCard ? (isDragging ? 'grabbing' : 'grab') : 'default',
    userSelect: 'none',
    pointerEvents: props.isTopCard ? 'auto' : 'none'
  };

  const combinedStyle = {
    ...cardStyle,
    zIndex: props.isTopCard ? 2 : 1,
  };

  return (
    <div 
      style={combinedStyle} 
      className={`game-card ${props.className}`}
      onMouseDown={props.isTopCard ? handleMouseDown : undefined}
      onTouchStart={props.isTopCard ? handleTouchStart : undefined}
      onTouchMove={props.isTopCard ? handleTouchMove : undefined}
      onTouchEnd={props.isTopCard ? handleTouchEnd : undefined}
    >
      <div className='card-title'>{props.word.word}</div>
      {props.word.taboos.map((tabooWord, i) => (
        <div key={i + props.word.word} className="taboo-word">{tabooWord}</div>
      ))}
    </div>
  );
}

function PlayingBottom(props) {
  const [currentCardIndex, setCurrentCardIndex] = useState(props.index);
  const [nextCardIndex, setNextCardIndex] = useState((props.index + 1) % wordsLength);
  const [animationTrigger, setAnimationTrigger] = useState(null);
  const [limitLeft, setLimitLeft] = useState(props.limit);
  
  const advanceToNextCard = () => {
    const newCurrentIndex = nextCardIndex;
    const newNextIndex = (nextCardIndex + 1) % wordsLength;
    setCurrentCardIndex(newCurrentIndex);
    setNextCardIndex(newNextIndex);
    props.setIndex(newCurrentIndex);
  };

  useEffect(() => {
    setTimeout(advanceToNextCard, 1000);
    if(props.redTurn || limitLeft === '∞' || limitLeft <= 0) {
      return;
    }
    setLimitLeft(props.limitType === "Turns" ? (limitLeft - 1)
                 : props.limit - Math.max(props.points[0], props.points[1]));

  }, [props.redTurn]);
  
  const handleStart = () => {
    if(!props.started) {
      props.setStarted(true);
    }
    props.setPaused(false);
  }
  const navigate = useNavigate();
  const handleQuit = () => {
    props.setHidden(true);
    setTimeout(() => navigate("/"), 500);
  };

  const startButtonStyle = {
    translate: props.paused ? 0 : "0 -50vh",
    transition: "translate 0.5s " + (!props.paused ? "ease-in-out":""),
  }
  const controlButtonsStyle = {
    translate: props.paused ? "0 50vh" : 0,
    transition: "translate 0.5s " + (props.paused ? "ease-in-out":"")
  };
  
  const correctAnswer = () => {
    advanceToNextCard();
    setAnimationTrigger(null);
    props.setPoints(p => props.redTurn ? [p[0] + 1, p[1]] : [p[0], p[1] + 1]);
  };
  const wrongAnswer = () => {
    advanceToNextCard();
    setAnimationTrigger(null);
    props.setPoints(p => props.redTurn ? [p[0] - 1, p[1]] : [p[0], p[1] - 1]);
  };
  const skipAnswer = () => {
    advanceToNextCard();
    setAnimationTrigger(null);
    if(props.skipsLeft !== "∞") {
      props.setSkipsLeft(v => v-1);
    }
  };

  const handleCorrectButton = () => {
    setAnimationTrigger({ type: 'correct', timestamp: Date.now() });
  };
  const handleWrongButton = () => {
    setAnimationTrigger({ type: 'wrong', timestamp: Date.now() });
  };
  const handleSkipButton = () => {
    if (props.skipsLeft <= 0) return;
    setAnimationTrigger({ type: 'skip', timestamp: Date.now() });
  };

  const winMessage =  props.points[0]===props.points[1] ? "It's a tie!" : 
                      (props.points[0] > props.points[1] ? "Red" : "Blue") + " team wins!"

  return (
    <div className="playing-bottom">
      { limitLeft === '∞' || limitLeft > 0 ?
        <Button className="resume-button" onClick={handleStart} style={startButtonStyle}
                color={"#18b385"} text={props.started ? "Resume" : "Start turn"}/>
        : <div className="quit-section" style={startButtonStyle}>
            <div className='winner-message'>{winMessage}</div>
            <Button className="resume-button quit-button" onClick={handleQuit}
                    color={"#9dadbc"} text="Quit"/>
          </div>
      }
      <div className='cards-container'>
        <Card 
          key={`next-${nextCardIndex}`}
          correctAnswer={correctAnswer} 
          wrongAnswer={wrongAnswer} 
          skipAnswer={skipAnswer}
          paused={props.paused} 
          word={italianWords[randomIndexes[nextCardIndex]]} 
          className="card-below"
          isTopCard={false}
          trigger={null}
        />
        <Card 
          key={`current-${currentCardIndex}`}
          correctAnswer={correctAnswer} 
          wrongAnswer={wrongAnswer} 
          skipAnswer={skipAnswer}
          paused={props.paused} 
          word={italianWords[randomIndexes[currentCardIndex]]} 
          className=""
          isTopCard={true}
          trigger={animationTrigger}
        />
      </div>
      <div className='buttons-container' style={controlButtonsStyle}>
        <Button onClick={handleWrongButton} className="control-button"
                color={"#f84f4fff"} text={<ImCross />}/>
        <Button onClick={handleSkipButton} className="control-button center-button"
                color={"#9dadbc"} text={<IoIosShareAlt />} disabled={props.skipsLeft <= 0} />
        <Button onClick={handleCorrectButton} className="control-button" style={{fontSize: "44px"}}
                color={"#18b385"} text={<FaCheck />}/>
      </div>
    </div>
  )
}

export default PlayingBottom;