import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import FightingGame from './FightingGame';
import wizard from './images/newwizard.jpeg';
import goblin from './images/newgoblin.jpeg';
import special from './images/special.jpeg';
import normal from './images/normal.jpeg';
import firegoblin from './images/firegoblin.jpeg';

import mbi from './images/magicbookicon.jpeg';

import Sidebar from './components/Sidebar';

function App() {
  const [playerHealth, setPlayerHealth] = useState(100);
  const [enemyHealth, setEnemyHealth] = useState(100);
  const [goblinStatus, setGoblinStatus]= useState('normal');

  console.log(playerHealth, enemyHealth)

  return (
    <div className="app">
      <Sidebar mbi={mbi} normal = {normal}  special = {special}/>
      
      <div>
       

          <div className="player-hud" style={{ display: 'flex', flexDirection: 'row' }}>
            <img className="standard_image" src={wizard} alt="Wizard" />

            {/*Attacks location*/}
            
            <div className="attacks-container " style={{ display: 'flex', flexDirection: 'column' }}> 
       
            </div>
          {/*Gradient container*/}
          

         </div>
        <div style={{color:'white'}}>Player's health: {playerHealth}</div>
      </div>

      <FightingGame 
        playerHealth={playerHealth}
        setPlayerHealth={setPlayerHealth} 
        enemyHealth={enemyHealth} 
        setEnemyHealth={setEnemyHealth}
        goblinStatus={goblinStatus} 
        setGoblinStatus={setGoblinStatus} />
      <div>
        <img className="standard_image" src={goblinStatus == 'normal' ? goblin : firegoblin } alt="Goblin" />
        <div style={{color:'white'}}>Goblin's health: {enemyHealth}</div>
      </div>
    
      </div>
    
  );
}

export default App;



