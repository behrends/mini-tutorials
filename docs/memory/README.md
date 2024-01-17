## Memory-Spiel in p5.js

Dieser Artikel erklärt, wie ein einfaches Memory-Spiel mit p5.js erstellt werden kann.

Dies sind die Regeln des Spiels:

- Es gibt 16 Karten mit einer farbigen und einer grauen Seite. Die farbige Seite liegt nach unten auf dem Tisch, die graue Seite ist sichtbar.
- Jeweils zwei Karten haben die gleiche Farbe (verdeckt).
- Der Spieler deckt zwei Karten auf. Sind die Karten gleichfarbig, bleiben sie aufgedeckt. Sind sie ungleich, werden sie wieder nach kurzer Zeit umgedreht.
- Der Spieler muss sich die Position der Karten merken, um sie beim nächsten Zug wieder aufdecken zu können.
- Das Spiel ist zu Ende, wenn alle Karten aufgedeckt sind.

p5.js ist eine JavaScript-Bibliothek, die es ermöglicht, mit wenig Aufwand grafische und interaktive Inhalte in einem Webbrowser zu erstellen. Es ist besonders beliebt für künstlerische und kreative Projekte.

Wenn du mit diesem Tutorial arbeiten möchtest, dann kannst du den hier beschriebenen Code in den Editor von p5.js einfügen. Der Editor ist unter [editor.p5js.org](https://editor.p5js.org/) zu finden.

Lass mich erklären, wie du mit diesem Artikel arbeitest. Wird der Quellcode auf der rechten Seite des Bildschirms angezeigt? Wenn nicht, scrolle die Seite nach unten, bis dieser Textabschnitt ungefähr in der Mitte des Bildschirms ist.

(src) [00_start.js](./src/00_start.js)

Der neu hinzugefügte Quellcode wird auf der rechten Seite des Bildschirms angezeigt. Die Anzeige ist in einem [vereinheitlichen Format von diff](https://en.wikipedia.org/wiki/Diff#Unified_format). Zeilen die ein `+` am Anfang haben, sind hinzugefügte Zeilen, und Zeilen mit `-` sind gelöschte Zeilen.

Wenn du den [Editor von p5.js](https://editor.p5js.org/) im Browser zum ersten Mal öffnest, dann siehst du zwei vordefiniert Funktionen, die in der Datei `sketch.js` definiert sind und die in der Regel jedes p5.js-Programm benötigt:

- `setup`
- `draw`

Die Funktion `setup` wird einmal ausgeführt, wenn das Programm startet. Die Funktion `draw` wird immer wieder ausgeführt, nachdem `setup` ausgeführt wurde.

In `setup` legen wir die Größe des Zeichenbereichs fest. Wir nutzen die Funktion `createCanvas`, um einen Zeichenbereich mit einer Breite von 400 Pixeln und einer Höhe von 400 Pixeln zu erstellen:

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

(src) [01_setup.js](./src/01_setup.js)

Wir wollen nun die Größe der Leinwand ändern. Ändere die Werte in dem Aufruf von `createCanvas` in der `setup`-Funktion von `400` auf `800`. Außerdem wollen wir sprechende Farbnamen anstatt numerischer Werte nutzen. Ändere den Wert in dem Aufruf von `background` in der `draw`-Funktion von `220` auf `lightgrey` und beobachte, wie sich nun Größe und Farbe des Zeichenbereichs ändern, wenn du auf den `Play`- bzw. `Run`-Button klickst.

(src) [02_variables.js](./src/02_variables.js)

Als nächstes erstellen wir die Karte des Memory-Spiels. Wir benötigen 16 Karten mit 8 verschiedenen Farben für jedes gleichfarbige Kartenpaar. Dafür definieren wir außerhalb der Funktionen `setup` und `draw` zwei Array-Variablen:

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

(src) [03_cards.js](./src/03_cards.js)

Die 16 Karten bestehend aus 8 gleichfarbigen Paaren müssen wir nun erstellen. Dies geschieht in einer `for`-Schleife und fügen sie dem Array `cards` hinzu &mdash; zwei Karten für jede Farbe. Die Karten werden mit der p5.js-Hilfsfunktion `shuffle` gemischt. Dies geschieht in `setup`:

```js
for (let i = 0; i < colors.length; i++) {
  cards.push({ color: colors[i], flipped: false });
  cards.push({ color: colors[i], flipped: false });
}
cards = shuffle(cards);
```

Jede Karte wird durch ein JavaScript-Objekt repräsentiert, wobei die Eigenschaft `color` die Farbe anzeigt und `flipped` angibt, ob die Karte umgedreht ist oder nicht. Die Eigenschaft `flipped` wird zu Beginn auf `false` gesetzt, da alle Karten zu Beginn des Spiels umgedreht sind.

(src) [04_tiles.js](./src/04_tiles.js)

Wir nutzen die Funktion `fill`, um die Farbe des Quadrats und alle nachfolgenden Formen zu setzen. Alles, was nach diesem Befehl gezeichnet wird, bis ein neuer `fill`-Befehl auftritt, wird die Farbe Grau haben.

Die Funktion `noStroke` entfernt die Umrandung (den „Stroke“) des Quadrats und von nachfolgenden Formen. Standardmäßig haben Formen in p5.js eine Umrandung. Durch `noStroke()` wird diese Umrandung nicht gezeichnet, sodass nur die Füllfarbe sichtbar ist.

Die Funktion `square` zeichnet das Quadrat auf den Zeichenbereich. Die ersten beiden Parameter (`20, 20`) sind die x- und y-Koordinaten des Quadrats auf der Zeichenfläche. Der Nullpunkt des Koorinatensystems liegt in der oberen linken Ecke des Zeichenbereichs, sodass diese Quadrat links oben erscheinen wird. Die dritte Zahl im Aufruf von `square` ist die Größe des Quadrats (`150`), und die vierte Zahl (`10`) spezifiziert den Radius der Ecken des Quadrats, was bewirkt, dass die Ecken leicht abgerundet sind.

(src) [05_tiles_color.js](./src/05_tiles_color.js)

**Tipp: Spickzettel (cheat sheet) für p5.js**

In diesem [Spickzettel](https://bmoren.github.io/p5js-cheat-sheet/de.html) findest du eine Übersicht über die wichtigsten Funktionen von p5.js. Insbesondere ist dort zu sehen, wie das Koorinatensystem des Zeichenbereichs aussieht.

(src) [07_mouse.js](./src/07_mouse.js)

Wir wollen nun das Spielfeld mit insgesamt 16 Karten in einem 4x4-Raster erstellen. Die erste Reihe könnten wir z.B. so erhalten:

```js
square(20, 20, 150, 10);
square(20 + 200, 20, 150, 10);
square(20 + 400, 20, 150, 10);
square(20 + 600, 20, 150, 10);
```

Wie du sehen kannst, wird die x-Koordinate der Karten in jeder Codezeile um 200 erhöht. Die y-Koordinate bleibt gleich. Wir können diese vier Aufrufe von `square` in einer Schleife zusammenfassen:

```js
for (let i = 0; i < 4; i++) {
  square(20 + 200 * i, 20, 150, 10);
}
```

Und mit einer weiteren geschachtelten Schleife können wir die vier Zeilen des Spielfelds erstellen:

```js
for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 4; j++) {
    square(20 + 200 * i, 20 + 200 * j, 150, 10);
  }
}
```

(src) [09_match.js](./src/09_match.js)

lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet

lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet
lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet
lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet
lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet
lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet
lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet
lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet
lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet
