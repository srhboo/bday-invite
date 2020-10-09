let myFont;
let peace;
let adjustedX;
let adjustedY;
let face;
let view = "msg";
let message;
let camera;
let z = 1300,
  x = 0;
let orbs = [];
let colours = ["blue"];

function goPlay() {
  view = "play";
  message.hide();
}

function preload() {
  myFont = loadFont("assets/VT323.ttf");
  peace = loadImage("assets/peace.png");
  face = loadImage("assets/bday-1.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  adjustedX = -width / 2;
  adjustedY = -height / 2;
  noStroke();
  textFont(myFont);
  message = createDiv(msg).class("msg").attribute("id", "msg");
  const button = document.getElementById("press");
  button.addEventListener("click", goPlay);
  camera = createCamera();
  setCamera(camera);

  for (let i = 0; i < 100; i++) {
    const x = random(-5000, 2000);
    const r1 = random(300, 400);
    const r2 = random(0, 180);
    const c = random(colours);
    orbs.push({ x, r1, r2, c });
  }
}

function draw() {
  background(0);
  textSize(48);
  fill(220);
  if (view === "play") {
    if (keyIsDown(65)) {
      x -= 5;
    }

    if (keyIsDown(68)) {
      x += 5;
    }

    if (keyIsDown(87)) {
      z -= 5;
    }

    if (keyIsDown(83)) {
      z += 5;
    }

    text(
      "Press WASD to move.",
      adjustedX + 100,
      adjustedY + 200,
      width - 100,
      height - 100
    );
    text(
      "Follow the peace signs.",
      adjustedX + 100,
      adjustedY + 300,
      width - 100,
      height - 100
    );
    camera.setPosition(x, 0, z);

    push();
    shininess(200);
    ambientLight(50);
    specularColor(200, 160, 100);
    pointLight(255, 255, 200, 0, -50, 150);
    specularColor(100, 80, 160);
    pointLight(0, 255, 0, 0, 50, 150);

    for (let i = 0; i < orbs.length; i++) {
      push();
      const { x, r1, r2, c } = orbs[i];
      translate(x, r1 * sin(r2 + millis() / 2000), -i * 500);
      specularMaterial(c);
      sphere(100);
      pop();
    }
    pop();

    push();
    translate(-400, 0, -1000);
    image(peace, 0, 0);
    translate(500, 0, -4000);
    image(peace, 0, 0);
    translate(-1000, 0, -5000);
    image(peace, 0, 0);
    translate(1000, 0, -6000);
    image(peace, 0, 0);
    translate(1000, 0, -6000);
    image(peace, 0, 0);
    translate(1000, 0, -6000);
    image(face, 0, 0);
    textSize(100);
    text("you made it! love ya xoxo", -10, 800);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
