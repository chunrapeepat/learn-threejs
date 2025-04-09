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

// Create a cube
// load texture
// const doorTextureImage = new Image();
// doorTextureImage.src = "/doorwood/Door_Wood_001_basecolor.jpg";
// const doorTexture = new THREE.Texture(doorTextureImage);
// doorTexture.colorSpace = THREE.SRGBColorSpace;
// doorTexture.needsUpdate = true;

const loadingManager = new THREE.LoadingManager();
loadingManager.onLoad = () => {
  console.log("loadingManager.onLoad");
};
loadingManager.onProgress = () => {
  console.log("loadingManager.onProgress");
};
loadingManager.onError = () => {
  console.log("loadingManager.onError");
};
const textureLoader = new THREE.TextureLoader(loadingManager);
const doorColorTexture = textureLoader.load(
  "/doorwood/Door_Wood_001_basecolor.jpg"
);
doorColorTexture.minFilter = THREE.NearestFilter;
const doorAlphaTexture = textureLoader.load(
  "/doorwood/Door_Wood_001_alpha.jpg"
);
const doorHeightTexture = textureLoader.load(
  "/doorwood/Door_Wood_001_height.png"
);
const doorNormalTexture = textureLoader.load(
  "/doorwood/Door_Wood_001_normal.jpg"
);
const doorAmbientOcclusionTexture = textureLoader.load(
  "/doorwood/Door_Wood_001_ambientOcclusion.jpg"
);
const doorMetalnessTexture = textureLoader.load(
  "/doorwood/Door_Wood_001_metallic.jpg"
);
const doorRoughnessTexture = textureLoader.load(
  "/doorwood/Door_Wood_001_roughness.jpg"
);

const geometry = new THREE.BoxGeometry(1, 1, 1, 10, 10, 10);
const material = new THREE.MeshBasicMaterial({
  map: doorColorTexture,
  // color: 0x00ff00,
  // wireframe: true,
});
const cube = new THREE.Mesh(geometry, material);
cube.position.x = -1;
cube.position.y = 1;
scene.add(cube);

// create triangle from scratch
const positionsArray = new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]);
// 3 is because we send the position; e.g.g uv = 2 or size = 1
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
const triangleGeometry = new THREE.BufferGeometry();
triangleGeometry.setAttribute("position", positionsAttribute);
const triangleMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const triangle = new THREE.Mesh(triangleGeometry, triangleMaterial);
scene.add(triangle);

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

// controls
const controls = new OrbitControls(camera, renderer.domElement);
const triangleFolder = gui.addFolder("Triangle");

triangleFolder.add(triangle.position, "x").min(-3).max(3).step(0.01);
triangleFolder.add(triangle.position, "y").min(-3).max(3).step(0.01);
triangleFolder.add(triangle.position, "z").min(-3).max(3).step(0.01);
triangleFolder.addColor(triangleMaterial, "color");

gui.addColor(material, "color");

// Animation loop
let time = performance.now();
// const clock = new THREE.Clock();
controls.update();
function animate(): void {
  requestAnimationFrame(animate);

  //Time (16.67 for 60fps)
  const currentTime = performance.now();
  const deltaTime = currentTime - time;
  time = currentTime;

  // alternative: clock.elapsedTime

  // cube.rotation.x += deltaTime * 0.001;
  // cube.rotation.y += deltaTime * 0.001;
  renderer.render(scene, camera);
}

// Handle window resize
handleWindowResize(camera, renderer);

animate();
