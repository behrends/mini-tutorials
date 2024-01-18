## Memory-Spiel in p5.js

Dieses Mini-Tutorial zeigt, wie ein einfaches Memory-Spiel mit p5.js erstellt werden kann.

### Spielregeln

Dies sind die Regeln des Spiels:

- Es gibt 16 Karten mit einer farbigen und einer grauen Seite.
- Jeweils zwei Karten haben die gleiche Farbe.
- Zu Beginn liegt die farbige Seite jeder Karte verdeckt auf dem Tisch, die graue Seite ist sichtbar.
- Der Spieler deckt zwei Karten auf. Sind die Karten gleichfarbig, bleiben sie aufgedeckt. Sind sie verschieden, werden sie wieder nach einer Sekunde umgedreht.
- Der Spieler muss sich die Position der Karten merken, um sie beim nächsten Zug wieder aufdecken zu können.
- Das Spiel ist zu Ende, wenn alle Karten aufgedeckt sind.

### p5.js

p5.js ist eine JavaScript-Bibliothek, die es ermöglicht, mit wenig Aufwand grafische und interaktive Inhalte in einem Webbrowser zu erstellen. Sie ist besonders beliebt für künstlerische und kreative Projekte (_creative coding_).

Wenn du mit diesem Tutorial arbeiten möchtest, dann kannst du den hier beschriebenen Code in den Editor von p5.js einfügen. Der Editor ist unter [editor.p5js.org](https://editor.p5js.org/) zu finden.

### Mini-Tutorial

Lass mich erklären, wie du mit diesem Mini-Tutorial arbeitest. Wird der Quellcode auf der rechten Seite des Bildschirms angezeigt? Wenn nicht, scrolle die Seite nach unten, bis dieser Textabschnitt ungefähr in der Mitte des Bildschirms ist.

(src) [00_start.js](./src/00_start.js)

Der neu hinzugefügte Quellcode wird auf der rechten Seite des Bildschirms angezeigt. Die Anzeige ist in einem [vereinheitlichen Format von diff](https://en.wikipedia.org/wiki/Diff#Unified_format). Zeilen die ein `+` am Anfang haben, sind hinzugefügte Zeilen, und Zeilen mit `-` sind gelöschte Zeilen.

### Zeichenbereich erstellen

Wenn du den [Editor von p5.js](https://editor.p5js.org/) im Browser zum ersten Mal öffnest, dann wird der Inhalt der Datei `sketch.js` im Editor angezeigt. Dort siehst du zwei vordefinierte Funktionen, die ein p5.js-Programm benötigt:

- `setup` und
- `draw`

Die Funktion `setup` wird automatisch von p5.js einmal aufgerufen und ausgeführt, wenn das Programm startet. Die Funktion `draw` wird automatisch immer wieder ausgeführt, nachdem `setup` ausgeführt wurde.

In `setup` wird das Programm vorbereitet. Hier bestimmen wir die Größe des Zeichenbereichs (Leinwand, _canvas_). Standardmäßig wird `createCanvas` so aufgerufen , dass ein Zeichenbereich mit einer Breite von 400 Pixeln und einer Höhe von 400 Pixeln erstellt wird:

```js
function setup() {
  createCanvas(400, 400);
}
```

In `draw` wird die Funktion `background` genutzt, um den Zeichenbereich mit einer Farbe zu füllen. Hier wird mit `220` ein bestimmter Grauton gewählt:

```js
function draw() {
  background(220);
}
```

Wir programmieren in p5.js mit JavaScript. Zusätzlich stellt p5.js eine Reihe von Funktionen zur Verfügung, die wir nutzen können, um z.B. Grafiken zu erstellen. `createCanvas` und `background` sind solche Funktionen.
Wir werden im Laufe dieses Tutorials noch weitere Funktionen von p5.js kennenlernen.

## Erste Anpassungen in `setup`

(src) [01_setup.js](./src/01_setup.js)

Wir wollen nun die Größe der Leinwand ändern. Ändere die Werte in dem Aufruf von `createCanvas` in der `setup`-Funktion von `400` auf `800`, damit der Zeichenbereich größer wird.

Außerdem wollen wir sprechende Farbnamen anstatt numerischer Werte nutzen. Ändere den Wert in dem Aufruf von `background` in der `draw`-Funktion von `220` auf `lightgrey` und beobachte, wie sich nun Größe und Farbe des Zeichenbereichs ändern, wenn du auf den `Play`- bzw. `Run`-Button klickst.

Zum Experimentieren kannst du natürlich auch andere Farbnamen ausprobieren. Es gibt verschiedene Möglichkeiten, Farben in p5.js zu definieren, z.B. mit RGB-Werten oder mit HSL-Werten. Eine Übersicht über die verschiedenen Möglichkeiten findest du [hier](https://p5js.org/learn/color.html). Wir wollen die Verwendung von Farben in diesem Mini-Tutorial möglichst einfach halten und nutzen daher sprechende Farbnamen.

### Array-Variablen für Karten und Farben

(src) [02_variables.js](./src/02_variables.js)

Wir beginnen nun damit, die Karten des Memory-Spiels zu erstellen. Wir benötigen 16 Karten mit 8 verschiedenen Farben für jedes gleichfarbige Kartenpaar. Dafür definieren wir außerhalb der Funktionen `setup` und `draw` zwei Array-Variablen:

```js
let cards = [];
let colors = [
  'red',
  'blue',
  'green',
  'yellow',
  'orange',
  'purple',
  'magenta',
  'cyan',
];
```

Diese werden außerhalb der Funktionen `setup` und `draw` definiert, damit sie in beiden Funktionen und auch in später hinzugefügten Funktionen genutzt werden können. Die Variable `cards` wird später die Karten des Spiels enthalten. Die Variable `colors` enthält die Farben, die wir für die Karten nutzen wollen.

### Karten erstellen

(src) [03_cards.js](./src/03_cards.js)

Die 16 Karten bestehend aus 8 gleichfarbigen Paaren werden wir nun in `setup` erzeugen. Dies geschieht in einer `for`-Schleife, in der durch alle Farben des `color`-Arrays laufen und zwei Karten für jede Farbe dem Array `cards` hinzufügen. Die Karten werden mit der p5.js-Hilfsfunktion `shuffle` gemischt. Dieser Code ist in `setup` eingefügt:

```js
for (let i = 0; i < colors.length; i++) {
  cards.push({ color: colors[i], flipped: false });
  cards.push({ color: colors[i], flipped: false });
}
cards = shuffle(cards);
```

Jede Karte wird hier durch ein JavaScript-Objekt (`{...}`) repräsentiert, wobei die Eigenschaft `color` die Farbe anzeigt und `flipped` angibt, ob die Karte aufgedeckt ist oder nicht. Die Eigenschaft `flipped` wird zu Beginn auf `false` gesetzt, da alle Karten zu Beginn des Spiels noch nicht aufgedeckt sind.

### Karten im Zeichenbereich zeichnen

(src) [04_tiles.js](./src/04_tiles.js)

Nun wechseln wir in die `draw`-Funktion, die von p5.js immer wieder aufgerufen wird und dafür sorgt, dass etwas im Zeichenbereich dargestellt wird. Mit zwei geschachtelten `for`-Schleifen laufen wir jeweils von 0 bis 3 (d.h. `< 4`), sodass wir alle Zeilen und Spalten eines 4x4-Gitters durchlaufen. In diesen Schleifen zeichnen wir nun die Karten auf den Zeichenbereich auf das 4x4-Gitter. Dafür nutzen wir die p5.js-Hilfsfunktion `square`:

```js
square(x * 200 + 10, y * 200 + 10, 180);
```

Die Funktion `square` zeichnet das Quadrat auf den Zeichenbereich. Die ersten beiden Parameter sind die x- und y-Koordinaten des Quadrats auf der Zeichenfläche. Der Nullpunkt des Koorinatensystems liegt in der oberen linken Ecke des Zeichenbereichs, sodass diese Quadrate ab links oben erscheinen werden. Die dritte Zahl im Aufruf von `square` ist die Größe des Quadrats (`180`). Durch die Multiplikation mit `200` und die Addition von `10` wird die Position des Quadrats auf dem Zeichenbereich berechnet.

**Tipp: Spickzettel (cheat sheet) für p5.js**

In diesem [Spickzettel](https://bmoren.github.io/p5js-cheat-sheet/de.html) findest du eine Übersicht über die wichtigsten Funktionen von p5.js. Insbesondere ist dort zu sehen, wie das Koorinatensystem des Zeichenbereichs aussieht.

### Kartenseite farbig darstellen

(src) [05_tiles_color.js](./src/05_tiles_color.js)

Innerhalb der geschachtelten `for`-Schleife können wir mit einer `if`-Bedingung prüfen, ob die Karte aufgedeckt ist oder nicht. Ist die Karte aufgedeckt, dann wollen wir die farbige Seite der Karte darstellen. Dafür nutzen wir die Eigenschaft `color` der Karte. Diese Eigenschaft enthält den Namen der Farbe, die wir nutzen wollen. Wir können diese Eigenschaft nutzen, um die Farbe des Quadrats zu ändern:

```js
let card = cards[index];
if (card.flipped) {
  fill(card.color);
} else {
  fill('white');
}
```

`fill` ist eine Funktion von p5.js, die die Farbe für die nächsten Zeichenoperationen festlegt. In diesem Fall wird die Farbe der Karte genutzt, wenn die Karte aufgedeckt ist, und ansonsten wird die Farbe `white` genutzt.

### Karten aufdecken

(src) [06_mouse.js](./src/06_mouse.js)

`mousePressed` ist eine Funktion von p5.js, die automatisch aufgerufen wird, wenn die Maus gedrückt wird. Wir können diese Funktion nutzen, um zu prüfen, ob der Mauszeiger über einer Karte ist. Dazu implementieren wir `mousePressed` außerhalb von `setup` und `draw`.

Wir laufen zunächst durch alle Karten:

```js
for (let i = 0; i < cards.length; i++) {
  // ...
}
```

Und berechnen die Position der Karte auf dem Zeichenbereich (mit den Werten und Berechnungen wie in der `draw`-Funktion):

```js
let x = (i % 4) * 200 + 10;
let y = Math.floor(i / 4) * 200 + 10;
```

Dann prüfen wir, ob der Mauszeiger über der Karte ist:

```js
if (
  mouseX > x &&
  mouseX < x + 180 &&
  mouseY > y &&
  mouseY < y + 180
) {
  cards[i].flipped = !cards[i].flipped;
  break;
}
```

Dafür nutzen wir die p5.js-Eigenschaften `mouseX` und `mouseY`, die uns global zur Verfügung stehen und die die aktuellen x- und y-Koordinaten des Mauszeigers auf dem Zeichenbereich enthalten. Wenn der Mauszeiger über der Karte ist, dann wird die Eigenschaft `flipped` der Karte auf den umgekehrten Wert gesetzt. Wenn die Karte aufgedeckt war, wird sie nun wieder umgedreht, und wenn sie umgedreht war, wird sie nun aufgedeckt:

```js
cards[i].flipped = !cards[i].flipped;
```

Die `break`-Anweisung sorgt dafür, dass die `for`-Schleife abgebrochen wird, sobald eine Karte aufgedeckt wurde.

### Karten miteinander vergleichen

(src) [07_match.js](./src/07_match.js)

Wir wollen nun die Karten miteinander vergleichen, um zu prüfen, ob sie gleichfarbig sind. Dafür benötigen wir zwei weitere Variablen: eine für den Index der zuletzt aufgedeckten Karte (`lastFlippedIndex`) und eine die anzeigt, ob wir gerade zwei Karten miteinander vergleichen (`checkingMatch`). Diese Variablen werden außerhalb von `setup` und `draw` definiert:

```js
let lastFlippedIndex = -1;
let checkingMatch = false;
```

In `mousePressed` verlassen wir die Funktion sofort, wenn wir gerade zwei Karten miteinander vergleichen, damit keine anderen Karten aufgedeckt werden können:

```js
if (checkingMatch) return;
```

Eine weitere Funktion `checkForMatch` prüft, ob die beiden Karten gleichfarbig sind. Das Vorgehen ist so, dass verschiedenfarbige Karten wieder umgedreht werden (`flipped = false`). Mit lastFlippedIndex = -1 wird angezeigt, dass gerade keine Karte aufgedeckt ist. Mit checkingMatch = false wird angezeigt, dass gerade keine Karten miteinander verglichen werden:

```js
function checkForMatch(currentIndex) {
  if (cards[lastFlippedIndex].color !== cards[currentIndex].color) {
    cards[lastFlippedIndex].flipped = false;
    cards[currentIndex].flipped = false;
  }
  lastFlippedIndex = -1;
  checkingMatch = false;
}
```

Die `if`-Bedingung in `mousePressed` wird nun um die Prüfung erweitert, ob die Karte aufgedeckt ist und ob sie nicht die zuletzt aufgedeckte Karte ist:

```js
if (!cards[i].flipped && lastFlippedIndex !== i) {
  cards[i].flipped = true;
  if (lastFlippedIndex === -1) {
    lastFlippedIndex = i;
  } else {
    checkingMatch = true;
    setTimeout(checkForMatch, 1000, i);
  }
}
```

Die Karte wird dann aufgedeckt. Wenn die zuletzt aufgedeckte Karte nicht gesetzt ist (`lastFlippedIndex === -1`), dann wird der Index der zuletzt aufgedeckten Karte gesetzt. Wenn die zuletzt aufgedeckte Karte gesetzt ist, dann überprüfen wir, ob die beiden Karten gleichfarbig sind. Dafür wird die Funktion `checkForMatch` aufgerufen. Diese Funktion wird nicht sofort aufgerufen, sondern mit `setTimeout` wird ein Timer gestartet. Mit `setTimeout` und dem Wert `1000` wird der Timer auf eine Sekunde gesetzt. Das bedeutet, dass die Funktion `checkForMatch` erst nach einer Sekunde aufgerufen wird. Der Index der zuletzt aufgedeckten Karte wird als Parameter übergeben.

Somit haben wir etwas Zeit, um uns die aufgedeckten Karten zu merken, bevor sie wieder umgedreht werden. Deswegen heißt das Spiel ja auch Memory.

### Kompletter finaler Code

Der finale Code [ist hier zu finden](./src/99_final.js).
