title = '';

description = `
`;

characters = [];

options = {};

let pins;
let nextPinDist;

function update() {
  if (!ticks) {
    pins = [vec(50, 5)];
    nextPinDist = 5;
  }
  let scroll = 0.02;
  pins.forEach((p) => {
    p.y += scroll;
    box(p, 3);
  });
  nextPinDist -= scroll;
  while (nextPinDist < 0) {
    pins.push(vec(rnd(10, 90), -2 - nextPinDist));
    nextPinDist += rnd(5, 15);
  }
}
