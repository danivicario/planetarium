import init from "./globe";
import "./css/reset.css";
import "./css/style.css";

fetch(`http://localhost:4000/planets`)
  .then((planets) => planets.json())
  .then((planets) => {
    init(document.getElementById("globe-app"), planets);
  });
