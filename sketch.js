var floor
var trex ,trex_running;
var groundimage;
var invisiblefloor;
var obstacle1;
var obstacle2;
var obstacle3;
var obstacle4;
var obstacle5;
var obstacle6;
var score = 0;
var Play=1;
var end=0;
var gamestate = Play;
var cloudgroup;
var cactusgroup;
var gameover;
var gameoverimg;
var restartimg;
var restart;
var trexCollide;
var jumpsound;
var diesound;
var checkpointsound;
var restart;


function preload(){
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png"); 
groundimage = loadImage("ground2.png");
cloudImg=loadImage("cloud.png");
obstacle1=loadImage("obstacle1.png");
obstacle2=loadImage("obstacle2.png");
obstacle3=loadImage("obstacle3.png");
obstacle4=loadImage("obstacle4.png");
obstacle5=loadImage("obstacle5.png");
obstacle6=loadImage("obstacle6.png");
gameoverimg=loadImage("gameOver.png");
restarimg=loadImage("restart.png");
trexCollide=loadImage("trex_collided.png");
jumpsound=loadSound("jump.mp3");
diesound=loadSound("die.mp3");
checkpointsound=loadSound("checkPoint.mp3");
}

function setup(){
  createCanvas(windowWidth,windowHeight)
  
  
  trex=createSprite(20,height-70,20,20);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trexCollide);
  trex.scale=0.5;
  trex.setCollider("circle",0,0,40);
  trex.debug=false;
  floor=createSprite(width/2,height-80,width,2);
  floor.addImage(groundimage);
  invisiblefloor=createSprite(width/2,height-10,width,125);
  invisiblefloor.visible=false;

  cloudgroup = new Group();
  cactusgroup = new Group();

  gameover=createSprite(width/2,height/2-50,200,20);
  restart=createSprite(width/2,height/2,200,20);
  restart.addImage(restarimg);
  gameover.addImage(gameoverimg);
  gameover.scale=0.5;
  restart.scale=0.5;
}

function draw(){
  background("white")
  text("score"+score,500,50);
  if(gamestate===Play){
  floor.velocityX=-(5+3*score/100);
  score=score+Math.round(frameCount/60);
  if(score>0 && score%100===0){
    checkpointsound.play();
  }
  if(floor.x<0){
    floor.x=floor.width/2


    
  }
  if(touches.length>0||keyDown("space")&&trex.y >=height-120){
    trex.velocityY=-11
    jumpsound.play();
    touches=[]
  }
  trex.velocityY=trex.velocityY+0.5;
  clouds();
  obstacles();
  if(cactusgroup.isTouching(trex)){
   diesound.play(); 
   gamestate=end;

  }
  gameover.visible=false;
  restart.visible=false;
  }

   

  

  else if(gamestate===end){
    floor.velocityX=0;
    trex.changeAnimation("collided",trexCollide);
    cactusgroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    gameover.visible=true;
    restart.visible=true;

    cactusgroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
    trex.velocityY=0;
    if(mousePressedOver(restart)){
    reset()
    }
    if(touches.length>0){
      reset();
      touches=[]
    }
  }
 
  
  

  
  
  trex.collide(invisiblefloor);
  
  drawSprites();


}
function clouds (){
  if (frameCount%60 ===0){
    var cloud=createSprite(width+20,height-300,100,10);
    cloud.addImage(cloudImg);
    cloud.velocityX= -5;
    cloud.y=Math.round(random(10,60));
    cloud.depth = trex.depth;
    trex.depth = trex.depth+1;
    cloud.lifetime = 200;
    cloudgroup.add(cloud);
  }
   
}
function obstacles(){
  if(frameCount%110===0){
    var cactus = createSprite(width+100,height-95,20,20);
    cactus.velocityX=-(10+score/100);

  var ram=Math.round(random(1,6));
  switch(ram){
    case 1:cactus.addImage(obstacle1);
    break;
    case 2:cactus.addImage(obstacle2);
    break;
    case 3:cactus.addImage(obstacle3);
    break;
    case 4:cactus.addImage(obstacle4);
    break;
    case 5:cactus.addImage(obstacle5);
    break;
    case 6:cactus.addImage(obstacle6);
    break;
    default:break;
  }
 //cactus.lifetime=90;
 cactus.scale= 0.7;
 cactusgroup.add(cactus);

}
}

function reset(){
 gamestate=Play;
 cloudgroup.destroyEach();
 cactusgroup.destroyEach();
 score=0;
}