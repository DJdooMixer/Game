import React, { useState, useEffect } from 'react';
import special from './images/special.jpeg';

// Max possible damage
const attackSheet = {
  wizard: {
    normal: 20,
    special: 30,
    extraSpecial: 1000,
  
  },
  goblin: {
    normal: 20,
  },

  firegoblin: { 

  }
  
}

function FightingGame({ playerHealth, setPlayerHealth, enemyHealth, setEnemyHealth, goblinStatus, setGoblinStatus }) {
  const [playerName, setPlayerName] = useState('');
  const [gameLog, setGameLog] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [specialAttackReady, setSpecialAttackReady] = useState(false);
  const [normalAttackCount, setNormalAttackCount] = useState(0);
  const [effectTurns, setEffectTurns] = useState(0);

  useEffect(() => {
    // Apply the lingering effect each turn if it's active
    if (effectTurns > 0) {
      const effectDamage = 5; // Change this value as per your requirement
      setEnemyHealth((prevEnemyHealth) => prevEnemyHealth - effectDamage);
      logMessage(`The lingering effect deals ${effectDamage} damage!`);

      // Decrease the number of turns remaining for the effect
      setEffectTurns((prevTurns) => prevTurns - 1);
    }

    // ... other effects and hooks ...
  }, [effectTurns, setEnemyHealth, logMessage]); // Include any dependencies that this effect uses

  function displayHealth(playerHealth, enemyHealth) {
    const playerHealthBar = document.getElementById('player-health');
    const enemyHealthBar = document.getElementById('enemy-health');

    if (playerHealthBar && enemyHealthBar) {
      playerHealthBar.style.width = `${playerHealth}%`;
      enemyHealthBar.style.width = `${enemyHealth}%`;
      
    }
  }

  function logStartMessage(message) {
    setGameLog(prevLog => [...prevLog, message]);
  }

  function logMessage(message) {
    setGameLog(prevLog => [...prevLog, message]);
  }


  function activateLingeringEffect() {
    // Check if the effect is active
    if (effectTurns > 0) {
      // The effect is already active, no need to activate again
      return;
    }

    // Check the chance for the effect to activate (e.g., 5% chance)
    const effectChance = Math.random() * 100;
    if (effectChance <= 5) {
      // Activate the effect for 2 turns (you can adjust the number of turns as needed)
      setEffectTurns(2);
    }
  }

  function attack(target, attackerName, targetName, damage) {
    let updatedTarget = target - damage;
    if (updatedTarget < 0) {
      updatedTarget = 0;
      if (effectTurns > 0) {
    }}

    displayHealth(playerHealth, enemyHealth);
    logMessage(`${attackerName} attacked ${targetName} and dealt ${damage} damage!`);
    return updatedTarget;
  }

  function startGame() {
    if (playerName.trim() === '' || !/^[a-zA-Z]+$/.test(playerName)) {
      alert('Please enter a valid name (letters only) to start the game.');
      return;
    }

    setGameStarted(true);
    setGameOver(false);
    setGameLog([]);
    setPlayerHealth(100);
    setEnemyHealth(100);
    console.log(playerHealth) 
    logStartMessage(`Welcome, ${playerName}! The battle begins!`);
  }

  function handleNormalAttack() {
    const playerDamage = Math.floor(Math.random() * attackSheet.wizard.normal) + 1;
    const goblinDamage = Math.floor(Math.random() * attackSheet.goblin.normal) + 1;

    // IDEA: Try to experiment with how the state change works
    if (Math.random() > 0.5) {
      setGoblinStatus('fuego')
    } else {
      setGoblinStatus('normal')
    }

    let updatedEnemyHealth = attack(enemyHealth, playerName, 'Goblin', playerDamage);
      console.log(updatedEnemyHealth)
    if (updatedEnemyHealth === 0 || updatedEnemyHealth <0 ) {
      logMessage(`Congratulations, ${playerName}! You defeated the Goblin!`);
      setGameWon(true);
      setGameOver(true);
      setGameStarted(false);
    } else {
      let updatedPlayerHealth = attack(playerHealth, 'Goblin', playerName, goblinDamage);



      if (updatedPlayerHealth === 0  || updatedPlayerHealth  <0) {
        logMessage(`Game over, ${playerName}! You were defeated by the Goblin.`);
        setGameWon(false);
        setGameOver(true);
        setGameStarted(false);
        setPlayerHealth(prevPlayerHealth => prevPlayerHealth - goblinDamage);
        setEnemyHealth(prevEnemyHealth => prevEnemyHealth - playerDamage);
      
      // Check if the effect is active
      if (effectTurns > 1) {
      // Check the chance for the effect to activate
      const effectChance = Math.random() * 100;
      if (effectChance <= 2) {
        // Activate the effect for 2 turns
        setEffectTurns(2);
      
         {
     
        }
      }
      activateLingeringEffect();

    const effectDamage = 5; // Change this value as per your requirement
    setEnemyHealth(prevEnemyHealth => prevEnemyHealth - effectDamage);
    logMessage(`The lingering effect deals ${effectDamage} damage!`);

    // Decrease the number of turns remaining for the effect
    setEffectTurns(prevTurns => prevTurns - 1);}
  

       
      }
    }


    setNormalAttackCount(prevCount => prevCount + 1);
    if (normalAttackCount + 0 >= 2) {
      setSpecialAttackReady(true);
    }

    setPlayerHealth(prevPlayerHealth => prevPlayerHealth - goblinDamage); // Wizard is dealt 1-20 damage
    setEnemyHealth(prevEnemyHealth => prevEnemyHealth - playerDamage); // Goblin is dealt 1-20 damage
  }

  function activateLingeringEffect() {
    // Check if the effect is active
    if (effectTurns > 0) {
      // The effect is already active, no need to activate again
      return;
    }
  
    // Check the chance for the effect to activate (e.g., 5% chance)
    const effectChance = Math.random() * 100;
    if (effectChance <= 5) {
      // Activate the effect for 2 turns (you can adjust the number of turns as needed)
      setEffectTurns(2);
    }
  }
  

  function handleSpecialAttack() {
    if (!specialAttackReady) {
      return;
    }

    const playerDamage = Math.floor(Math.random() * attackSheet.wizard.special) + 10;
    const goblinDamage = Math.floor(Math.random() * attackSheet.goblin.normal);

    let updatedEnemyHealth = attack(enemyHealth, playerName, 'Goblin', playerDamage);

    if (updatedEnemyHealth === 0 || updatedEnemyHealth <0 ){
      logMessage(`Congratulations, ${playerName}! You defeated the Goblin!`);
      setGameWon(true);
      setGameOver(true);
      setGameStarted(false);
    } else {
      let updatedPlayerHealth = attack(playerHealth, 'Goblin', playerName, goblinDamage);

      if (updatedPlayerHealth === 0 || updatedPlayerHealth <0) {
        logMessage(`Game over, ${playerName}! You were defeated by the Goblin.`);
        setGameWon(false);
        setGameOver(true);
        setGameStarted(false);
        setSpecialAttackReady(false);
      }
    }

    // Reset Special Attack
    setNormalAttackCount(0);
    setSpecialAttackReady(false);
    // Then, do damage
    setPlayerHealth(prevPlayerHealth => prevPlayerHealth - goblinDamage); // Wizard is dealt 1-40 damage
    setEnemyHealth(prevEnemyHealth => prevEnemyHealth - playerDamage); // Goblin is dealt 1-40 damage
  }

 
  return (
    <div id="game-container">
      <h1>Welcome to the Battle Arena!</h1>
      {!gameStarted && !gameOver && (
        <div>
          <label htmlFor="player-name">Enter your name:</label>
          <input
            type="text"
            id="player-name"
            maxLength={20}
            value={playerName}
            onChange={e => setPlayerName(e.target.value.slice(0, 20))}
            style={{ fontSize: '24px' }}
          />
          <button onClick={startGame}>Start</button>
        </div>
      )}
      {gameStarted && !gameOver && (
        <div>
         
            <div className="health-bar-container">
              <div id="player-health" className="health-bar-progress" style={{ fontSize: '50px' }}
  />
            
        
      
            <div className="health-bar-container">
              <div id="enemy-health" className="health-bar-progress" />
            </div>
          </div>
          <div>
            <button onClick={handleNormalAttack}>Normal Attack</button>
            { specialAttackReady &&
              <button onClick={handleSpecialAttack}>Special Attack</button>
            }
            
          </div>
          <div className="game-log">
            <h2>Game Log</h2>
            {gameLog.reverse().map((log, index) => (
              <p key={index}>{log}</p>
            ))}
          </div>
        </div>
      )}
      {gameOver && (
        <div>
          <h2>{gameWon ? 'You Won!' : 'You Lost!'}</h2>
          <button onClick={() => window.location.reload()}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default FightingGame;
