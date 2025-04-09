import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  createScene,
  createCamera,
  createRenderer,
  handleWindowResize,
} from "../utils/common";
import { GUI } from "lil-gui";

const gui = new GUI();

// Create basic elements
const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();
document.body.appendChild(renderer.domElement);

// materials
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material);
sphere.position.x = -1.5;
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material
);
torus.position.x = 1.5;

scene.add(sphere, plane, torus);

// axis helper
const axisHelper = new THREE.AxesHelper();
scene.add(axisHelper);

// controls
const controls = new OrbitControls(camera, renderer.domElement);

// Animation
let time = performance.now();
controls.update();
function animate(): void {
  requestAnimationFrame(animate);

  //Time (16.67 for 60fps)
  const currentTime = performance.now();
  const deltaTime = currentTime - time;
  time = currentTime;

  renderer.render(scene, camera);
}

// Handle window resize
handleWindowResize(camera, renderer);
animate();
