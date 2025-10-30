import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './home/Home.js';
import { useState } from 'react';
import Playing from './playing/Playing.js';

function App() {
  const [time, setTime] = useState("30s");
  const [skips, setSkips] = useState(0);
  const [limitType, setLimitType] = useState("Turns");
  const [limitTurns, setLimitTurns] = useState(2);
  const [limitPoints, setLimitPoints] = useState(20);
  const [index, setIndex] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <div>Taboo</div>
      </header>
      <BrowserRouter><Routes>

        <Route path="/" element={<Home  time={time} setTime={setTime}
                                        skips={skips} setSkips={setSkips}
                                        limitType={limitType} setLimitType={setLimitType}
                                        limitTurns={limitTurns} setLimitTurns={setLimitTurns}
                                        limitPoints={limitPoints} setLimitPoints={setLimitPoints}/>}/>
        <Route path="/playing" element={<Playing  index={index} setIndex={setIndex}
                                                  time={time} skips={skips} limitType={limitType}
                                                  limit={limitType==="Turns" ? limitTurns+1 : limitPoints}/>}/>
      </Routes></BrowserRouter>
    </div>
  );
}

export default App;
