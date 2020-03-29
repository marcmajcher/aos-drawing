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

for (var x = 0; x < 100; x++) {
  drawLine(Math.random(), Math.random());
}

function drawLine(x, y) {
  var maxLen = 1000;
  var xMax = 1000;
  var yMax = 800;

  // get perlin for coords
  var perlin = noise.simplex2(x, y);
  var length = maxLen * perlin;

  // get center
  var cx = x * xMax;
  var cy = y * yMax;

  var start;
  var end;

  if (Math.random() < 0.5) {
    start = [cx, cy - length / 2];
    end = [cx, cy + length / 2];
  } else {
    start = [cx - length / 2, cy];
    end = [cx + length / 2, cy];
  }

  new Path.Line({
    from: start,
    to: end,
    strokeColor: 'black',
  });
}

// for (var x = 0; x < 1; x += 0.002) {
//   for (var y = 0; y < 1; y += 0.002) {
//     dot(20 + x * 1000, 20 + y * 1000, getp(x, y));
//   }
// }

// for (var x = 0; x < 1; x += 0.1) {
//   var yOff = 400;
//   var xOff = 20
//   var maxLen = 800;
//   length = getp(x, yOff / 10) * maxLen * (10*getp(yOff,x));
//   var start = [xOff + x * 1000, yOff];
//   var end = [xOff + x * 1000, yOff + length];
//   console.log(start, end);

//   // var length = noise.simplex2(x, .2)
//   var line = new Path.Line({
//     from: start,
//     to: end,
//     strokeColor: 'black',
//   });
// }
