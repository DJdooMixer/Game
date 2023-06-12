import React, { useState } from 'react';

function FightingGame({ playerHealth, setPlayerHealth, enemyHealth, setEnemyHealth }) {
  const [playerName, setPlayerName] = useState('');
  const [attackCount, setAttackCount] = useState(0);
  const [gameLog, setGameLog] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

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

    // IDEA: Handle damage system better
    setPlayerHealth(playerHealth - 1) // Wizard does 1
    setEnemyHealth(enemyHealth - 10) // Goblin does 10
  }

  function attack(target, attackerName, targetName, damage) {
    let updatedTarget = target - damage;
    if (updatedTarget < 0) {
      updatedTarget = 0;
    }

    console.log("playerHealth", "enemyHealth")
    console.log(playerHealth, enemyHealth)
    displayHealth();
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
    console.log('normal attack')
    let updatedEnemyHealth = attack(
      enemyHealth,
      playerName,
      'Enemy',
      Math.floor(Math.random() * 20) + 1
    );

    if (updatedEnemyHealth === 0) {
      logMessage(`Congratulations, ${playerName}! You defeated the enemy!`);
      setGameWon(true);
      setGameOver(true);
      setGameStarted(false);
    } else {
      let updatedPlayerHealth = attack(
        playerHealth,
        'Enemy',
        playerName,
        Math.floor(Math.random() * 15) + 1
      );

      if (updatedPlayerHealth === 0) {
        logMessage(`Game over, ${playerName}! You were defeated.`);
        setGameWon(false);
        setGameOver(true);
        setGameStarted(false);
      }
    }

    setAttackCount(prevCount => prevCount + 1);
  }

  function handleSpecialAttack() {
    if (attackCount >= 3) {
      let updatedEnemyHealth = attack(
        enemyHealth,
        playerName,
        'Enemy',
        Math.floor(Math.random() * 30) + 10
      );

      if (updatedEnemyHealth === 0) {
        logMessage(`Congratulations, ${playerName}! You defeated the enemy!`);
        setGameWon(true);
        setGameOver(true);
        setGameStarted(false);
      } else {
        let updatedPlayerHealth = attack(
          playerHealth,
          'Enemy',
          playerName,
          Math.floor(Math.random() * 15) + 1
        );

        if (updatedPlayerHealth === 0) {
          logMessage(`Game over, ${playerName}! You were defeated.`);
          setGameWon(false);
          setGameOver(true);
          setGameStarted(false);
        }
      }

      setAttackCount(0);
    }
  }

  function resetGame() {
    setPlayerName('');
    setPlayerHealth(100);
    setEnemyHealth(100);
    setGameLog([]);
    setAttackCount(0);
    setGameStarted(false);
    setGameOver(false);
    setGameWon(false);
  }

  return (
    <div id="game-container">
      <h1>Welcome to the Battle Arena!</h1>
      {!gameStarted && !gameOver && (
        <div id="name-container">
          <label htmlFor="player-name">Enter your name:</label>
          <input
            type="text"
            id="player-name"
            name="player-name"
            value={playerName}
            onChange={e => setPlayerName(e.target.value)}
          />
          <button id="start-button" onClick={startGame}>Start Game</button>
        </div>
      )}
      {gameStarted && (
        <>
          <div id="enemy-health-container">
            <div id="enemy-health"></div>
          </div>
          <div id="player-health-container">
            <div id="player-health"></div>
          </div>
          <div id="game-log">
            {gameLog.map((message, index) => (
              <p key={index}>{message}</p>
            ))}
          </div>
          <div id="attack-container">
            <button id="normal-attack" disabled={gameOver} onClick={handleNormalAttack}>Normal Attack</button>
            <button id="special-attack" disabled={gameOver || attackCount < 3} onClick={handleSpecialAttack}>Special Attack</button>
          </div>
        </>
      )}
      {gameOver && (
        <div id="result-container">
          <h2 id="result-message">
            {gameWon
              ? `Congratulations, ${playerName}! You defeated the enemy!`
              : `Game over, ${playerName}! You were defeated.`}
          </h2>
          <button id="play-again-button" onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default FightingGame;
