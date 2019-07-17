// Dani Vicario - textureGenerator experiment (canvas)- Thu 13 Aug 2020 23:17:51 CEST

// eslint-disable-next-line no-unused-vars
const globalCompositeOperationModes = {
  "normal": "source-over",
  "source-in": "source-in",
  "source-out": "source-out",
  "source-atop": "source-atop",
  "destination-over": "destination-over",
  "destination-in": "destination-in",
  "destination-out": "destination-out",
  "destination-atop": "destination-atop",
  "lighter": "lighter",
  "copy": "copy",
  "xor": "xor",
  "multiply": "multiply",
  "screen": "screen",
  "overlay": "overlay",
  "darken": "darken",
  "lighten": "lighten",
  "color-dodge": "color-dodge",
  "color-burn": "color-burn",
  "hard-light": "hard-light",
  "soft-light": "soft-light",
  "difference": "difference",
  "exclusion": "exclusion",
  "hue": "hue",
  "saturation": "saturation",
  "color": "color",
  "luminosity": "luminosity"
};

// eslint-disable-next-line func-names

/** @type HTMLCanvasElement */
const canvasDOMEl = document.getElementById("canvas");

/** @type CanvasRenderingContext2D */
const ctx = canvasDOMEl.getContext("2d");

const w = window.innerWidth;
const h = window.innerHeight;
// eslint-disable-next-line no-unused-vars
const w2 = w / 2;
// eslint-disable-next-line no-unused-vars
const h2 = h / 2;

// eslint-disable-next-line no-unused-vars
const { PI } = Math;
// eslint-disable-next-line no-unused-vars
const PI_DOUBLE = 2 * Math.PI;
// eslint-disable-next-line no-unused-vars
const PI_HALF = Math.PI / 2;

// height="2160" width="3840"

// canvasDOMEl.setAttribute("height", 2160);
// canvasDOMEl.setAttribute("width", 3840);

canvasDOMEl.setAttribute("height", window.innerHeight);
canvasDOMEl.setAttribute("width", window.innerWidth);

ctx.save();

function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const textures = [
  "blue_vein.jpg",
  "cement_shoe.jpg",
  "clean_slate.jpg",
  "cracked_up.jpg",
  "crime_scene.jpg",
  "emerald_city.jpg",
  "grey_ghost.jpg",
  "grunge_music.jpg",
  "jade_helm.jpg",
  "lost_marble.jpg",
  "mustard_gas.jpg",
  "sand_pit.jpg",
  "smoke_stone.jpg",
  "spilt_milk.jpg",
  "t1.png",
  "t2.png",
  "t3.png",
  "t4.jpg",
  "white_wash.jpg"
];

function generate() {
  const texture = new Image();
  const f = () => `./textures/${textures.splice(randomInt(0, textures.length - 1), 1)}`;

  let pos = f();

  texture.src = pos;
  const texture2 = new Image();

  pos = f();
  texture2.src = pos;

  let loaded = 0;

  function checkLoaded() {
    if (loaded < 2) return;

    ctx.clearRect(0, 0, w, h);

    ctx.globalCompositeOperation = globalCompositeOperationModes.overlay;
    ctx.filter = `hue-rotate(${randomInt(0, 360)}deg)`;

    ctx.save();
    ctx.filter = `blur(${randomFloat(0, 2)}px) hue-rotate(${randomFloat(0, 360)}deg)`;
    ctx.drawImage(texture, 0, 0, w, h);
    ctx.restore();

    ctx.save();
    ctx.filter = `blur(0px) hue-rotate(${randomFloat(0, 360)}deg)`;
    ctx.drawImage(texture2, 0, 0, w + randomInt(0, 400), h + randomInt(0, 400));
    ctx.restore();

    ReImg.fromCanvas(document.getElementById("canvas")).downloadPng();
  }

  texture.onload = () => {
    loaded++;
    checkLoaded();
  };

  texture2.onload = () => {
    loaded++;
    checkLoaded();
  };
}
setInterval(() => {
  generate();
}, 5000);
