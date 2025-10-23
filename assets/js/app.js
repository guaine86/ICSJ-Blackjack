/**
 * Referencias
 * 2C = Two of Clubs (Treboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];
let puntosJugador = 0;

// Referencias al HTML
const btnPedir = document.querySelector('#btnPedir');
const mostrarPuntos = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');

// Funcion para crear el mazo
const crearDeck = ()=>{
    for(let i = 2; i <= 10; i++){
        for(let tipo of tipos){
            deck.push(i + tipo);
        }
    }

    for(let esp of especiales){
        for(let tipo of tipos){
            deck.push(esp + tipo);
        }
    }

    deck = _.shuffle(deck);
    // console.log(deck);
    return deck;
}
crearDeck();

// Funcion para pedir una carta
const pedirCarta = () => {

    if(deck.length === 0){
        throw "No hay mas cartas en el mazo!!";
    }
    
    const carta = deck.pop();
    return carta;
}

// Funcion para determinar el valor de la carta
const valorCarta = (carta)=>{
    const valor = carta.substring(0, carta.length - 1);
    // let puntos = 0;

    // if( isNaN(valor) ){
    //     puntos = (valor === 'A') ? 11 : 10;
        
    // }else{
    //     puntos = valor * 1;
    // }

    return ( isNaN(valor) ) ? 
                    valor === 'A' ? 11 : 10
                    : valor * 1;
 }

// Eventos
btnPedir.addEventListener('click', ()=>{
    const carta = pedirCarta();
    puntosJugador += valorCarta(carta);
    mostrarPuntos[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');

    divCartasJugador.appendChild(imgCarta);

    if(puntosJugador > 21){
        btnPedir.disabled = true;
        console.warn("Lo siento mucho peeero...PERDISTE!!");
    }else if(puntosJugador === 21){
        btnPedir.disabled = true;
        console.info("21!!!...GENIAL!!");
    }

    
}) 