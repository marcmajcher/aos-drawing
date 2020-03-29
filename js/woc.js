noise.seed(Math.random());
var numLines = 10;

var maxLen = 1000;
var xMax = 1000;
var yMax = 800;
var minSize = 5;
var maxSize = 20;

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
    // do an upside-down bell curve
    var r = Math.min(0.9, Math.max(0.1, nilrep));
    var numDots = Math.round(Math.pow(r, -0.5) * Math.pow(1 - r, -0.5) * 3) - 5;
    console.log(numDots);

    var dotSize = Math.round(nilrep * (maxSize - minSize)) + minSize;
    // find the center of the dot cluster
    var off = (nilrep + perlin) / 2;
    var segCenter = [
      off * (seg.end[0] - seg.start[0]) + seg.start[0],
      off * (seg.end[1] - seg.start[1]) + seg.start[1],
    ];

    var dotsLength = dotSize * numDots * 2;
    // get each dot in the cluster
    for (var d = 0; d < numDots; d++) {
      
    }

    elements.push({
      type: 'dot',
      x: segCenter[0],
      y: segCenter[1],
      size: dotSize,
    });

    // elements.push({
    //   type: 'dot',
    //   x: seg.start[0],
    //   y: seg.start[1],
    //   size: dotSize,
    // });
    // elements.push({ type: 'dot', x: seg.end[0], y: seg.end[1], size: maxSize });
  });

  return elements;
}
