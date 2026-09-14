const btnSorpresa = document.getElementById("btnSorpresa");
const inicio = document.getElementById("inicio");
const escenario = document.getElementById("escenario");

const flores = document.querySelectorAll(".flor");
const mensajeFlor = document.getElementById("mensajeFlor");

const mensajeFinal = document.getElementById("mensajeFinal");

const btnCarta = document.getElementById("btnCarta");
const cartaOverlay = document.getElementById("cartaOverlay");
const cerrarCarta = document.getElementById("cerrarCarta");

const btnMusica = document.getElementById("btnMusica");
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

const musicaTitulo = document.getElementById("musicaTitulo");
const estadoMusica = document.getElementById("estadoMusica");

const audioMusica = document.getElementById("audioMusica");

const particulas = document.getElementById("particulas");
const lluviaPetalos = document.getElementById("lluviaPetalos");


/* SORPRESA */

btnSorpresa.addEventListener("click", function () {

    inicio.style.opacity = "0";

    setTimeout(function () {

        inicio.style.display = "none";

        escenario.style.opacity = "1";

        iniciarFlores();
        crearParticulas();
        iniciarLluviaPetalos();

        setTimeout(function () {

            if (mensajeFinal) {
                mensajeFinal.classList.add("mostrar");
            }

        }, 4500);

    }, 800);

});


/* FLORES */

function iniciarFlores() {

    flores.forEach(function (flor, index) {

        flor.style.opacity = "0";

        flor.style.transform =
            "translateY(80px) scale(0.4)";

        setTimeout(function () {

            flor.style.transition =
                "opacity 1.2s ease, transform 1.2s ease";

            flor.style.opacity = "1";

            flor.style.transform =
                "translateY(0) scale(" +
                (getComputedStyle(flor).getPropertyValue("--escala") || "1") +
                ")";

        }, 500 + index * 400);

    });

}


flores.forEach(function (flor) {

    flor.addEventListener("click", function () {

        if (!mensajeFlor) {
            return;
        }

        const mensaje =
            flor.getAttribute("data-mensaje");

        if (!mensaje) {
            return;
        }

        mensajeFlor.textContent =
            mensaje;

        mensajeFlor.style.opacity =
            "1";

        mensajeFlor.style.transform =
            "translate(-50%, 0)";

        setTimeout(function () {

            mensajeFlor.style.opacity =
                "0";

            mensajeFlor.style.transform =
                "translate(-50%, 15px)";

        }, 3500);

    });

});


/* PARTICULAS */

function crearParticulas() {

    if (!particulas) {
        return;
    }

    for (let i = 0; i < 35; i++) {

        const particula =
            document.createElement("div");

        particula.className =
            "particula";

        particula.style.left =
            Math.random() * 100 + "%";

        particula.style.top =
            45 + Math.random() * 50 + "%";

        particula.style.animationDelay =
            Math.random() * 5 + "s";

        particula.style.animationDuration =
            4 + Math.random() * 4 + "s";

        particulas.appendChild(particula);

    }

}


/* LLUVIA DE PETALOS */

function iniciarLluviaPetalos() {

    if (!lluviaPetalos) {
        return;
    }

    setInterval(function () {

        const petalo =
            document.createElement("div");

        petalo.className =
            "petalo-caida";

        petalo.style.left =
            Math.random() * 100 + "%";

        petalo.style.animationDuration =
            5 + Math.random() * 5 + "s";

        petalo.style.animationDelay =
            Math.random() * 1.5 + "s";

        petalo.style.transform =
            "rotate(" +
            Math.random() * 360 +
            "deg)";

        lluviaPetalos.appendChild(petalo);

        setTimeout(function () {

            petalo.remove();

        }, 11000);

    }, 1200);

}


/* CARTA */

if (btnCarta && cartaOverlay) {

    btnCarta.addEventListener("click", function () {

        cartaOverlay.classList.add("mostrar");

    });

}


if (cerrarCarta && cartaOverlay) {

    cerrarCarta.addEventListener("click", function () {

        cartaOverlay.classList.remove("mostrar");

    });

}


if (cartaOverlay) {

    cartaOverlay.addEventListener("click", function (event) {

        if (event.target === cartaOverlay) {

            cartaOverlay.classList.remove("mostrar");

        }

    });

}


/* MUSICA */

const canciones = [
    {
        nombre: "Flores",
        archivo: "musica/flores.mp3"
    },
    {
        nombre: "No digas nada",
        archivo: "musica/no-digas-nada.mp3"
    },
    {
        nombre: "Siento que merezco más",
        archivo: "musica/siento-que-merezco-mas.mp3"
    },
    {
        nombre: "Patadas de Ahogado",
        archivo: "musica/patadas-de-ahogado.mp3"
    },
    {
        nombre: "Te Estoy Correteando",
        archivo: "musica/te-estoy-correteando.mp3"
    }
];


let cancionActual = 0;


function cargarCancion(indice) {

    cancionActual = indice;

    const cancion =
        canciones[cancionActual];

    audioMusica.src =
        cancion.archivo;

    musicaTitulo.textContent =
        cancion.nombre;

    estadoMusica.textContent =
        "Presiona para reproducir";

    btnMusica.textContent =
        "▶";

}


function reproducirCancion() {

    audioMusica.play()
        .then(function () {

            btnMusica.textContent =
                "❚❚";

            estadoMusica.textContent =
                "Reproduciendo";

        })
        .catch(function () {

            estadoMusica.textContent =
                "No se pudo reproducir";

        });

}


function pausarCancion() {

    audioMusica.pause();

    btnMusica.textContent =
        "▶";

    estadoMusica.textContent =
        "Pausado";

}


btnMusica.addEventListener("click", function () {

    if (audioMusica.paused) {

        reproducirCancion();

    } else {

        pausarCancion();

    }

});


btnAnterior.addEventListener("click", function () {

    cancionActual--;

    if (cancionActual < 0) {
        cancionActual =
            canciones.length - 1;
    }

    cargarCancion(cancionActual);

    reproducirCancion();

});


btnSiguiente.addEventListener("click", function () {

    cancionActual++;

    if (cancionActual >= canciones.length) {
        cancionActual = 0;
    }

    cargarCancion(cancionActual);

    reproducirCancion();

});


audioMusica.addEventListener("ended", function () {

    cancionActual++;

    if (cancionActual >= canciones.length) {
        cancionActual = 0;
    }

    cargarCancion(cancionActual);

    reproducirCancion();

});


cargarCancion(0);