noise.seed(Math.random());
var numLines = 100;
var dotTol = 0.5;
var diamondLimit = .1;
var maxLen = 2000;
var xMax = 1000;
var yMax = 800;
var minSize = 10;
var maxSize = 20;
var lineSpacing = 10;

var lines = [];
var dots = [];

// get the stuff
for (var i = 0; i < numLines; i++) {
  var x = Math.random();
  var y = Math.random();
  var line = getLine(x, y);
  if (checkline(line)) {
    lines.push(line);
    dots.push(getDots(line, x, y));
  }
}
// draw the stuff
lines.forEach(function(line) {
  Path.Line(line);
});
dots.forEach(function(dotList) {
  dotList.forEach(function(dot) {
    var dot;
    if (dot.type === 'dot') {
      dot = Path.Circle(new Point(dot.x, dot.y), dot.size);
    } else if (dot.type === 'diamond') {
      dot = new Path(dot.path);
    }
    dot.strokeColor = 'black';
    dot.fillColor = 'white';
  });
});

function getLine(x, y) {
  // get perlin for coords
  var perlin = noise.simplex2(x, y);
  var length = Math.round(maxLen * perlin);

  // get center
  var cx = Math.round(x * xMax);
  var cy = Math.round(y * yMax);

  var start;
  var end;

  // horizontal, or vertical?
  if (Math.random() < 0.5) {
    start = [cx, cy - length / 2];
    end = [cx, cy + length / 2];
  } else {
    start = [cx - length / 2, cy];
    end = [cx + length / 2, cy];
  }

  // draw line
  // new Path.Line({
  return {
    from: start,
    to: end,
    strokeColor: 'black',
  };
}

function getDots(line, x, y) {
  var perlin = noise.simplex2(x, y);
  var nilrep = noise.simplex2(y, x);

  var maxElements = Math.ceil(Math.abs(perlin) * 4);
  var numElements = Math.ceil(Math.random() * maxElements) + 1;

  // break the line into a number of segments, put 1-5 dots on each segment
  var segments = [];
  for (var i = 0; i < numElements; i++) {
    segments.push({
      start: [
        line.from[0] + (i * (line.to[0] - line.from[0])) / numElements,
        line.from[1] + (i * (line.to[1] - line.from[1])) / numElements,
      ],
      end: [
        line.from[0] + ((i + 1) * (line.to[0] - line.from[0])) / numElements,
        line.from[1] + ((i + 1) * (line.to[1] - line.from[1])) / numElements,
      ],
    });
  }

  var elements = [];
  segments.forEach(function(seg) {
    if (Math.random() > dotTol) {
      var numDots = Math.round(Math.abs(nilrep) * Math.abs(nilrep) * 5) + 1;
      console.log(numDots);
      var off = (nilrep + perlin) / 2;
      var dx = off * (seg.end[0] - seg.start[0]) + seg.start[0];
      var dy = off * (seg.end[1] - seg.start[1]) + seg.start[1];

      // get each dot in the cluster
      if (Math.random() > diamondLimit) {
        var dotFactor = perlin;
        var dotSize = Math.round(dotFactor * (maxSize - minSize)) + minSize;

        for (var d = 0; d < numDots; d++) {
          if (seg.end[0] === seg.start[0]) {
            // vertical
            dy -= dotSize * 2 * (numDots - 1 - d);
          } else {
            dx -= dotSize * 2 * (numDots - 1 - d);
          }

          elements.push({
            type: 'dot',
            x: dx,
            y: dy,
            size: dotSize,
          });
        }
      } else {
        // draw diamond
        for (var d = 0; d < numDots; d++) {
          var diamondPath = [];
          var thin = minSize / 3;
          var long = minSize * 5;
          if (seg.end[0] === seg.start[0]) {
            // vertical
            dy -= thin * 2 * (numDots - 1 - d);
            diamondPath.push(new Point(dx, dy - thin));
            diamondPath.push(new Point(dx - long, dy));
            diamondPath.push(new Point(dx, dy + thin));
            diamondPath.push(new Point(dx + long, dy));
            diamondPath.push(new Point(dx, dy - thin));
          } else {
            dx -= thin * 2 * (numDots - 1 - d);
            diamondPath.push(new Point(dx - thin, dy));
            diamondPath.push(new Point(dx, dy - long));
            diamondPath.push(new Point(dx + thin, dy));
            diamondPath.push(new Point(dx, dy + long));
            diamondPath.push(new Point(dx - thin, dy));
          }

          elements.push({
            type: 'diamond',
            path: diamondPath,
          });
        }
      }
    }
  });

  return elements;
}

function checkline(line) {
  return true;
}
