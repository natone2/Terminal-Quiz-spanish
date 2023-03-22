const readline = require("readline");

const fragen = [
  {
    frage:
      "Wie viele Weihnachtsbäume werden in Deutschland pro Jahr verkauft? 🎄",
    antworten: [
      " Etwa 30 Millionen",
      " Etwa 60 Millionen",
      " Etwa 45 Millionen",
    ],
    richtigeAntwort: "Etwa 30 Millionen",
  },

  {
    frage:
      "Wie viele Liter Bier werden in Deutschland pro Kopf jährlich getrunken? 🍺",
    antworten: [" 10 Liter", " 100 Liter", " 50 Liter"],
    richtigeAntwort: "100 Liter",
  },

  {
    frage: "Wer war während des 2. Weltkriegs US-Präsident? 🦅🔫",
    antworten: [
      " John F. Kennedy",
      " Theodore Roosevelt ",
      " Franklin D. Roosevelt",
    ],
    richtigeAntwort: " Franklin D. Roosevelt ",
  },

  {
    frage: "Welches Land ist flächenmäßig das zweitgrößte der Erde? 🗺️",
    antworten: [" Kanada", " USA", " China"],
    richtigeAntwort: "Kanada",
  },

  {
    frage: "Wie viele Tasten hat ein Klavier? 🎹",
    antworten: [" 80", " 88", " 78"],
    richtigeAntwort: "88",
  },

  {
    frage: "In welchem Jahr war die Einführung des Euro in Deutschland? 💶",
    antworten: [" 2003", " 2004", " 2002"],
    richtigeAntwort: "2002",
  },
];
let punkte = 0;

function quiz(fragenObj, index) {
  let option = fragenObj.antworten
    .map((fragenObj) => {
      return fragenObj;
 });

  console.log(
    `\nFrage: ${index + 1} 🔥\n${
      fragenObj.frage
    }\nAntwortmöglichkeiten:${option}`
  );
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Dein Antwort: ", (answer) => {
    rl.close();
    if (answer === fragenObj.richtigeAntwort) {
      console.log("\nRichtig! 🥳");
      punkte += 5;
    } else {
      console.log(
        `\nDein Antwort ist leider falsch 👎 Das richtige Antwort ist ${fragenObj.richtigeAntwort}`
      );
    }

    if (index < fragen.length - 1) {
      quiz(fragen[index + 1], index + 1, punkte);
    } else {
      console.log(
        `\nDu bist du durch, du Maschine! 🦾 Du hast ${punkte} Punkte bekommen.`
      );
    }
  });
}
quiz(fragen[0], 0);
