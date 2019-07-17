import * as THREE from "three";
import { PLANET_RADIUS, PLANET_QUALITY } from "./constants";
import { rootMesh } from "./scene";
import * as d3 from "d3";

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const Planet = {
  _currentPlanet: 0,
  _planets: [],
  _rootMesh: null,
  _textureId: [
    ...new Set(
      Array(1000)
        .fill()
        .map((_) => randomInt(1, 28))
    )
  ],
  _drawPlanet: () => {
    const r = Planet._textureId[Planet._currentPlanet];

    let maxPlanetSize = Math.max.apply(null, [...Planet._planets.map((planet) => planet.size)]);
    let minPlanetSize = Math.min.apply(null, [...Planet._planets.map((planet) => planet.size)]);

    const planetScale = d3
      .scaleLinear()
      .range([PLANET_RADIUS / 2, PLANET_RADIUS])
      .domain([minPlanetSize, maxPlanetSize]);
    const planetSize = planetScale(Planet._planets[Planet._currentPlanet].size);

    const geometry = new THREE.SphereGeometry(planetSize, PLANET_QUALITY, PLANET_QUALITY);

    const loader = new THREE.TextureLoader();
    const material = new THREE.MeshPhongMaterial({
      map: loader.load(`generatedTextures/image (${r}).png`)
    });

    const mesh = new THREE.Mesh(geometry, material);

    document.querySelector(".planet-name").innerHTML = `${
      Planet._planets[Planet._currentPlanet].name
    }`;
    document.querySelector(".planet-name").style.display = `block`;

    for (var i = rootMesh.children.length - 1; i >= 0; i--) {
      rootMesh.remove(rootMesh.children[i]);
    }

    rootMesh.add(mesh);

    setTimeout(() => {
      document.querySelector("body").classList.add("visible");
    }, 500);
  },
  init: (planets) => {
    Planet._planets = planets;
    Planet._drawPlanet();
  },
  showNextPlanet: () => {
    Planet._currentPlanet--;
    if (Planet._currentPlanet < 0) {
      Planet._currentPlanet = 0;
    }

    document.querySelector("body").classList.remove("visible");
    Planet._drawPlanet();
  },
  showPrevPlanet: () => {
    Planet._currentPlanet++;
    if (Planet._currentPlanet > Planet._planets.length - 1) {
      Planet._currentPlanet = Planet._planets.length - 1;
    }
    document.querySelector("body").classList.remove("visible");
    Planet._drawPlanet();
  }
};

export default Planet;
