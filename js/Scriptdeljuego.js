// En esta parte necesite ayuda para que sea mas formal la visualizacion del juego Lic.
// Montamos el canvas con alta resolución
var canvas = document.getElementById("canvas");
canvas.width = 1220 * 2;
canvas.height = 400 * 2;
canvas.style.width = 1220 + "px";
canvas.style.height = 400 + "px";
var ctx = canvas.getContext("2d");
// Clase carta
class carta {
	// las variables static pertenece a la clase
	static x = 50;
	static y = 50;
	constructor(valor, palo) {
		this.img = new Image();
		this.valor = valor;
		this.palo = palo;
	}
}
function dibujarCarta(CJ) {
	// Tenemos que primero cargar la carta y luego añadir el src
	// Si no las cartas no cargan en la pagina
	CJ.img.onload = () => {
		ctx.drawImage(CJ.img, carta.x, carta.y, 239, 335);
		carta.x += 300;
	};
	// Para cargar la imagen correcta concatenamos el numero y el palo, que coincida con el nombre del fichero
	// lo que hacemos aqui es concatenar el nombre del archivo, para que segun la carta que le salio nos de el nombre de la imagen correspondiente
	CJ.img.src = "imagenes/cartas/" + CJ.valor.toString() + CJ.palo + ".svg";
}
function pedirCarta() {
	// Ponemos un maximo de cartas que pueda sacar para que el crupier tambíen pueda sacar las suyas
	if (indiceCarta < 8) {
		let CJ = cartas[indiceCarta]; //Carta Jugada
		cartasJugador.push(CJ);
		dibujarCarta(CJ);
		indiceCarta++;
	}
}
function plantarme() {
	document.getElementById("pedir").disabled = true;
	document.getElementById("plantar").disabled = true;
	document.getElementById("reset").style.visibility = "visible";
	let PuntosdelJugador = 0;
	let PuntosdelCrupier = 0;
	let info = document.getElementById("info");
	// Contamos e imprimimos los puntos del jugador
	for (i in cartasJugador) {
		PuntosdelJugador += cartasJugador[i].valor;
	}
	// Sacamos cartas al crupier y contamos sus puntos
	while (PuntosdelCrupier < 17) {
		cartasCrupier.push(cartas[indiceCarta]);
		PuntosdelCrupier += cartas[indiceCarta].valor;
		indiceCarta++;
	}
	// Putos de la partida se ponen en info
	info.innerHTML = "<h2>Puntuación del jugador: " + PuntosdelJugador + "<br>Puntuación del crupier: " + PuntosdelCrupier +"</h2>";
	// Dibujamos las cartas del crupier
	carta.x = 50;
	carta.y = 400;
	for (i in cartasCrupier) {
		dibujarCarta(cartasCrupier[i]);
	}
	// Comprobamos ganador
	if (PuntosdelJugador == 21) {
		info.innerHTML +="<br><b>¡¡Blackjack!!! ¡¡Ganaste!!</b>";
	} else if (PuntosdelCrupier == 21) {
		info.innerHTML +="<br><b>¡¡Blackjack del Crupier!!! ¡¡Perdiste!!</b>";
	} else if (PuntosdelJugador > 21 && PuntosdelCrupier > 21) {
		info.innerHTML +="<br><b>¡Lastimosamente perdiste!</b>";
	} else if (PuntosdelJugador > 21) {
		info.innerHTML +="<br><b>¡Tienes mas de 21! ¡¡Perdiste!!</b>";
	} else if (PuntosdelCrupier > 21) {
		info.innerHTML +="<br><b>¡¡Ganaste!!</b>";
	} else if (PuntosdelCrupier >= PuntosdelJugador) {
		info.innerHTML += "<br><b>¡¡Perdiste!!</b>";
	} else if (PuntosdelCrupier == PuntosdelJugador) {
		info.innerHTML += "<br><b>¡¡Empate!!</b>";
	} else {
		info.innerHTML += "<br><b>Has ganado!!!</b>";
	}
}
//Recarga la pagina cuando se presiona el botton
function playagain() {
	location.reload(true);
}
// Variables que necesitaremos para el juego
// Esta sera para tener el mazo de cartas
var cartas = [];
// En esta almacenaremos todas las cartas del jugador
var cartasJugador = [];
// En esta alamacenaremos las cartas del crucier(oponente)
var cartasCrupier = [];
// Esta variable sirve para tener un limite a la hora de pedir cartas
var indiceCarta = 0;
// Esta variable respetara los cuatro palos que tiene un mazo:
// S --> Spades (Picas)
// H --> Hearts (Corazones)
// D --> Diamonds (Diamantes)
// C --> Clover (Treboles)
var palos = ["S", "H", "D", "C"];
// Generamos las cartas. Con atributos valor y palo
for (i = 0; i < 4; i++) {
	for (j = 1; j <= 13; j++) {
		cartas.push(new carta(j, palos[i]));
	}
}
//Barajamos las cartas
for (i = 0; i < 100; i++) {
	cartas.splice(Math.random() * 52, 0, cartas[0]);
	cartas.shift();
}
