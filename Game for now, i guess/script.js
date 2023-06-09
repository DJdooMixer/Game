document.addEventListener("DOMContentLoaded", function() {
    var playerName = "";
    var playerHealth = 100;
    var enemyHealth = 100;

    function displayHealth() {
        document.getElementById("player-health").style.width = playerHealth / 2 + "%";
        document.getElementById("enemy-health").style.width = enemyHealth / 2 + "%";
    }

    function logMessage(message) {
        var log = document.getElementById("game-log");
        log.innerHTML += "<p>" + message + "</p>";
        log.scrollTop = log.scrollHeight;
    }

    function attack(target, attackerName, targetName, damage) {
        target -= damage;
        if (target < 0) {
            target = 0;
        }
        displayHealth();
        logMessage(attackerName + " attacked " + targetName + " and dealt " + damage + " damage!");
        return target;
    }

    function startGame() {
        playerName = document.getElementById("player-name").value;
        if (playerName.trim() === "") {
            alert("Please enter your name to start the game.");
            return;
        }

        document.getElementById("start-button").disabled = true;
        document.getElementById("normal-attack").disabled = false;
        document.getElementById("special-attack").disabled = false;

        logMessage("Welcome, " + playerName + "! The battle begins!");
    }

    document.getElementById("start-button").addEventListener("click", startGame);

    document.getElementById("normal-attack").addEventListener("click", function() {
        enemyHealth = attack(enemyHealth, playerName, "Enemy", Math.floor(Math.random() * 20) + 1);
        if (enemyHealth === 0) {
            logMessage("Congratulations, " + playerName + "! You defeated the enemy!");
            endGame(true);
        } else {
            playerHealth = attack(playerHealth, "Enemy", playerName, Math.floor(Math.random() * 15) + 1);
            if (playerHealth === 0) {
                logMessage("Game over, " + playerName + "! You were defeated.");
                endGame(false);
            }
        }
    });

    document.getElementById("special-attack").addEventListener("click", function() {
        enemyHealth = attack(enemyHealth, playerName, "Enemy", Math.floor(Math.random() * 30) + 10);
        if (enemyHealth === 0) {
            logMessage("Congratulations, " + playerName + "! You defeated the enemy!");
            endGame(true);
        } else {
            playerHealth = attack(playerHealth, "Enemy", playerName, Math.floor(Math.random() * 15) + 1);
            if (playerHealth === 0) {
                logMessage("Game over, " + playerName + "! You were defeated.");
                endGame(false);
            }
        }
    });

    function endGame(playerWon) {
        document.getElementById("normal-attack").disabled = true;
        document.getElementById("special-attack").disabled = true;

        var resultMessage = document.getElementById("result-message");
        if (playerWon) {
            resultMessage.textContent = "Congratulations, " + playerName + "! You defeated the enemy!";
        } else {
            resultMessage.textContent = "Game over, " + playerName + "! You were defeated.";
        }

        var resultContainer = document.getElementById("result-container");
        resultContainer.style.display = "block";
    }

    document.getElementById("play-again-button").addEventListener("click", function() {
        resetGame();
        document.getElementById("result-container").style.display = "none";
    });

    function resetGame() {
        playerName = "";
        playerHealth = 100;
        enemyHealth = 100;
        displayHealth();

        document.getElementById("player-name").value = "";
        document.getElementById("start-button").disabled = false;
        document.getElementById("normal-attack").disabled = true;
        document.getElementById("special-attack").disabled = true;

        var log = document.getElementById("game-log");
        log.innerHTML = "";
        log.scrollTop = 0;
    }
});
