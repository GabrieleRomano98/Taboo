import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './home/Home.js';
import { useState } from 'react';
import Playing from './playing/Playing.js';

const baseUsersData = {
  red: {
    score: 0,
    usedSkips: 0
  },
  blue: {
    score: 0,
    usedSkips: 0
  }
}

function App() {
  const [time, setTime] = useState("00:30");
  const [skips, setSkips] = useState(0);
  const [limitType, setLimitType] = useState("Turns");
  const [limitTurns, setLimitTurns] = useState("2");
  const [limitPoints, setLimitPoints] = useState("20");
  const [team, setTeam] = useState("Red");
  const [usersData, setUsersData] = useState(baseUsersData);

  return (
    <div className="App">
      <header className="App-header">
        <div>Taboo</div>
      </header>
      <BrowserRouter><Routes>

        <Route path="/" element={<Home  setTime={setTime} setSkips={setSkips}
                                        limitType={limitType} setLimitType={setLimitType}
                                        setLimitTurns={setLimitTurns} setLimitPoints={setLimitPoints}/>}/>
        <Route path="/playing" element={<Playing  usersData={usersData} setUsersData={setUsersData}
                                                  time={time} skips={skips}/>}/>
        <Route path="/endturn" element={<div>endturn</div>}/>
      </Routes></BrowserRouter>
    </div>
  );
}

export default App;
