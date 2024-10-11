// test link
console.log('test');

// Descrizione:
// Visualizzare in pagina 5 numeri casuali.
// Da lì parte un timer di 30 secondi.
// Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l'utente deve inserire i numeri che ha visto precedentemente, nell'ordine che preferisce.
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.
// NOTA: non è importante l'ordine con cui l'utente inserisce i numeri, basta che ne indovini il più possibile.


// tools:
// - variables
// - function
// - setInterval (timing funciton)
// - condition 
// - getelementbyid
// - innerhtml 
// - element.style




// 1) Genero 5 numeri random

// Funzione che genera numeri random
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Array dove si salveranno i numeri generati 
const randomNumbers = []
// ciclo for per reiterare la generazione per 5 numeri
for (let i = 0; i < 5; i++) {
    let generatorNumbers;
    // genera un numero finche non trovi un numero non presente nell'array
    do {
        generatorNumbers = getRandomInt(100);
    } while (randomNumbers.includes(generatorNumbers));
    // invia il numero unico nell'array
    randomNumbers.push(generatorNumbers)
}
// stampo l'array in console
// console.log(randomNumbers);

// Facciamo apparire i numeri in html
document.getElementById('numero0').innerText = randomNumbers[0]
document.getElementById('numero1').innerText = randomNumbers[1]
document.getElementById('numero2').innerText = randomNumbers[2]
document.getElementById('numero3').innerText = randomNumbers[3]
document.getElementById('numero4').innerText = randomNumbers[4]



// 2) Fai partire un timer di 30 secondi 

// Variabile timer
let timer = 10;

// set up dell'intervallo di iterazioni della funzione
const timerOn = setInterval(timerFunction, 1000);

// funzione timer
function timerFunction() {
    // decremento variabile timer
    timer--;
    console.log(timer);
    // faccio apparire il timer 
    document.getElementById('timer').innerText = timer

    // dopo i 30 secondi
    if (timer === 0) {
        //fermo il timer
        clearInterval(timerOn);
        // faccio apparire il tempo scaduto
        document.getElementById('timer').innerText = 'Tempo scaduto'
        console.log('Timer scaduto');

        // i numeri scompaiono
        document.getElementById('numero0').innerText = '?'
        document.getElementById('numero1').innerText = '?'
        document.getElementById('numero2').innerText = '?'
        document.getElementById('numero3').innerText = '?'
        document.getElementById('numero4').innerText = '?'

        // appaiono 5 input in cui inserire il numero
        document.getElementById('row-input').style.display = 'flex'


        // prendi i valori degli input e inseriscili in un'array
        // Aggiungi un event listener per il clic sul pulsante
        const submitButton = document.getElementById('submitButton');
        submitButton.addEventListener('click', function () {
            // nascondi gli input
            document.getElementById('row-input').style.display = 'none'
            // Seleziona gli input
            // const input0 = document.getElementById('input1').value;
            // const input1 = document.getElementById('input2').value;
            // const input2 = document.getElementById('input3').value;
            // const input3 = document.getElementById('input4').value;
            // const input4 = document.getElementById('input5').value;

            // faccio apparire row-result
            document.getElementById('row-result').style.display = 'flex'

            // Crea un array e salva i valori
            const userNumbers = [];
            for (let i = 1; i <= 5; i++) {
                let userNumber = parseInt(document.getElementById(`input${i}`).value);
                // check valori doppi
                if (userNumbers.includes(userNumber) !== true){
                    // aggiungo all'array solo numeri unici
                    userNumbers.push(userNumber); 
                }
            }
            // Stampa l'array nella console
            console.log(userNumbers);

            // confronta l'array generato random e quello con i valori dell'utente
            function controlloreNumeri(userNumbers, randomNumbers) {
                // array di numeri corretti
                const correctNumbers = [];
                for (let i = 0; i < userNumbers.length; i++) {
                    if (randomNumbers.includes(userNumbers[i])) {
                        correctNumbers.push(userNumbers[i]);
                        // ritorna il numero corretto nel box e cambia bgcolor
                        document.getElementById(`numero${i}`).innerText = userNumbers[i];
                        document.getElementById(`numero${i}`).style.color = 'white'
                        document.getElementById(`box${i}`).style.backgroundColor = 'green'
                        document.getElementById(`box${i}`).style.border = '1px solid green'
                    } else {
                        // ritorna il numero sbagliato nel box e cambia bgcolor
                        document.getElementById(`numero${i}`).innerText = userNumbers[i];
                        document.getElementById(`numero${i}`).style.color = 'white'
                        document.getElementById(`box${i}`).style.backgroundColor = 'red'
                        document.getElementById(`box${i}`).style.border = '1px solid red'
                    }
                }
                return correctNumbers;
            }
            // richiama funzione 
            const correctNumbers = controlloreNumeri(userNumbers, randomNumbers);
            const correctCount = correctNumbers.length;
            
            // stampa i risultati
            if (correctCount === 0) {
                document.getElementById('results').innerText = `Mantieni allenato il tuo cervello 😒 `;
                document.getElementById('soluzioni').innerText = `Ecco le soluzioni: [${randomNumbers}]`;
            } else if(correctCount >= 2) {
                document.getElementById('results').innerText = `Congratulazioni!👏 Hai memorizzato ${correctCount} numeri su 5`;
                document.getElementById('soluzioni').innerText = `Ecco le soluzioni: [${randomNumbers}]`;
            } else {
                document.getElementById('results').innerText = `Hai memorizzato ${correctCount} numero su 5`;
                document.getElementById('soluzioni').innerText = `Ecco le soluzioni: [${randomNumbers}]`;
            }

            // button refresh page gioca ancora
            let refresh = document.getElementById("refresh")

            refresh.addEventListener('click', function () {

                location.reload();
            })
        })
    }
}
