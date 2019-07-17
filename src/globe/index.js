import { init as initScene } from "./scene";
import Planet from "./planet";

export default function initGlobe(container, planets) {
  initScene(container);
  Planet.init(planets);

  window.onkeyup = function (e) {
    switch (e.keyCode) {
      case 71:
        Planet.showNextPlanet();
        break;

      case 72:
        Planet.showPrevPlanet();
        break;

      default:
        break;
    }
  };
}
