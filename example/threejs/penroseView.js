/* eslint-env browser */
/* global THREE */
import iterationLayers from '../../model/penrose';

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
  const penroseLayers = iterationLayers(LAYER_COUNT);
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
