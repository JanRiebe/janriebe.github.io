// Define canvas and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


// Define classes
function Map(background, foreground) {
  this.background = background;
  this.foreground = foreground;
}

/*
The tiles in tilesets are automatically sliced and given numbers in continuous order.

*/
let tilepaths =
[
"./sprites/TX Tileset Grass.png",
"./sprites/TX Plant.png"
]
let tilesets = 
[
];
let loadedTilesets = 0;
for(let i=0;i<tilepaths.length;i++)
{ 
	img = new Image();
	tilesets.push(img);
	img.src= tilepaths[i];
	img.onload = function() {
	  loadedTilesets ++;
	};
};



// Define game variables
let maps = [
[
  [1, 1, 3, 1, 1, 1],
  [1, 0, 3, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 3, 1],
  [1, 0, 3, 3, 3, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1],
],
[
  [1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 0, 3, 3, 0, 1],
  [1, 0, 3, 3, 0, 1],
  [1, 0, 3, 3, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1]
]
];

function Portal(x, y, toX, toY, toMap)
{
	this.x=x;
	this.y=y;
	this.toX=toX;
	this.toY=toY;
	this.toMap=toMap;
}
/*
let portals =[ {
9:{4:1}
},
{
1:{1:0}
}
]
*/
let portals = [
[
new Portal(4,9,4,9,1),
new Portal(1,1,7,2,0)
],
[
new Portal(1,1,1,2,0)
],
]


var currentMap = 0;

let tileSize = 64;

let camera = {
	x:100,
	y:100
}
let player = {
  x: 2,
  y: 2,
  targetX: 2,
  targetY: 2,
  speed: 10
};
let isMoving = false;
let lastFrameTime = performance.now();


const animations = [
  { name: 'idle', frames: [0], speed: 1 },
  { name: 'walk', frames: [1, 2, 3, 4], speed: 0.2 },
  { name: 'run', frames: [5, 6, 7, 8], speed: 0.1 }
];
const spriteSheet = new Image();
spriteSheet.src = 'path/to/sprite-sheet.png';
const sprite = new Image();


// Handle keyboard input
document.addEventListener("keydown", function(event) {
  if (isMoving) {
    return;
  }

  switch(event.keyCode) {
    case 37:
      if (maps[currentMap][player.y][player.x - 1] < 1) {
        player.targetX = player.x - 1;
        isMoving = true;
      }
      break;
    case 38:
      if (maps[currentMap][player.y - 1][player.x] < 1) {
        player.targetY = player.y - 1;
        isMoving = true;
      }
      break;
    case 39:
      if (maps[currentMap][player.y][player.x + 1] < 1) {
        player.targetX = player.x + 1;
        isMoving = true;
      }
      break;
    case 40:
      if (maps[currentMap][player.y + 1][player.x] < 1) {
        player.targetY = player.y + 1;
        isMoving = true;
      }
      break;
  }
  
});

// Game loop
function gameLoop() {

// Calculate elapsed time since last frame
  let currentTime = performance.now();
  let deltaTime = currentTime - lastFrameTime;
  lastFrameTime = currentTime;
  
  

  // ******************** updating positions ****************************

  // Update player position
  if (isMoving) {
    let dx = player.targetX - player.x;
    let dy = player.targetY - player.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 0) {
      let moveDist = Math.min(dist, player.speed * deltaTime / 1000);
      dx /= dist;
      dy /= dist;

      player.x += dx * moveDist;
      player.y += dy * moveDist;
    } else {
      player.x = player.targetX;
      player.y = player.targetY;
      isMoving = false;
    }
  }
  
  
  // calculate triggers
  let activePortals = portals[currentMap];
  if(!isMoving)
  {
	  for(let i=0;i<activePortals.length;i++)
	  {
	    if(player.y === activePortals[i].y)
	    {
	    	if(player.x === activePortals[i].x)
	    	{
	    		currentMap = activePortals[i].toMap;
	    		player.x = activePortals[i].toX;
	    		player.y = activePortals[i].toY;
	    		player.targetX = player.x;
	    		player.targetY = player.y;
	    		break;
	    	}
	    }
	   }
  }
  
  // move camera
  camera.x = canvas.width/2 - player.x*tileSize - tileSize/2;
  camera.y = canvas.height/2 - player.y*tileSize - tileSize/2;
    /*
    if (maps[currentMap][player.y][player.x] < 0) {
 	console.log("change");
        currentMap = -maps[currentMap][player.y][player.x]-1;
      }
      */
  
  
  
  // ******************** drawing ****************************
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw map
  for (let y = 0; y < maps[currentMap].length; y++) {
    for (let x = 0; x < maps[currentMap][y].length; x++) {
    /*
      if (maps[currentMap][y][x] === 1) {
        ctx.fillStyle = "black";
      } else  if (maps[currentMap][y][x] < 0) {
        ctx.fillStyle = "blue";
      } else {
        ctx.fillStyle = "white";
      }
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      */
//      if(loadedTilesets === tilesets.length)
      ctx.drawImage(tilesets[0],
      			maps[currentMap][y][x]*tileSize, 0, tileSize, tileSize,      			
      			x * tileSize + camera.x, y * tileSize + camera.y, tileSize+1, tileSize+1);
      			
    }
  }

  // draw triggers
  for(let i=0;i<activePortals.length;i++)
  {
	  ctx.fillStyle = "blue";
	  ctx.fillRect(activePortals[i].x * tileSize + camera.x, activePortals[i].y * tileSize + camera.y, tileSize, tileSize);
  }

  // Draw player
  ctx.fillStyle = "red";
  ctx.fillRect(player.x * tileSize + camera.x, player.y * tileSize + camera.y, tileSize, tileSize);
  
  
  /*
  const frameIndex = animation.frames[currentFrame];
  const x = (frameIndex % numFramesX) * tileSize;
  const y = Math.floor(frameIndex / numFramesX) * tileSize;
  
  sprite.src = 'path/to/sprite-sheet.png';
  sprite.onload = function() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(sprite, x, y, tileSize, tileSize, playerX, playerY, tileSize, tileSize);
  };
*/
  // Request next frame
  requestAnimationFrame(gameLoop);
  
}

// Start game loop
gameLoop();

