/* eslint-env browser */
/* eslint-disable no-param-reassign */
/* global Processing */
import iterationLayers from '../../model/penrose';

const SCALE = 250;
const LAYER_COUNT = 8; // chosen by quick browser test
const allTris = iterationLayers(LAYER_COUNT);
let stroke = true;

function drawPenroseTiling(processing) {
  processing.draw = function () {
    const numIterations = allTris.length;
    const interval = window.innerHeight / numIterations;
    let whichInterval;

    for (let i = 1; i < numIterations + 1; i += 1) {
      if (processing.mouseY - (i * interval) < 0) {
        whichInterval = i - 1;
        break;
      }
    }

    const tris = allTris[whichInterval];

    for (let i = 0; i < tris.length; i += 1) {
      const currentTri = tris[i];
      if (currentTri.isThin) {
        processing.fill(0, 128, 115);
      } else {
        processing.fill(0, 94, 125);
      }
      processing.triangle(
        SCALE * currentTri.ax,
        SCALE * currentTri.ay,
        SCALE * currentTri.bx,
        SCALE * currentTri.by,
        SCALE * currentTri.cx,
        SCALE * currentTri.cy,
      );
    }
  };

  processing.mouseClicked = function () {
    if (stroke) {
      processing.stroke(0);
    } else {
      processing.noStroke();
    }
    stroke = !stroke;
  };

  function setup() {
    processing.size(window.innerWidth, window.innerHeight);
    processing.background(40);
    processing.noStroke();
    const centerX = processing.width / 2;
    const centerY = processing.height / 2;
    processing.translate(centerX, centerY);
  }

  setup();
}

const canvas = document.getElementById('canvas1');
// attaching the sketchProc function to the canvas
new Processing(canvas, drawPenroseTiling); // eslint-disable-line no-new
