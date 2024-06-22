// opciones.js
document.addEventListener('DOMContentLoaded', () => {
    const options = ['Piedra', 'Papel', 'Tijera'];
    let intervalId;
    let currentComputerChoice = '';
    let playerScore = 0;
    let computerScore = 0;
    let empate = 0;
    let attemptsLeft = parseInt(document.getElementById('attempts').value) || 3;


    const empatElement = document.getElementById('empate');
    const resultElementComputer = document.getElementById('resultcomputadora');
    const resultElementPlayer = document.getElementById('resultplayer');
    const puntosjugador = document.getElementById('currentPlayer');
    const puntoscomputadora = document.getElementById('computer');
    const startButton = document.getElementById('start-game');
    const colorBox = document.getElementById('color-box');
    const attemptsElement = document.getElementById('attempts');
    const resetButton = document.getElementById('reset-game');


    startButton.addEventListener('click', () => {
       
        colorBox.style.backgroundColor = 'red';
        updateAttempts();
        
        // Generar elección aleatoria continuamente
        intervalId = setInterval(() => {
            currentComputerChoice = generateRandomChoice();
        }, 100);
    });


    resetButton.addEventListener('click', () => {
        // Restablecer todos los valores y el estado del juego
        attemptsLeft = parseInt(attemptsElement.value) || 3;
        attemptsElement.value = 3;
        playerScore = 0;
        computerScore = 0;
        empate = 0;
        startButton.disabled = false;
        colorBox.style.backgroundColor = '#ccc';
        resultElementComputer.textContent = 'Resultado computadora: ';
        resultElementPlayer.textContent = 'Resultado jugador: ';
        empatElement.textContent = 'Empate: 0';
        puntosjugador.textContent = 'Jugador: 0';
        puntoscomputadora.textContent = 'Computadora: 0';
        puntosjugador.classList.remove('winning');
        puntoscomputadora.classList.remove('winning');
    });


    
       
function updateAttempts() {
    let attemptsLeft = parseInt(attemptsElement.value) || 3;
    attemptsLeft--;
    attemptsElement.value = attemptsLeft;  // Actualizar el valor del input
    if (attemptsLeft <= 0) {
        alert("No te quedan intentos. Reinicia el juego.");
        startButton.disabled = true;
    }
}



   
function ganajugador(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            
            empate++;
            empatElement.textContent = 'Empate: ' + empate;
            
        } else if (
            (playerChoice === 'Piedra' && computerChoice === 'Tijera') ||
            (playerChoice === 'Papel' && computerChoice === 'Piedra') ||
            (playerChoice === 'Tijera' && computerChoice === 'Papel')
        ) { playerScore++;
            if(parseInt(playerScore)>parseInt(computerScore)) {
            puntosjugador.classList.add('winning');}
            puntoscomputadora.classList.remove('winning');
            puntosjugador.textContent = `Jugador: ${playerScore}`;
            puntoscomputadora.textContent = `Computadora: ${computerScore}`;;
        } else {
            computerScore++;
            if(parseInt(playerScore)<parseInt(computerScore)) {
                puntosjugador.classList.remove('winning');
                puntoscomputadora.classList.add('winning');}
           
            puntosjugador.textContent = `Jugador: ${playerScore}`;
            puntoscomputadora.textContent = `Computadora: ${computerScore}`;
        }
}

    document.querySelectorAll('.option-button').forEach(button => {
        button.addEventListener('click', () => {
            if (colorBox.style.backgroundColor === 'red') {
                clearInterval(intervalId);
                colorBox.style.backgroundColor = '#ccc';
                const playerChoice = button.textContent;
                if (playerChoice === 'Piedra') {
                    resultElementPlayer.textContent = 'Presionaste Roca';
                }
                 displayResult(playerChoice, currentComputerChoice);
                ganajugador(playerChoice, currentComputerChoice);
               
            }
        });
    });

    function generateRandomChoice() {
        const randomIndex = Math.floor(Math.random() * options.length);
        return options[randomIndex];
    }


    function displayResult(playerChoice, computerChoice) {
        resultElementPlayer.textContent = `Jugadr eligió: ${playerChoice}`;
        resultElementComputer.textContent = `Computadora eligió: ${computerChoice}`;
    }
});
