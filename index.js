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
  {
    pregunta: "¿Qué gas respiramos los humanos? 🌬️",
    respuestas: ["Hidrógeno", "Oxígeno", "Nitrógeno"],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿Qué deporte practica Rafael Nadal? 🎾",
    respuestas: ["Baloncesto", "Tenis", "Fútbol"],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿En qué país se encuentra la Torre Eiffel? 🗼",
    respuestas: ["Alemania", "Francia", "Italia"],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿En qué año cayó el Muro de Berlín? 🧱",
    respuestas: ["1987", "1989", "1990"],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿Quién escribió 'El manifiesto comunista'? 📜",
    respuestas: ["Karl Marx", "Karl Marx y Friedrich Engels", "Friedrich Engels"],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿Qué invento es atribuido a Alexander Graham Bell? 📞",
    respuestas: ["Radio", "Teléfono", "Telégrafo"],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿En qué año comenzó la Guerra Civil Española? ⚔️",
    respuestas: ["1945", "1936", "1939"],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿Cuál es el idioma más hablado del mundo? 🌐",
    respuestas: ["Inglés", "Chino mandarín", "Español"],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿Qué elemento químico tiene el símbolo 'O'? ⚗️",
    respuestas: ["Oro", "Oxígeno", "Osmio"],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿Quién pintó 'La última cena'? 🎨",
    respuestas: ["Miguel Ángel", "Leonardo da Vinci", "Rafael"],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿En qué año se estrenó la película 'El Padrino'? 🎥",
    respuestas: ["1980", "1972", "1969"],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿Cuál es la capital de España? 🏙️",
    respuestas: ["Barcelona", "Madrid", "Sevilla"],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿Quién dirigió la película 'Parásitos'? 🎬",
    respuestas: ["Kim Ki-duk", "Bong Joon-ho", "Park Chan-wook"],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿Cuántos países forman parte de la Unión Europea? 🇪🇺",
    respuestas: ["28", "27", "30"],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿Qué animal es conocido como 'el rey de la selva'? 🦁",
    respuestas: ["Tigre", "León", "Elefante"],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿Cuál es el planeta más grande del sistema solar? 🪐",
    respuestas: ["Saturno", "Júpiter", "Neptuno"],
    respuestaCorrecta: 2,
  },
  {
    pregunta: "¿En qué año se fundó Google? 🌐",
    respuestas: ["2000", "1998", "1995"],
    respuestaCorrecta: 2,
  },
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
