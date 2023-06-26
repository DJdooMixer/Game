import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import FightingGame from './FightingGame';
import wizard from './images/wizard.jpeg';
import goblin from './images/goblin.jpeg';
import special from './images/special.jpeg';
import normal from './images/normal.jpeg';

function App() {
  const [playerHealth, setPlayerHealth] = useState(100);
  const [enemyHealth, setEnemyHealth] = useState(100);

  console.log(playerHealth, enemyHealth)

  return (
    <div className="app">
      <div>
       

          <div className="player-hud" style={{ display: 'flex', flexDirection: 'row' }}>
            <img className="standard_image" src={wizard} alt="Wizard" />

            {/*Attacks location*/}
            
            <div className="attacks-container" style={{ display: 'flex', flexDirection: 'column' }}>
              <img className="special standard_image" src={special} alt="Cooldown" />
              <img className="normal standard_image" src={normal} alt="Cooldown" />
            </div>
          {/*Gradient container*/}
          

         </div>
        <div>Player's health: {playerHealth}</div>
      </div>
      <FightingGame 
        playerHealth={playerHealth}
        setPlayerHealth={setPlayerHealth} 
        enemyHealth={enemyHealth} 
        setEnemyHealth={setEnemyHealth} />
      <div>
        <img className="standard_image" src={goblin} alt="Goblin" />
        <div>Goblin's health: {enemyHealth}</div>
      </div>
    
      </div>
    
  );
}

export default App;



