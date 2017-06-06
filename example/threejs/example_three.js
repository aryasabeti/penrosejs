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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (iterationLayers);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_penrose__ = __webpack_require__(0);
/* eslint-env browser */
/* global THREE */


function triangleAdapter(penrose) {
  const triangle = new THREE.Triangle(
        new THREE.Vector3(penrose.ax, penrose.ay, 0),
        new THREE.Vector3(penrose.bx, penrose.by, 0),
        new THREE.Vector3(penrose.cx, penrose.cy, 0),
    );

  const geometry = new THREE.Geometry();
  geometry.vertices.push(triangle.a);
  geometry.vertices.push(triangle.b);
  geometry.vertices.push(triangle.c);
  geometry.faces.push(new THREE.Face3(0, 1, 2, triangle.normal()));

  const color = penrose.isThin ? 0x0000ff : 0x00ff00;
  const material = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide });

  return new THREE.Mesh(geometry, material);
}

function setupRenderer() {
  const webGlRenderer = new THREE.WebGLRenderer();
  webGlRenderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(webGlRenderer.domElement);
  return webGlRenderer;
}

function setupCamera() {
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
  camera.position.z = 2;
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  return camera;
}

function setupScene() {
  const LAYER_COUNT = 6;
  const penroseLayers = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__model_penrose__["a" /* default */])(LAYER_COUNT);
  const scene = new THREE.Scene();
  for (let i = 0; i < penroseLayers[LAYER_COUNT - 1].length; i += 1) {
    scene.add(triangleAdapter(penroseLayers[LAYER_COUNT - 1][i]));
  }
  return scene;
}

const scene = setupScene();
const camera = setupCamera();
const webGlRenderer = setupRenderer();
webGlRenderer.render(scene, camera);

function render() {
  requestAnimationFrame(render);
  webGlRenderer.render(scene, camera);
}

render();


/***/ })
/******/ ]);