import * as THREE from "three";
import {
  createScene,
  createCamera,
  createRenderer,
  handleWindowResize,
} from "../utils/common";

// Create basic elements
const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();
document.body.appendChild(renderer.domElement);

// Create a cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});
const cube = new THREE.Mesh(geometry, material);
cube.position.x = -1;
cube.position.y = 1;
scene.add(cube);

// cube.position.normalize();

console.log("cube.position.length()", cube.position.length());
console.log(
  "cube.position.distanceTo(new THREE.Vector3(0, 0, 0))",
  cube.position.distanceTo(new THREE.Vector3(0, 0, 0))
);

// axis helper
const axisHelper = new THREE.AxesHelper();
scene.add(axisHelper);

camera.lookAt(cube.position);

// Animation loop
let time = performance.now();
// const clock = new THREE.Clock();
function animate(): void {
  requestAnimationFrame(animate);

  //Time (16.67 for 60fps)
  const currentTime = performance.now();
  const deltaTime = currentTime - time;
  time = currentTime;

  // alternative: clock.elapsedTime

  cube.rotation.x += deltaTime * 0.001;
  cube.rotation.y += deltaTime * 0.001;
  renderer.render(scene, camera);
}

// Handle window resize
handleWindowResize(camera, renderer);

animate();
