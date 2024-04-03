// objetos
const btnGenerar = document.getElementById("btnGenerar");
const chcDarkmode = document.getElementById("darkmode");

// eventos
btnGenerar.addEventListener("click", Random);
chcDarkmode.addEventListener("click", DarkMode);
load();

// variables
let oldOutput;

// funciones
function Random() {
    let agentesActuales = [];
    let rolesActuales = [];
    let jugadores = traerJugadores();

    for (let i = 0, len = jugadores.length; i < len; i++) {
        const rol = elegirRolRandom(rolesActuales);
        rolesActuales.push(rol);

        const agente = elegirPersonajeRandom(agentesActuales, rol);
        agentesActuales.push(agente);
    }
    save();
    crearTarjeta(agentesActuales);
}
function crearTarjeta(Agentes){
    const main = document.getElementById("main");
    const aside = document.createElement("aside");
    if (oldOutput != undefined){
        oldOutput.outerHTML = "";
    }
    aside.id = "aside";
    aside.classList = "aside"
    const div1 = document.createElement("div");
    div1.classList.add("output");

    let jugadores = traerJugadores();
    let i = 0;
    Agentes.forEach(agente => {
        const articulo = document.createElement("article");
        articulo.classList.add("character");
        articulo.style = `
        background: url(${agente.fondo}), linear-gradient(45deg, #${agente.colores[0]}, #${agente.colores[1]}, #${agente.colores[2]}, #${agente.colores[3]});
        background-size: 200%;
        background-position: 50% 50%;
        background-blend-mode: overlay;
        `;

        const jugador = document.createElement("label");

        jugador.textContent = jugadores[i];
        jugador.classList.add("character--name");
        i++;

        const br = document.createElement("br");

        const div2 = document.createElement("div");
        div2.classList.add("character--data");

        const imagen = document.createElement("img");
        imagen.src = agente.img;
        imagen.classList.add("character--data--img");
        
        const div3 = document.createElement("div");
        div3.classList.add("character--data");

        const personaje = document.createElement("label");
        personaje.textContent = agente.nombre;
        personaje.classList.add("character--data--name");

        const rol = document.createElement("label");
        rol.textContent = agente.rol;
        rol.classList.add("character--data--rol");

        aside.appendChild(div1);
        div1.appendChild(articulo);
        articulo.appendChild(jugador);
        articulo.appendChild(br);
        articulo.appendChild(div2)
        div2.appendChild(imagen);
        div2.appendChild(div3);
        div3.appendChild(personaje);
        div3.appendChild(rol);

        main.appendChild(aside);
      });
      if (jugadores.length > 0){
        oldOutput = aside;
      }
      else{
        oldOutput = undefined;
      }
}
function elegirPersonajeRandom(agentesActuales, rol) {
    let agentes = agentesLista
    agentes = agentes.filter(p => !agentesActuales.includes(p));
    agentes = agentes.filter(p => p.rol === rol);

    const num = Math.floor(Math.random() * agentes.length);
    return agentes[num];
}
function elegirRolRandom(rolesActuales){
    let roles = agentesLista.map(p => p.rol);
    roles = roles.filter(p => !rolesActuales.includes(p));
    const num = Math.floor(Math.random() * roles.length);
    return roles[num];
}

function traerJugadores(){
    let jugadores = []
    for (let i = 1; i <= 5; i++) {
        const p = document.getElementById("player" + i + "-input");
        if (p.value.trim() != ""){
            jugadores.push(p.value);
        }
    }
    return jugadores;
}

function load(){
    for (let i = 1; i <= 5; i++) {
        const nombre = localStorage.getItem("Nombre" + i);
        if (!nombre){
            localStorage.setItem("Nombre" + i, '');
        }
        else{
            const p = document.getElementById("player" + i + "-input");
            p.value = localStorage.getItem("Nombre" + i);
        }
    }
    
    const mode = localStorage.getItem("darkmode");
    if (mode == null){
        localStorage.setItem("darkmode", 0);
    }
    chcDarkmode.checked = parseInt(mode);
    DarkMode();
}
function save(){
    for (let i = 1; i <= 5; i++) {
        const p = document.getElementById("player" + i + "-input");
        localStorage.setItem("Nombre" + i, p.value);
    }
}
function DarkMode(){
    const body = document.getElementById("body");
    if (chcDarkmode.checked){
        body.style = `
        --Rojo1: #292929;
        --Rojo2: #BD3944;
        --RojoTitulo: #FD4556;
        --Gris1: #111;
        --Gris2: #292929;
        --Blanco: #111;
        --TextosNegros: #fff;
        --TextosBlancos: #000;
        --TextoBoton: #fff;
        --CoverturaBoton: #fff;
        `
        localStorage.setItem('darkmode', 1);
        chcDarkmode.checked = 1;
    }
    else{
        body.style = `
        --Rojo1: #FD4556;
        --Rojo2: #BD3944;
        --RojoTitulo: var(--Rojo1);
        --Gris1: #111;
        --Gris2: #292929;
        --Blanco: #ece8e1;
        --TextosNegros: #000;
        --TextosBlancos: #fff;
        --TextoBoton: #fff;
        --CoverturaBoton: #0f1923;
        `
        localStorage.setItem('darkmode', 0);
    }
    console.log(localStorage.getItem("darkmode"));
}