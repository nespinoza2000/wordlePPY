let intentos = 6;
let diccionario = ['PERLA', 'PERAS', 'CARRO', 'LUJOS', 'LOBOS', 'LUCIA', 'NICOL', 'AVION', 'VOLAR', 'JUEGO']
let palabra = diccionario[Math.floor(Math.random() * diccionario.length)];

fetch('https://random-word-api.herokuapp.com/word?length=5&lang=en')
 	.then(response => response.json())
 	.then(response => {
         console.log(response)
         palabra = response[0].toUpperCase()
     })
 	.catch(err => console.error(err));

window.addEventListener('load', init)
function init(){
    console.log('Esto se ejecuta solo cuando se carga la pagina web')
}

function intentar(){
    const INTENTO = leerIntento();
    if (INTENTO === palabra ) {
        terminar("<h1>GANASTE</h1>");
        mostrarPalabraCorrecta();
        return
    }
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';
    for (let i in palabra){
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        if (INTENTO[i]===palabra[i]){
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'green'
        } else if( palabra.includes(INTENTO[i]) ) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'yellow';
        } else {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'red';
        }
        ROW.appendChild(SPAN)
    }
    GRID.appendChild(ROW)
		intentos--
    if (intentos==0){
        terminar("<h1>PERDISTE</h1>")
        mostrarPalabraCorrecta();
    }
}

function mostrarPalabraCorrecta() {
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `<p>La palabra correcta era: ${palabra}</p>`;
}

const button = document.getElementById("guess-button");
button.addEventListener("click", intentar);
const input = document.getElementById("guess-input");
const valor = input.value;

function leerIntento(){
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase(); 
    return intento;
}

function terminar(mensaje){
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    button.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}

Math.floor(Math.random() * 10) + 1;


