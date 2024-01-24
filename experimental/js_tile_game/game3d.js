// Define game variables
let map = [
  [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
  ],
  [
    [1, 0, 1],
    [0, 0, 0],
    [1, 0, 1]
  ],
  [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
  ]
];
let tileSize = 50;
let player = {
  x: 1.5,
  y: 1.5,
  z: 1.5,
  rotation: 0,
  fov: 60 * Math.PI / 180, // field of view in radians
  viewDistance: 10 // maximum distance for raycasting
};
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Game loop
function gameLoop() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw floor and ceiling
  ctx.fillStyle = "#CCCCCC";
  ctx.fillRect(0, 0, canvas.width, canvas.height / 2);
  ctx.fillStyle = "#999999";
  ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);

  // Cast rays and draw walls
  for (let i = 0; i < canvas.width; i++) {
    let rayAngle = player.rotation - player.fov / 2 + i / canvas.width * player.fov;
    let rayX = Math.cos(rayAngle);
    let rayY = Math.sin(rayAngle);

    let hit = false;
    let hitX, hitY, hitZ, hitDistance;
    let distance = 0;

    while (!hit && distance < player.viewDistance) {
      let x = Math.floor(player.x + rayX * distance);
      let y = Math.floor(player.y + rayY * distance);
      let z = Math.floor(player.z);

      if (map[z][y][x] === 1) {
        hit = true;
        hitX = x;
        hitY = y;
        hitZ = z;
        hitDistance = distance;
      }

      distance += 0.1;
    }

    if (hit) {
      let wallHeight = tileSize / hitDistance * canvas.height;
      let wallTop = canvas.height / 2 - wallHeight / 2;
      let wallBottom = canvas.height / 2 + wallHeight / 2;
      let wallColor = "#CCCCCC";

      if (hitZ === 1) {
        wallColor = "#999999";
      }

      ctx.fillStyle = wallColor;
      ctx.fillRect(i, wallTop, 1, wallHeight);
    }
  }

  // Request next frame
  requestAnimationFrame(gameLoop);
}

// Start game loop
gameLoop();

