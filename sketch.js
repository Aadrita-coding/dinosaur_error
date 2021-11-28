var PLAY=1;
var END=0;
var gameState=PLAY;
var trex, trex_running, edges;
var groundImage;
var ground;
var invisibleground;
var cloud;
var cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");

  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")

  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")

  
}

function setup(){

  createCanvas(600,200)

  score=0;

  var ran=Math.round(random(10,50));
  console.log(ran);
  
  // creating trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  edges = createEdgeSprites();
  
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50;

  trex.debug=true
  trex.setCollider("circle",0,0,40)

  ground = createSprite(300,180,600,20);
  ground.addImage(groundImage);
  
  
  invisibleground = createSprite(300,190,600,10);
  invisibleground.visible = false

  obstaclesGroup = new Group();
  cloudsGroup = new Group();
}


function draw(){
  //set background color 
  background(180);


  if (gameState === PLAY){
    ground.velocityX = -10;
    

    score = score + Math.round(frameCount/60);

    if (ground.x<0){
      ground.x = ground.width/2;
    }
      //jump when space key is pressed
      if(keyDown("space") && trex.y >= 100){
      trex.velocityY = -10;
    }
    trex.velocityY = trex.velocityY + 0.5;

    spawncloud();
  spawnobstacle();

  if(obstaclesGroup.isTouching(trex)){
    gameState = END;
      }
  }
  else if (gameState === END){
    ground.velocityX = 0;
    trex.velocityY=0
    trex.changeAnimation("collided",trex_collided);
    console.log("game ended")

    obstaclesGroup.setVelocityXEach(0);
         cloudsGroup.setVelocityXEach(0);
         
         obstaclesGroup.lifetimeXEach(-1);
     cloudsGroup.lifetimeXEach(-1);


  }

  //logging the y position of the trex
  console.log(trex.y)
   

  trex.collide(invisibleground)
    
  //stop trex from falling down
  trex.collide(edges[3])

  

  drawSprites();

  //displaying the score
  text("Score:" +score,500,50);
}



function spawnobstacle(){
if(frameCount % 100 === 0){
  var obstacle=createSprite(400,165,10,40);
  obstacle.velocityX=-3;

  var rand = Math.round(random(1,6));
  switch(rand) {
    case 1 : obstacle.addImage(obstacle1);
    break;
    case 2 : obstacle.addImage(obstacle2);
    break;
    case 3 : obstacle.addImage(obstacle3);
    break;
    case 4 : obstacle.addImage(obstacle4);
    break;
    case 5 : obstacle.addImage(obstacle5);
    break;
    case 6 : obstacle.addImage(obstacle6);
    break;
    default: break;
  }
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
}
}

function spawncloud()
{
  if(frameCount%100===0) {
cloud=createSprite(600,100,1,10);
cloud.velocityX=-3;
cloud.addImage(cloudImage);
cloud.y=Math.round(random(10,60));
cloud.lifetime=200;
cloud.depth=trex.depth;
trex.depth+=1;
}
}
