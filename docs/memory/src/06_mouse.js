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

function setup() {
  createCanvas(600, 600);

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
      square(x * 150 + 5, y * 150 + 5, 140);
      index++;
    }
  }
}

function mousePressed() {
  for (let i = 0; i < cards.length; i++) {
    let x = (i % 4) * 150 + 5;
    let y = Math.floor(i / 4) * 150 + 5;

    if (
      mouseX > x &&
      mouseX < x + 140 &&
      mouseY > y &&
      mouseY < y + 140
    ) {
      cards[i].flipped = !cards[i].flipped;
      break;
    }
  }
}
