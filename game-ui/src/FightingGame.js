import React, { useState, useEffect } from 'react';
import special from './images/special.jpeg';

function FightingGame({ playerHealth, setPlayerHealth, enemyHealth, setEnemyHealth }) {
  const [playerName, setPlayerName] = useState('');
  const [attackCount, setAttackCount] = useState(0);
  const [gameLog, setGameLog] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [specialAttackCooldown, setSpecialAttackCooldown] = useState(false);

  useEffect(() => {
    const cooldownTimeout = setTimeout(() => {
      setSpecialAttackCooldown(false);
    }, 3000);

    return () => {
      clearTimeout(cooldownTimeout);
    };
  }, [specialAttackCooldown]);

  function displayHealth(playerHealth, enemyHealth) {
    const playerHealthBar = document.getElementById('player-health');
    const enemyHealthBar = document.getElementById('enemy-health');

    if (playerHealthBar && enemyHealthBar) {
      playerHealthBar.style.width = `${playerHealth}%`;
      enemyHealthBar.style.width = `${enemyHealth}%`;
    }
  }

  function logMessage(message) {
    setGameLog(prevLog => [...prevLog, message]);

    setPlayerHealth(prevPlayerHealth => prevPlayerHealth - 1); // Wizard does 1 damage
    setEnemyHealth(prevEnemyHealth => prevEnemyHealth - 10); // Goblin does 10 damage
  }

  function attack(target, attackerName, targetName, damage) {
    let updatedTarget = target - damage;
    if (updatedTarget < 0) {
      updatedTarget = 0;
    }

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
    setAttackCount(0);
    setPlayerHealth(100);
    setEnemyHealth(100);
    logMessage(`Welcome, ${playerName}! The battle begins!`);
  }

  function handleNormalAttack() {
    const playerDamage = Math.floor(Math.random() * 20) + 1;
    const goblinDamage = Math.floor(Math.random() * 10) + 1;

    let updatedEnemyHealth = attack(enemyHealth, playerName, 'Goblin', playerDamage);

    if (updatedEnemyHealth === 0) {
      logMessage(`Congratulations, ${playerName}! You defeated the Goblin!`);
      setGameWon(true);
      setGameOver(true);
      setGameStarted(false);
    } else {
      let updatedPlayerHealth = attack(playerHealth, 'Goblin', playerName, goblinDamage);

      if (updatedPlayerHealth === 0) {
        logMessage(`Game over, ${playerName}! You were defeated by the Goblin.`);
        setGameWon(false);
        setGameOver(true);
        setGameStarted(false);
      }
    }

    setAttackCount(prevCount => prevCount + 1);
  }

  function handleSpecialAttack() {
    if (specialAttackCooldown) {
      return;
    }

    const playerDamage = Math.floor(Math.random() * 30) + 10;
    const goblinDamage = Math.floor(Math.random() * 10) + 1;

    let updatedEnemyHealth = attack(enemyHealth, playerName, 'Goblin', playerDamage);

    if (updatedEnemyHealth === 0) {
      logMessage(`Congratulations, ${playerName}! You defeated the Goblin!`);
      setGameWon(true);
      setGameOver(true);
      setGameStarted(false);
    } else {
      let updatedPlayerHealth = attack(playerHealth, 'Goblin', playerName, goblinDamage);

      if (updatedPlayerHealth === 0) {
        logMessage(`Game over, ${playerName}! You were defeated by the Goblin.`);
        setGameWon(false);
        setGameOver(true);
        setGameStarted(false);
      }
    }

    setAttackCount(prevCount => prevCount + 1);
    setSpecialAttackCooldown(true);
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
          />
          <button onClick={startGame}>Start</button>
        </div>
      )}
      {gameStarted && !gameOver && (
        <div>
         
            <div className="health-bar-container">
              <div id="player-health" className="health-bar-progress" />
            
        
      
            <div className="health-bar-container">
              <div id="enemy-health" className="health-bar-progress" />
            </div>
          </div>
          <div>
            <button onClick={handleNormalAttack}>Normal Attack</button>
            <button onClick={handleSpecialAttack}>Special Attack</button>
            
          </div>
          <div className="game-log">
            <h2>Game Log</h2>
            {gameLog.map((log, index) => (
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
