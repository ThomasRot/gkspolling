# Umfrage für die Grundschule

Statische Seite für GitHub Pages. Kinder wählen ihre Klasse (Tier), dann eine Antwort. Die Antworten landen in einem Google Form. Ausgewertet werden nur die ersten 25 Antworten pro Klasse, das erledigt eine Formel in der Tabelle. Alle Einstellungen stehen in [config.js](config.js).

## Einrichtung

### 1. Frage „Klasse“ im Formular anlegen
1. Im Formular-Editor eine Frage **„In welcher Klasse bist du?“** (Multiple Choice) mit den Klassennamen als Optionen anlegen.
2. Oben rechts ⋮ → **Vorausgefüllten Link abrufen**. Eine Klasse und ein Lied auswählen, dann → **Link kopieren**.
3. Im kopierten Link steht `entry.XXXXXXX=Füchse`. Diese ID in `config.js` bei `klasseFeld` eintragen: `klasseFeld: "entry.XXXXXXX"`.

Wenn du Klassen oder Antworten im Formular änderst, musst du `klassen` bzw. `antworten` in `config.js` genauso anpassen. Der Text muss exakt übereinstimmen.

### 2. Auswertung im Google Sheet (nur erste 25 pro Klasse)
Die Tabelle bleibt privat, die Seite liest nichts daraus. Die Kinder können beliebig oft abstimmen, gezählt werden aber pro Klasse nur die ersten 25 Antworten (nach Eingangszeit).

1. Im Formular → Tab **Antworten** → **In Tabellen verknüpfen** (neue Tabelle).
2. Neues Tabellenblatt **„Auswertung“** anlegen: in Spalte A die Klassen, in Zeile 1 die Lieder, jeweils exakt wie im Formular:

   |   | A       | B                                   | C                                          |
   |---|---------|-------------------------------------|--------------------------------------------|
   | 1 |         | Morgen Kinder wirds nichts geben.   | Wer hat uns verraten - Sozialdemokraten.   |
   | 2 | Bären   | *Formel*                            | *Formel*                                   |
   | 3 | Füchse  | …                                   | …                                          |

3. In **B2** diese Formel eintragen und dann nach rechts und unten ziehen:

   ```
   =WENNFEHLER(ZÄHLENWENN(ARRAY_CONSTRAIN(FILTER('Formularantworten 1'!$C$2:$C; 'Formularantworten 1'!$B$2:$B=$A2); 25; 1); B$1); 0)
   ```

   So funktioniert sie: `FILTER` holt alle Liedantworten der Klasse in Eingangsreihenfolge, `ARRAY_CONSTRAIN` behält davon nur die ersten 25, und `ZÄHLENWENN` zählt das Lied aus der Kopfzeile. Spalte B im Antwortblatt ist die Klasse, Spalte C das Lied. Prüfe, ob der Blattname stimmt.

   Optional kannst du in einer Spalte „Antworten gesamt“ `=ZÄHLENWENN('Formularantworten 1'!$B:$B; $A2)` eintragen. Dann siehst du, ob eine Klasse über 25 liegt.

Sortiere das Antwortblatt nicht um. Die Formel geht davon aus, dass die ältesten Antworten oben stehen.

### 3. Auf GitHub Pages veröffentlichen
1. Neues Repository auf GitHub anlegen und diese Dateien hochladen.
2. **Settings → Pages → Source: Deploy from a branch**, Branch `main`, Ordner `/ (root)`.
3. Nach ca. 1 Minute ist die Seite unter `https://<benutzername>.github.io/<repo>/` erreichbar.

## Lokal testen

```bash
python3 -m http.server 8765
```

Dann http://localhost:8765 öffnen. Achtung: Abschicken erzeugt echte Formularantworten.

## Anpassen

- Klassen und Tiere: `klassen` in `config.js` (Emoji als Icon). Der Name muss genauso im Blatt „Zählung“ stehen.
- Nach wie vielen Sekunden die Danke-Seite zurückspringt: `zurueckNachSekunden`.
