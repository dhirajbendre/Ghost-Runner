var tower,towerImage;
var door,doorImage,doorsGroup;
var climber,climberImage,climbersGroup;
var ghost,ghostImage;
var invisibleBlock,invisibleGroup;
var gameState="play";
var spookySound;



function preload(){
   towerImage=loadImage("tower.png");
   doorImage=loadImage("door.png");
   climberImage=loadImage("climber.png");
   ghostImage=loadImage("ghost-standing.png");
   spookySound=loadSound("spooky.wav");

}

function setup(){
   createCanvas(600,600)
   spookySound.loop();
   
   tower=createSprite(300,300);
   tower.addImage("tower",towerImage);
   tower.velocityY=1;
   
   ghost = createSprite(200,200,50,50);
   ghost.addImage("ghost",ghostImage);
   ghost.scale=0.3;

        doorsGroup=new Group();
     climbersGroup=new Group();
     invisibleGroup=new Group();
   
}

function draw(){
  background(0);
  if(gameState==="play"){
    if(tower.y>400){
      tower.y=300;
    }

    if(keyDown("left")){
      ghost.x=ghost.x-3;
    }
    if(keyDown("right")){
      ghost.x=ghost.x+3;

    }
    if(keyDown("space")){
      ghost.velocityY=-5;
    }
      ghost.velocityY=ghost.velocityY+0.8;
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }
    if(invisibleGroup.isTouching(ghost)||(ghost.y>600)){
      ghost.destroy();
      gameState="end";
    }
    spawnDoors();
   drawSprites();
    
  }
  if(gameState==="end"){
    stroke("yellow"); 
    fill("yellow"); 
    textSize(30); 
    text("Game Over", 230,250);
    
  }
  
}

function spawnDoors(){
  if(frameCount % 240 === 0){
    door = createSprite(200,-50);
    door.addImage(doorImage);
    
    climber = createSprite(200,10);
    climber.addImage(climberImage);
    
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    
    door.x=Math.round(random(120,400))
    climber.x=door.x;
    invisibleBlock.x=door.x;
    
    door.velocityY=1;
    climber.velocityY=1;
    invisibleBlock.velocityY=1;
    
    door.lifetime=800;
    climber.lifetime=800;
    invisibleBlock.lifetime=800;
    
    ghost.depth=door.depth;
    ghost.depth+=1;
    
    invisibleBlock.debug=true;
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleGroup.add(invisibleBlock);
    
    
  }
 
}