title = '';

description = `
`;

characters = [];

options = {};

let pins;

function update() {
  if (!ticks) {
    pins = [vec(50, 5)];
  }
  let scroll = 0.02;
  pins.forEach((p) => {
    p.y += scroll;
    box(p, 3);
  });
}
