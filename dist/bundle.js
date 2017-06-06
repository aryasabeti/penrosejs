/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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

/* harmony default export */ __webpack_exports__["default"] = (iterationLayers);


/***/ })
/******/ ]);