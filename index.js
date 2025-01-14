const readline = require("readline");

const preguntas = [
  {
    pregunta: "¿Cuántos países forman parte de la Unión Europea? 🇪🇺",
    respuestas: [" 27", " 28", " 30"],
    respuestaCorrecta: "27",
  },

  {
    pregunta: "¿En qué año se estrenó la película 'El Padrino'? 🎥",
    respuestas: [" 1972", " 1980", " 1969"],
    respuestaCorrecta: "1972",
  },

  {
    pregunta: "¿Quién escribió 'El manifiesto comunista'? 📜",
    respuestas: [" Karl Marx y Friedrich Engels", " Karl Marx", " Friedrich Engels"],
    respuestaCorrecta: "Karl Marx y Friedrich Engels",
  },

  {
    pregunta: "¿Cuál es la capital de España? 🏙️",
    respuestas: [" Madrid", " Barcelona", " Sevilla"],
    respuestaCorrecta: "Madrid",
  },

  {
    pregunta: "¿Cuántos bits tiene un byte? 💾",
    respuestas: [" 8", " 16", " 4"],
    respuestaCorrecta: "8",
  },

  {
    pregunta: "¿Quién dirigió la película 'Parásitos'? 🎬",
    respuestas: [" Bong Joon-ho", " Park Chan-wook", " Kim Ki-duk"],
    respuestaCorrecta: "Bong Joon-ho",
  },

  {
    pregunta: "¿En qué año comenzó la Guerra Civil Española? ⚔️",
    respuestas: [" 1936", " 1939", " 1945"],
    respuestaCorrecta: "1936",
  },

  {
    pregunta: "¿Qué filósofo dijo 'Pienso, luego existo'? 🤔",
    respuestas: [" René Descartes", " Sócrates", " Kant"],
    respuestaCorrecta: "René Descartes",
  },
];

let puntos = 0;

function quiz(preguntaObj, index) {
  let opciones = preguntaObj.respuestas.map((opcion) => opcion);

  console.log(
    `\nPregunta ${index + 1}: 🔥\n${preguntaObj.pregunta}\nOpciones:${opciones}`
  );

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Tu respuesta: ", (respuesta) => {
    rl.close();

    if (respuesta.trim() === preguntaObj.respuestaCorrecta) {
      console.log("\n¡Correcto! 🥳");
      puntos += 5;
    } else {
      console.log(
        `\nRespuesta incorrecta 👎 La respuesta correcta es: ${preguntaObj.respuestaCorrecta}`
      );
    }

    if (index < preguntas.length - 1) {
      quiz(preguntas[index + 1], index + 1);
    } else {
      console.log(
        `\n¡Has terminado el juego! 🎉 Obtuviste ${puntos} puntos. ¡Bien hecho! 🦾`
      );
    }
  });
}

quiz(preguntas[0], 0);
