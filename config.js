// Alles, was du anpassen musst, steht in dieser Datei.
window.UMFRAGE = {
  frage: "Welches Lied möchtest du hören?",

  // Aus der Formular-URL: https://docs.google.com/forms/d/e/<formularId>/viewform
  formularId: "1FAIpQLSeURy9czenRYWHr5vtZOqYWjw6kRVqbixauEWWpSHSu5be48Q",

  // Feld-IDs aus „Vorausgefüllten Link abrufen“ im Formular-Editor.
  antwortFeld: "entry.463286209",
  klasseFeld: "entry.89839605",

  // Text muss exakt den Optionen im Formular entsprechen. icon ist optional.
  antworten: [
    { text: "Morgen Kinder wirds nichts geben.", icon: "🎄" },
    { text: "Wer hat uns verraten - Sozialdemokraten.", icon: "🎤" },
  ],

  // name muss exakt den Optionen der Klassenfrage im Formular entsprechen.
  klassen: [
    { name: "Füchse", icon: "🦊" },
    { name: "Bären", icon: "🐻" },
    { name: "Eulen", icon: "🦉" },
    { name: "Frösche", icon: "🐸" },
    { name: "Igel", icon: "🦔" },
    { name: "Hasen", icon: "🐰" },
  ],

  // Danach springt die Seite zurück zur Klassenauswahl (fürs Weiterreichen des Tablets).
  zurueckNachSekunden: 6,
};
