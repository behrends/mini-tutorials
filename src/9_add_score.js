title = '';

description = `
`;

characters = [];

options = {};

let cord;
let pins;
let nextPinDist;
const cordLength = 7;

function update() {
  if (!ticks) {
    pins = [vec(50, 5)];
    nextPinDist = 5;
    cord = { angle: 0, length: cordLength, pin: pins[0] };
  }
  let scroll = 0.02;
  if (cord.pin.y < 80) {
    scroll += (80 - cord.pin.y) * 0.1;
  }
  if (input.isPressed) {
    cord.length += 1;
  } else {
    cord.length += (cordLength - cord.length) * 0.1;
  }
  cord.angle += 0.05;
  line(cord.pin, vec(cord.pin).addWithAngle(cord.angle, cord.length));
  if (cord.pin.y > 98) {
    end();
  }
  let nextPin;
  remove(pins, (p) => {
    p.y += scroll;
    if (box(p, 3).isColliding.rect.black && p !== cord.pin) {
      nextPin = p;
    }
    return p.y > 102;
  });
  if (nextPin != null) {
    play('powerUp');
    addScore(ceil(cord.pin.distanceTo(nextPin)), nextPin);
    cord.pin = nextPin;
    cord.length = cordLength;
  }
  nextPinDist -= scroll;
  while (nextPinDist < 0) {
    pins.push(vec(rnd(10, 90), -2 - nextPinDist));
    nextPinDist += rnd(5, 15);
  }
}
