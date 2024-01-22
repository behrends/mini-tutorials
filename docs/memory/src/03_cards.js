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
}
