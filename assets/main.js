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
        document.getElementById('box0').style.backgroundColor = 'black'
        document.getElementById('box1').style.backgroundColor = 'black'
        document.getElementById('box2').style.backgroundColor = 'black'
        document.getElementById('box3').style.backgroundColor = 'black'
        document.getElementById('box4').style.backgroundColor = 'black'

        // appaiono 5 input in cui inserire il numero
        document.getElementById('row-input').style.display = 'flex'


        // prendi i valori degli input e inseriscili in un'array
        // Aggiungi un event listener per il clic sul pulsante
        const submitButton = document.getElementById('submitButton');
        submitButton.addEventListener('click', function () {
            // Seleziona gli input
            const input0 = document.getElementById('input1').value;
            const input1 = document.getElementById('input2').value;
            const input2 = document.getElementById('input3').value;
            const input3 = document.getElementById('input4').value;
            const input4 = document.getElementById('input5').value;

            // Crea un array e salva i valori
            const userNumbers = [];
            for (let i = 1; i <= 5; i++) {
                userNumbers.push(parseInt(document.getElementById(`input${i}`).value));
            }        
            // Stampa l'array nella console
            // console.log(userNumbers);

            // confronta l'array generato random e quello con i valori dell'utente
            const correctNumbers = userNumbers.filter(num => randomNumbers.includes(num));
            const correctCount = correctNumbers.length;

            // stampa i risultati
            document.getElementById('results').innerText = `Hai indovinato ${correctCount} numeri: ${correctNumbers.join(', ')}`;
            console.log(`Hai indovinato ${correctCount} numeri su 5: ${correctNumbers.join(', ')}`);
        })
    }
}
