const readline = require("readline");

const preguntas = [
  {
    pregunta: "¿Cuántos países forman parte de la Unión Europea? 🇪🇺",
    respuestas: ["27", "28", "30"],
    respuestaCorrecta: 1,
  },
  {
    pregunta: "¿En qué año se estrenó la película 'El Padrino'? 🎥",
    respuestas: ["1972", "1980", "1969"],
    respuestaCorrecta: 1,
  },
  {
    pregunta: "¿Quién escribió 'El manifiesto comunista'? 📜",
    respuestas: ["Karl Marx y Friedrich Engels", "Karl Marx", "Friedrich Engels"],
    respuestaCorrecta: 1,
  },
  {
    pregunta: "¿Cuál es la capital de España? 🏙️",
    respuestas: ["Madrid", "Barcelona", "Sevilla"],
    respuestaCorrecta: 1,
  },
  {
    pregunta: "¿Cuántos bits tiene un byte? 💾",
    respuestas: ["8", "16", "4"],
    respuestaCorrecta: 1,
  },
  {
    pregunta: "¿Quién dirigió la película 'Parásitos'? 🎬",
    respuestas: ["Bong Joon-ho", "Park Chan-wook", "Kim Ki-duk"],
    respuestaCorrecta: 1,
  },
  {
    pregunta: "¿En qué año comenzó la Guerra Civil Española? ⚔️",
    respuestas: ["1936", "1939", "1945"],
    respuestaCorrecta: 1,
  },
  {
    pregunta: "¿Qué filósofo dijo 'Pienso, luego existo'? 🤔",
    respuestas: ["René Descartes", "Sócrates", "Kant"],
    respuestaCorrecta: 1,
  },
];

let puntos = 0;
const tiempoPorPregunta = 10; // Tiempo en segundos para responder cada pregunta.

function quiz(preguntaObj, index) {
  console.log(`\nPregunta ${index + 1}: 🔥\n${preguntaObj.pregunta}`);

  preguntaObj.respuestas.forEach((opcion, i) => {
    console.log(`${i + 1}. ${opcion}`);
  });

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let tiempoRestante = tiempoPorPregunta;
  const temporizador = setInterval(() => {
    tiempoRestante -= 1;
    process.stdout.write(`\r⏳ Tiempo restante: ${tiempoRestante}s `);
    if (tiempoRestante <= 0) {
      clearInterval(temporizador);
      rl.close();
      console.log("\n⏰ Tiempo agotado. Respuesta incorrecta.");
      if (puntos < 5) {
        console.log("\n¡Has perdido! 😞 Inténtalo de nuevo.");
        process.exit();
      } else {
        siguientePregunta(index);
      }
    }
  }, 1000);

  rl.question("\nTu respuesta (elige el número): ", (respuesta) => {
    clearInterval(temporizador);
    rl.close();

    const eleccion = parseInt(respuesta.trim());
    if (eleccion === preguntaObj.respuestaCorrecta) {
      console.log("\n¡Correcto! 🥳");
      puntos += 5;
    } else {
      console.log(
        `\nRespuesta incorrecta 👎 La respuesta correcta era: ${preguntaObj.respuestas[preguntaObj.respuestaCorrecta - 1]}`
      );
    }

    if (puntos < 5) {
      console.log("\n¡Has perdido! 😞 Inténtalo de nuevo.");
      process.exit();
    } else {
      siguientePregunta(index);
    }
  });
}

function siguientePregunta(index) {
  if (index < preguntas.length - 1) {
    quiz(preguntas[index + 1], index + 1);
  } else {
    console.log(
      `\n¡Has terminado el juego! 🎉 Obtuviste ${puntos} puntos. ¡Bien hecho! 🦾`
    );
  }
}

quiz(preguntas[0], 0);

