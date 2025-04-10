import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
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
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

/**
 * Objects and Plan
 */
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
});
const sphereMesh = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  sphereMaterial
);
sphereMesh.castShadow = true;
sphereMesh.position.x = 0;
sphereMesh.position.y = 0;
sphereMesh.position.z = 2;
scene.add(sphereMesh);

const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
});
const planeMesh = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), planeMaterial);
planeMesh.receiveShadow = true;
planeMesh.position.x = 0;
planeMesh.position.y = -1;
planeMesh.position.z = 0;
scene.add(planeMesh);

// Lights
// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 10);
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
pointLight.position.x = 1;
pointLight.position.y = 1;
pointLight.position.z = 5;
scene.add(pointLight);

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
