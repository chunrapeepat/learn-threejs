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
document.body.appendChild(renderer.domElement);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
doorColorTexture.colorSpace = THREE.SRGBColorSpace;
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
const matcapTexture = textureLoader.load("/textures/matcaps/1.png");
const gradientTexture = textureLoader.load("/textures/gradients/3.jpg");

/**
 * Environment map
 */
const rgbeLoader = new RGBELoader();
rgbeLoader.load("/textures/environmentMap/2k.hdr", (environmentMap) => {
  console.log(environmentMap);
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = environmentMap;
  scene.environment = environmentMap;
});

// MeshBasicMaterial
// const material = new THREE.MeshBasicMaterial({
//   map: doorColorTexture,
// });
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;
// material.side = THREE.DoubleSide;

// MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;

// MeshDepthMaterial
// const material = new THREE.MeshDepthMaterial();

// MeshLambertMaterial
// const material = new THREE.MeshLambertMaterial();

// MeshPhongMaterial
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color(0x1188ff);

// MeshStandardMaterial (use PBR)
// const material = new THREE.MeshStandardMaterial({ map: doorColorTexture });
// MeshPhysicalMaterial
const material = new THREE.MeshPhysicalMaterial({ map: doorColorTexture });
material.metalness = 1;
material.roughness = 1;
material.side = THREE.DoubleSide;
material.aoMap = doorAmbientOcclusionTexture;
material.aoMapIntensity = 1;
material.displacementMap = doorHeightTexture;
material.displacementScale = 0.05;
material.metalnessMap = doorMetalnessTexture;
material.roughnessMap = doorRoughnessTexture;
material.normalMap = doorNormalTexture;
material.transparent = true;
material.alphaMap = doorAlphaTexture;
gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);
// Clearcoat
material.clearcoat = 1;
material.clearcoatRoughness = 0;
gui.add(material, "clearcoat").min(0).max(1).step(0.0001);
gui.add(material, "clearcoatRoughness").min(0).max(1).step(0.0001);
// Sheen
material.sheen = 1;
material.sheenRoughness = 0.25;
material.sheenColor.set(1, 1, 1);
gui.add(material, "sheen").min(0).max(1).step(0.0001);
gui.add(material, "sheenRoughness").min(0).max(1).step(0.0001);
gui.addColor(material, "sheenColor");
// Iridescence
material.iridescence = 1;
material.iridescenceIOR = 1;
material.iridescenceThicknessRange = [100, 800];
gui.add(material, "iridescence").min(0).max(1).step(0.0001);
gui.add(material, "iridescenceIOR").min(1).max(2.333).step(0.0001);
gui.add(material.iridescenceThicknessRange, "0").min(1).max(1000).step(1);
gui.add(material.iridescenceThicknessRange, "1").min(1).max(1000).step(1);
// Transmission
material.transmission = 1;
material.ior = 1.5;
material.thickness = 0.5;
gui.add(material, "transmission").min(0).max(1).step(0.0001);
gui.add(material, "ior").min(1).max(10).step(0.0001);
gui.add(material, "thickness").min(0).max(1).step(0.0001);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
sphere.position.x = -1.5;
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 128, 128), material);
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material
);
torus.position.x = 1.5;

scene.add(sphere, plane, torus);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 10);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
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
