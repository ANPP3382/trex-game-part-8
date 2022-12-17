var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex ,trex_running;
var edges;
var ground, groundImg, invisible;
var nubeImg;
var obs1, obs2, obs3, obs4, obs5, obs6, obs1Img, obs2Img, obs3Img, obs4Img, obs5Img, obs6Img;
var gameOver, restart, gameOverImg, restartImg;
var die, cheackpoint, jumpup;

function preload(){  
 trex_running = loadAnimation("trex1.png","trex3.png", "trex4.png");
 trex_collided = loadAnimation("trex_collided.png");
groundImg=loadImage("ground2.png");
nubeImg = loadImage("cloud.png")
obs1Img = loadImage("obstacle1.png");
obs2Img = loadImage("obstacle2.png")
obs3Img = loadImage("obstacle3.png")
obs4Img = loadImage("obstacle4.png")
obs5Img = loadImage("obstacle5.png")
obs6Img = loadImage("obstacle6.png")
gameOverImg=loadImage("gameOver.png"); 
restartImg=loadImage("restart.png");
die=loadSound("die.mp3"); 
checkpoint=loadSound("checkpoint.mp3"); 
jumpup=loadSound("jump.mp3");
}

function setup(){
  createCanvas(windowWidth, windowHeight)
  
  //crear sprite de Trex
  trex = createSprite(50, 70, 20, 50)
  edges = createEdgeSprites();
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  // trex.scale=0.5;
  
//Piso
ground= createSprite(200, height-30, 600, 20);
ground.addImage(groundImg)
invisible=createSprite(200, height-30, 600, 10);
invisible.visible=false;

gameOver= createSprite(150,100); 
gameOver.addImage(gameOverImg);
gameOver.scale=0.7; 
gameOver.visible = false
restart= createSprite(280,150); 
restart.addImage(restartImg); 
restart.scale=0.5;
restart.visible = false

grupoNubes = createGroup();
grupoObs = createGroup();
}




function draw(){
  background("orange")
  if (gameState === PLAY) {
    ground.velocityX = -5;
    if(ground.x < 0){
      ground.x=ground.width/2;
    }
    ground.velocityX=-2; 
    if(ground.x < 0){ 
      ground.x=ground.width/2; 
    }
   
    if(keyDown("space") && trex.y>=100){
      trex.velocityY = -10; jumpup.play();
  }
  trex.velocityY=trex.velocityY +0.8;
   trex.collide(invisible); 
  
  
   
  crearNubes();
  crearObstaculos();

  if(grupoObs.isTouching(trex))
  { die.play();
    gameState=END; }

  }else if(gameState === END){
    gameOver.visible=true; 
    restart.visible=true;
    ground.velocityX = 0;
    trex.velocityY = 0;



    grupoNubes.setVelocityXEach(0);
    grupoObs.setVelocityXEach(0);
 
    grupoNubes.setLifetimeEach(-1);
    grupoObs.setLifetimeEach(-1);
    
    trex.changeAnimation("collided");
  }

  
drawSprites();

}

//Función de nubes 
function crearNubes()
{ 
  if(frameCount % 60 === 0){
    var nube = createSprite(600,height-30,30,10); 
    nube.addImage(nubeImg)
    nube.scale = 0.5
    nube.y=Math.round(random(10, 100));
    nube.velocityX = -3
    nube.depth = trex.depth;
    trex.depth = trex.depth+3;
    nube.lifetime = 250;
    grupoNubes.add(nube);
  }
   
}

//Función de obstaculos
function crearObstaculos()
{
  if(frameCount % 150 === 0){
 var obs1 = createSprite(width,height-50,30,10);
 var num = Math.round(random(1,6)); 
 switch(num){ 
  case 1:obs1.addImage(obs1Img); break; 
  case 2:obs1.addImage(obs2Img); break; 
  case 3:obs1.addImage(obs3Img); break; 
  case 4:obs1.addImage(obs4Img); break; 
  case 5:obs1.addImage(obs5Img); break;
  case 6:obs1.addImage(obs6Img); break; 
}


  //obs1.scale = 0.5
  obs1.velocityX = -8
  obs1.lifetime = 600;
  grupoObs.add(obs1)

  } 

  
}




