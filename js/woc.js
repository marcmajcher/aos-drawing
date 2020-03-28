noise.seed(Math.random());
// function dot(x, y, c) {
//   var SIZE = 2;
//   var circle = new Path.Circle(new Point(x, y), SIZE);
//   circle.fillColor = c;
// }

function getp(x, y) {
  p1 = noise.simplex2(x * 5, y * 5);
  p2 = noise.simplex2(-x * 5, -y * 5);
  return p1 * p2;
}
// for (var x = 0; x < 1; x += 0.002) {
//   for (var y = 0; y < 1; y += 0.002) {
//     dot(20 + x * 1000, 20 + y * 1000, getp(x, y));
//   }
// }

for (var x = 0; x < 1; x += 0.005) {
  var yOff = 400;
  var xOff = 20
  var maxLen = 800;
  length = getp(x, yOff / 10) * maxLen;
  var start = [xOff + x * 1000, yOff];
  var end = [xOff + x * 1000, yOff + length];
  console.log(start, end);

  // var length = noise.simplex2(x, .2)
  var line = new Path.Line({
    from: start,
    to: end,
    strokeColor: 'black',
  });
}
