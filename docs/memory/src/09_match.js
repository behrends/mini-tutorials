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
let lastFlippedIndex = -1;
let checkingMatch = false;

function setup() {
  createCanvas(800, 800);

  for (let i = 0; i < colors.length; i++) {
    cards.push({ color: colors[i], flipped: false });
    cards.push({ color: colors[i], flipped: false });
  }
  cards = shuffle(cards);
}

function draw() {
  background('lightgrey');
  let index = 0;
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      let card = cards[index];
      if (card.flipped) {
        fill(card.color);
      } else {
        fill('white');
      }
      square(x * 200 + 10, y * 200 + 10, 180);
      index++;
    }
  }
}

function mousePressed() {
  if (checkingMatch) return; // Ignore clicks while checking

  for (let i = 0; i < cards.length; i++) {
    let x = (i % 4) * 200 + 10;
    let y = Math.floor(i / 4) * 200 + 10;

    if (
      mouseX > x &&
      mouseX < x + 180 &&
      mouseY > y &&
      mouseY < y + 180
    ) {
      if (!cards[i].flipped && lastFlippedIndex !== i) {
        cards[i].flipped = true;
        if (lastFlippedIndex === -1) {
          lastFlippedIndex = i;
        } else {
          checkingMatch = true;
          setTimeout(checkForMatch, 1000, i);
        }
      }
      break;
    }
  }
}

function checkForMatch(currentIndex) {
  if (cards[lastFlippedIndex].color !== cards[currentIndex].color) {
    cards[lastFlippedIndex].flipped = false;
    cards[currentIndex].flipped = false;
  }
  lastFlippedIndex = -1;
  checkingMatch = false;
}
