const PENROSE_ANGLE_DEGREES = 36;
const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;
const PI = 3.14159265359;

const toRadians = degrees => degrees * ((2 * PI) / 360);
const toDegrees = radians => (radians * 360) / (2 * PI); // eslint-disable-line no-unused-vars

// all triangle points must be specified COUNTERCLOCKWISE
function Triangle(isThin, ax, ay, bx, by, cx, cy) {
  this.isThin = isThin;
  this.ax = ax;
  this.ay = ay;
  this.bx = bx;
  this.by = by;
  this.cx = cx;
  this.cy = cy;
}

function PenroseTriangleAroundOrigin(posZeroToNine) {
  const shouldMirror = !!(posZeroToNine % 2);
  let flipAngle = 0;
  let noFlipAngle = PENROSE_ANGLE_DEGREES;
  const position = PENROSE_ANGLE_DEGREES * posZeroToNine;

  if (shouldMirror) {
    flipAngle = PENROSE_ANGLE_DEGREES;
    noFlipAngle = 0;
  }

  return new Triangle(
    true,
    0,
    0,
    Math.cos(toRadians(position + flipAngle)),
    Math.sin(toRadians(position + flipAngle)),
    Math.cos(toRadians(position + noFlipAngle)),
    Math.sin(toRadians(position + noFlipAngle)),
  );
}

function subdivideThin(triangle) {
  const px = triangle.ax + ((triangle.bx - triangle.ax) / GOLDEN_RATIO);
  const py = triangle.ay + ((triangle.by - triangle.ay) / GOLDEN_RATIO);
  return [
    new Triangle(true, triangle.cx, triangle.cy, px, py, triangle.bx, triangle.by),
    new Triangle(false, px, py, triangle.cx, triangle.cy, triangle.ax, triangle.ay),
  ];
}

function subdivideThick(triangle) {
  const qx = triangle.bx + ((triangle.ax - triangle.bx) / GOLDEN_RATIO);
  const qy = triangle.by + ((triangle.ay - triangle.by) / GOLDEN_RATIO);
  const rx = triangle.bx + ((triangle.cx - triangle.bx) / GOLDEN_RATIO);
  const ry = triangle.by + ((triangle.cy - triangle.by) / GOLDEN_RATIO);
  return [
    new Triangle(false, qx, qy, rx, ry, triangle.bx, triangle.by),
    new Triangle(true, rx, ry, qx, qy, triangle.ax, triangle.ay),
    new Triangle(false, rx, ry, triangle.cx, triangle.cy, triangle.ax, triangle.ay),
  ];
}

function subdivide(triangle) {
  return triangle.isThin ? subdivideThin(triangle) : subdivideThick(triangle);
}

function subdivideAll(trisToSubdivide) {
  const newTris = [];

  for (let i = 0; i < trisToSubdivide.length; i += 1) {
    const divisions = subdivide(trisToSubdivide[i]);
    for (let j = 0; j < divisions.length; j += 1) {
      newTris.push(divisions[j]);
    }
  }

  return newTris;
}

// Recursively compute each iteration up to |iterations| and return as an ordered list
function iterationLayers(iterations) {
  const layers = [];
  const zerothLayer = [];

  for (let i = 0; i < 10; i += 1) {
    zerothLayer.push(PenroseTriangleAroundOrigin(i));
  }

  layers.push(zerothLayer);
  for (let i = 1; i < iterations; i += 1) {
    layers.push(subdivideAll(layers[i - 1]));
  }
  return layers;
}

export default iterationLayers;
