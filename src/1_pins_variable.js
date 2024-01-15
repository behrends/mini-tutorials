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
  pins.forEach((p) => {
    box(p, 3);
  });
}
