noise.seed(Math.random());
var numLines = 100;

var maxLen = 1000;
var xMax = 1000;
var yMax = 800;

var lines = [];
var dots = [];

// get the stuff
for (var i = 0; i < numLines; i++) {
  var x = Math.random();
  var y = Math.random();
  var line = getLine(x, y);
  lines.push(line);
  dots.push(getDots(line, x, y));
}

// draw the stuff
lines.forEach(function(line) {
  Path.Line(line);
});
dots.forEach(function(dotList) {
  dotList.forEach(function(dot) {
    var circle = Path.Circle(new Point(dot.x, dot.y), dot.size);
    circle.strokeColor = 'black';
    circle.fillColor = 'white';
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
  var minSize = 5;
  var maxSize = 20;
  var perlin = noise.simplex2(x, y);
  var nilrep = noise.simplex2(y, x);

  var maxElements = Math.ceil(Math.abs(perlin) * 4);
  var numElements = Math.ceil(Math.random() * maxElements) + 1;

  var segments = [];
  // console.log('X', x, 'Y', y);
  // console.log(' numElements:', numElements);

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
    // var numDots = Math.ceil(nilrep*5);
    // do an upside-down bell curve
    var numDots = Math.floor( (perlin + nilrep)*5 +5);
    console.log(numDots)
    for (var d=0; d<numElements; d++) {

    }
    elements.push({
      type: 'dot',
      x: seg.start[0],
      y: seg.start[1],
      size: minSize,
    });
    // elements.push({ type: 'dot', x: seg.end[0], y: seg.end[1], size: maxSize });
  });

  return elements;
  [
    { x: line.from[0], y: line.from[1], size: minSize },
    { x: line.to[0], y: line.to[1], size: maxSize },
  ];
}
