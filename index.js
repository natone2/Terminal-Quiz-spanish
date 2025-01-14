const readline = require("readline");

// Función para barajar las respuestas y actualizar la posición correcta
function barajarRespuestas(preguntas) {
  return preguntas.map((preguntaObj) => {
    const respuestas = [...preguntaObj.respuestas];
    const respuestaCorrectaTexto = respuestas[preguntaObj.respuestaCorrecta - 1];

    // Barajar respuestas
    for (let i = respuestas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [respuestas[i], respuestas[j]] = [respuestas[j], respuestas[i]];
    }

    // Actualizar índice de la respuesta correcta
    const nuevaPosicionCorrecta =
      respuestas.indexOf(respuestaCorrectaTexto) + 1;

    return {
      ...preguntaObj,
      respuestas,
      respuestaCorrecta: nuevaPosicionCorrecta,
    };
  });
}

const preguntas = [
  {
    pregunta: "¿Cuántos bits tiene un byte? 💾",
    respuestas: ["4", "8", "16"],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿En qué continente se encuentra Egipto? 🌍",
    respuestas: ["Asia", "África", "Europa"],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿Qué filósofo dijo 'Pienso, luego existo'? 🤔",
    respuestas: ["Kant", "René Descartes", "Sócrates"],
    respuestaCorrecta: 2,
  },
  // Agrega el resto de las preguntas aquí
];

let puntos = 0;
const tiempoPorPregunta = 35; // Tiempo en segundos para responder cada pregunta.
const preguntasBarajadas = barajarRespuestas(preguntas);

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
  if (index < preguntasBarajadas.length - 1) {
    quiz(preguntasBarajadas[index + 1], index + 1);
  } else {
    console.log(
      `\n¡Has terminado el juego! 🎉 Obtuviste ${puntos} puntos. ¡Bien hecho! 🦾`
    );
  }
}

quiz(preguntasBarajadas[0], 0);
