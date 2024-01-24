// Define canvas and context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


// Define classes
function Map(background, foreground) {
  this.background = background;
  this.foreground = foreground;
}

class Tileset {
  constructor(path, columns, rows) {
    this.loaded = false;
    this.columns = columns
    this.rows =  rows    

    this.img = new Image();
    this.img.src = path;
    this.img.onload = this._onLoaded();
  }
  _onLoaded(){
    this.loaded = true;
  };
  getTile(index) {
    if (index > this.columns*this.rows -1 )
      index = this.columns*this.rows -1;
    return [Math.floor(index%this.columns), Math.floor(index/this.columns)]
  };
}

/*
Abstracts animated tiles by having them accessible just as normal tiles.
*/
class AnimatedTileset
{
  /*
  tileset: a tileset object
  aimations: a list of lists of indices
             where each entry of the outer list is
             an animation for one tile
             and each entry in the inner list an
             index for a tile in the tileset
             that is a frame of the animation
  */
  constructor(tileset, animations)
  {
    this.set = tileset;
    this.animations = animations;
    this.frame = 0;
    this.loaded = tileset.loaded;
    this.img = tileset.img;
  }
  getTile(index) {
    let foo= this.set.getTile(this.animations[index][Math.floor(this.frame)%this.animations[index].length])
    //console.log(Math.floor(this.frame)%this.animations.length);
    return foo;
  }
}

/*
The tiles in tilesets are automatically sliced and given numbers in continuous order.

*/
let tilepaths =
[
"./sprites/TX Tileset Grass.png",
"./sprites/TX Plant.png",
"./sprites/grass.png",
"./sprites/house.png"
]
let tilesets = 
[
];
let loadedTilesets = 0;
for(let i=0;i<tilepaths.length;i++)
{ 
  tilesets.push(new Tileset(tilepaths[i], 4,4));
};
tilesets.push(new AnimatedTileset(tilesets[2], [[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]]));

let characterSpritesheet = new Image();
characterSpritesheet.src= "./sprites/global.png";
let characterLoaded = false;
characterSpritesheet.onload = function() {
  characterLoaded = true;
};
let characterAnimationFrame = 0.0;
let framesIdleUp = [[0, 1],[4,1]];
let framesIdleDown = [[0, 0],[4,0]];
let framesIdleLeft = [[0, 1],[4,1]];
let framesIdleRight = [[0, 0],[4,0]];
let framesUp = [[0, 1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1]];
let framesDown = [[0, 0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0]];
let framesLeft = [[0, 1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1]];
let framesRight = [[0, 0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0]];
let animation = framesIdleUp;
let nextAnimation = framesIdleUp;
let frameToDraw = [0, 0];



// Define game variables
let maps = [
[
    // Background
  [
    [1, 1, 28, 27, 26, 25],
    [2, 0, 29, 0, 0, 24],
    [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [4, 0, 30, 0, 0, 23],
    [5, 0, 31, 0, 0, 22],
    [6, 0, 32, 0, 40, 21],
    [7, 0, 33, 0, 39, 20],
    [8, 0, 34, 0, 38, 19],
    [9, 0, 35, 36, 37, 18],
    [10, 0, 0, 0, 0, 17],
    [11, 12, 13, 14, 15, 16],
  ],
  // Atop
  [
    [-1, 1001, 1028, 1027, 1026, 1025],
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1]
  ],
// Foreground
  [
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, 3000, 3001, -1],
    [-1, -1, -1, 4000, 4000, -1],
    [-1, 1001, -1, -1, -1, -1],
    [-1, 1002, -1, -1, -1, -1],
    [-1, 1003, -1, -1, -1, -1],
    [-1, 1004, -1, -1, -1, -1],
    [-1, 1005, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1]
  ],
],
[
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
    [1, 1, 3, 0, 3, 1],
    [1, 3, 1, 0, 3, 1],
    [1, 1, 1, 0, 1, 1],
    [1, 1, 1, 0, 1, 1],
    [1, 1, 1, 0, 1, 1],
    [1, 1, 1, 0, 1, 1],
    [1, 1, 1, 0, 1, 1],
    [1, 1, 1, 0, 1, 1]
  ],
  [
    [-1, -1, -1, -1, -1, -1]
  ],
  [
    [-1, -1, -1, -1, -1, -1]
  ],
],
[
  [ 
    [1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1],
    [1, 1, 3, 0, 3, 1],
    [1, 3, 1, 0, 3, 1],
    [1, 1, 1, 0, 1, 1],
    [1, 1, 1, 0, 1, 1],
    [1, 1, 1, 0, 1, 1],
    [1, 1, 1, 0, 1, 1],
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
  ],
  [ 
    [-1]
  ],
  [ 
    [-1]
  ]
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
new Portal(1,1,1,2,0),
new Portal(3,13,3,5,2)
],
[
new Portal(3,4,3,12,1)
],
]



function MapEvent(x, y, map, trigger)
{
	this.x=x;
	this.y=y;
	this.trigger = trigger;
}
let mapEvents = [
[
	new MapEvent(3,3,1,"map event triggered")
],
[],
[]
]


var audio = new Audio('https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3');



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
let justEnteredTile = true;
let lastFrameTime = performance.now();

/*
const animations = [
  { name: 'idle', frames: [0], speed: 1 },
  { name: 'walk', frames: [1, 2, 3, 4], speed: 0.2 },
  { name: 'run', frames: [5, 6, 7, 8], speed: 0.1 }
];
const spriteSheet = new Image();
spriteSheet.src = 'path/to/sprite-sheet.png';
const sprite = new Image();
*/

let dialogMessage = "";




let transitionAnimation = 0.0;


// Handle keyboard input
document.addEventListener("keydown", function(event) {

  if(dialogMessage)
  {
    if(event.key=="Enter")
      dialogMessage = "";
    return;
  }

  if (isMoving) {
    return;
  }

  switch(event.keyCode) {
    case 37:
      if (maps[currentMap][0][player.y][player.x - 1] < 1) {
        player.targetX = player.x - 1;
        isMoving = true;
      }
      break;
    case 38:
      if (maps[currentMap][0][player.y - 1][player.x] < 1) {
        player.targetY = player.y - 1;
        isMoving = true;
      }
      break;
    case 39:
      if (maps[currentMap][0][player.y][player.x + 1] < 1) {
        player.targetX = player.x + 1;
        isMoving = true;
      }
      break;
    case 40:
      if (maps[currentMap][0][player.y + 1][player.x] < 1) {
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
      justEnteredTile = true;
    }
  }
  
  
  // calculate triggers
  let activePortals = portals[currentMap];
  if(!isMoving && justEnteredTile)
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
	    		transitionAnimation = 0.0;
	    		break;
	    	}
	    }
	   }
  }
    let activeMapEvents = mapEvents[currentMap];
  if(!isMoving && justEnteredTile)
  {
	  for(let i=0;i<activeMapEvents.length;i++)
	  {
	    if(player.y === activeMapEvents[i].y)
	    {
	    	if(player.x === activeMapEvents[i].x)
	    	{
	    		console.log(activeMapEvents[i].trigger);
	    		audio.play();
          dialogMessage = activeMapEvents[i].trigger;
	    		// TODO use the trigger to look up other events to do
	    		// There should be some primitiv events which just call js functions, manipulating data 
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
  
  
  // Updating tile set animations
  for(let i=0;i<tilesets.length;i++)
  {
    tilesets[i].frame += deltaTime/(240); 
  }

  
  // ******************** drawing ****************************
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw map
  // Background
  for (let y = 0; y < maps[currentMap][0].length; y++) {
    for (let x = 0; x < maps[currentMap][0][y].length; x++) {
      let tileId = maps[currentMap][0][y][x];
      let setId = Math.floor(tileId/1000);
      tileId %= 1000;
      if(tileId < 0) continue;
      if( tilesets.length > 0 && tilesets[setId].loaded)
      {
        let tilePos = tilesets[setId].getTile(tileId);
        ctx.drawImage(tilesets[setId].img,
                tilePos[0]*tileSize, tilePos[1]*tileSize, tileSize, tileSize,      			
                x * tileSize + camera.x, y * tileSize + camera.y, tileSize+1, tileSize+1);
      }
    }
  }

  // Atop but behind the player
  for (let y = 0; y < maps[currentMap][1].length; y++) {
    for (let x = 0; x < maps[currentMap][1][y].length; x++) {
      let tileId = maps[currentMap][1][y][x];
      let setId = Math.floor(tileId/1000);
      tileId %= 1000;
      if(tileId < 0) continue;
      if( tilesets.length > 0 && tilesets[setId].loaded)
      {
        let tilePos = tilesets[setId].getTile(tileId);
        ctx.drawImage(tilesets[setId].img,
                tilePos[0]*tileSize, tilePos[1]*tileSize, tileSize, tileSize,      			
                x * tileSize + camera.x, y * tileSize + camera.y, tileSize+1, tileSize+1);
      }
    }
  }

  // draw triggers
  for(let i=0;i<activePortals.length;i++)
  {
	  ctx.fillStyle = "blue";
	  ctx.fillRect(activePortals[i].x * tileSize + camera.x, activePortals[i].y * tileSize + camera.y, tileSize, tileSize);
  }
  for(let i=0;i<activeMapEvents.length;i++)
  {
	  ctx.fillStyle = "grey";
	  ctx.fillRect(activeMapEvents[i].x * tileSize + camera.x, activeMapEvents[i].y * tileSize + camera.y, tileSize, tileSize);
  }

  // Draw player
  if(isMoving){//FIXME isMoving is false when stopping, frame to draw should be dependent on the last direction
    let dx = player.targetX - player.x;
    let dy = player.targetY - player.y;
    if (dy > 0){
      animation = framesUp;
      nextAnimation = framesIdleUp;
    }
    else if (dy < -0){
      animation = framesDown;
      nextAnimation = framesIdleDown;
    }
    else if (dx > 0){
      animation = framesRight;
      nextAnimation = framesIdleRight;
    }
    else if (dx < -0){
      animation = framesLeft;
      nextAnimation = framesIdleLeft;
    }
  }
  else
    animation = nextAnimation;
  characterAnimationFrame += deltaTime/(24);
  characterAnimationFrame %= animation.length;
  frameToDraw = animation[Math.floor(characterAnimationFrame)];
  
  if(characterLoaded)
	  ctx.drawImage(characterSpritesheet,
      			frameToDraw[0]*tileSize/2, frameToDraw[1]*tileSize/2, tileSize/2, tileSize/2,      			
      			player.x * tileSize + camera.x, player.y * tileSize + camera.y, tileSize, tileSize);
  
  
  // Draw map that is in front of the player
  for (let y = 0; y < maps[currentMap][2].length; y++) {
    for (let x = 0; x < maps[currentMap][2][y].length; x++) {
      let tileId = maps[currentMap][2][y][x];
      let setId = Math.floor(tileId/1000);
      tileId %= 1000;
      if(tileId < 0) continue;
      if( tilesets.length > 0 && tilesets[setId].loaded)
      {
        let tilePos = tilesets[setId].getTile(tileId);
        ctx.drawImage(tilesets[setId].img,
                tilePos[0]*tileSize, tilePos[1]*tileSize, tileSize, tileSize,      			
                x * tileSize + camera.x, y * tileSize + camera.y, tileSize+1, tileSize+1);
      }
    }
  }


  // Draw transition animation
  if(transitionAnimation < 3.14/2)
  {
  	
 	ctx.fillStyle = "rgba(255, 255, 255, " + Math.sin(3.14/2-transitionAnimation)+")";
	ctx.fillRect(0,0,canvas.width,canvas.height);
  	transitionAnimation += deltaTime/500;
  }


  // Draw dialog
  if(dialogMessage){
    ctx.fillStyle = "rgba(200, 200, 200, 255)";
    ctx.fillRect(50, canvas.height-250, canvas.width-100, 200);
    ctx.font = "42px serif";
    ctx.fillStyle = "rgba(0, 0, 0, 255)";
    ctx.fillText(dialogMessage, 70, canvas.height-200, 180);
  }
  
  
  
  // updating tile entering state
	justEnteredTile = false;
  
  // Request next frame
  requestAnimationFrame(gameLoop);
  
}

// Start game loop
gameLoop();

