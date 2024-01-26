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
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      square(x * 150 + 5, y * 150 + 5, 140);
    }
  }
}
