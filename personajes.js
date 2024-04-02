const URL = 'https://valorant-api.com/v1/agents';
const parametro1 = 'valor1';
const parametro2 = 'valor2';

let agentesLista = [];

// Construir la URL de la solicitud con los parámetros
const API = `${URL}?language=es-MX&isPlayableCharacter=True`;
fetch(API)
.then(response => {
  return response.json();
})
.then(data => {

  const DATA = data.data;
  let lista = [{
    nombre: DATA.map(item => item.displayName),
    rol: DATA.map(item => item.role.displayName),
    img: DATA.map(item => item.displayIcon),
    fondo: DATA.map(item => item.background),
    colores: DATA.map(item => item.backgroundGradientColors)
  }]

  lista = lista[0];
  
  for (let i = 0; i < lista.nombre.length; i++) {
    if (lista.nombre[i] == "Sage" || lista.nombre[i] == "Skye" ){
      lista.rol[i] = "Sanador"
    }
    agentesLista[i] = {
      nombre: lista.nombre[i],
      rol: lista.rol[i],
      img: lista.img[i],
      fondo: lista.fondo[i],
      colores: lista.colores[i]
    }
  }


  console.log(agentesLista);
});
