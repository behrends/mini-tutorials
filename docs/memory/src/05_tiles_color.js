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
