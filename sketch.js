var fox;
var END = 0,PLAY;
var gameState = PLAY;
var score = 0;
var luckGroup;
var foximg;
var backgroundImg;
var gameOverimg,gameOver;
var luck1;
var luck2;
var luck3;
var luck4;
var luck5;
var luck6;

function preload() {
    backgroundImg = loadImage("sprites/day.jpg");
    foximg = loadImage("sprites/16179552.png");
    gameOverimg = loadImage("sprites/gameOver.png");
    luck1 = loadImage("sprites/cat.jpg");
    luck2 = loadImage("sprites/13.jpg");
    luck3 = loadImage("sprites/666.jpg");
    luck4 = loadImage("sprites/mirror.jpg");
    luck5 = loadImage("sprites/raven.jpg");
    luck6 = loadImage("sprites/salt.jpg");
}

function setup(){
    var canvas = createCanvas(windowWidth - 40,windowHeight);
    fox = createSprite(windowWidth/2,550,50,50);
    fox.shapeColor = "orange";
    fox.addImage(foximg);
    fox.scale = 0.1
    ground = createSprite(windowHeight,windowHeight,windowWidth + 10000,windowHeight/4);
    ground.shapeColor = "brown";
    ground.x = ground.width /2;
    ground.velocityX = -(6 + 3*score/100);
    ground.visible = false;
    score = 0;
    gameOver = createSprite(windowWidth/2,windowHeight/3);
    gameOver.addImage(gameOverimg);
    gameOver.scale = 1;
    gameOver.visible = false;
    luckGroup = new Group();

    // if(mousePressedOver(restart)) {
    // reset();
    // }
    //ground = new Ground(windowHeight,windowHeight,windowWidth + 100,windowHeight/4);
    //fox = new Fox(windowWidth/2,windowHeight/2,50,50);
    //fox = new Fox(10,30,50,50);
}

function draw(){
    background(backgroundImg);
    textSize(20);
    fill("black");
    text("PRESS SPACE TO JUMP",50,50);
    textSize(30);
    fill("white");
    text("SCORE : "+ score, 1100,50);


    if (gameState===PLAY){
        score = score + Math.round(getFrameRate()/60);
        ground.velocityX = -(6 + 3*score/100);
      
        if(keyDown("space") && fox.y >= 159) {
          fox.velocityY = -10;
        }
      
        fox.velocityY = fox.velocityY + 0.8
      
        if (ground.x < 0){
          ground.x = ground.width/2;
        }
      
        fox.collide(ground);
        spawnBluck();
      
        if(luckGroup.isTouching(fox)){
           gameState = END;
        }
      }
      else if (gameState === END) {
        
        //set velcity of each game object to 0
        ground.velocityX = 0;
        fox.velocityY = 0;
        luckGroup.setVelocityXEach(0);
        gameOver.visible = true;
      //  fill(rgb(200,30,10,105));
      //  textSize(50);
      //  stroke(7);
      //  text("GAME OVER",windowWidth/2-100,windowHeight/3);
        
      }

    //Engine.update(engine);
    //ground.display();
   // fox.display();
   drawSprites();
}

function spawnBluck() {
    //write code here to spawn the clouds
    if (frameCount % 130 === 0) {
      var badLuck = createSprite(1300,120,40,40);
      badLuck.shapeColor = rgb(random(0,255),random(0,255),random(0,255))
      badLuck.y = Math.round(random(300,550));
      var rand = Math.round(random(1,6));
      switch(rand) {
        case 1: badLuck.addImage(luck1);
                break;
        case 2: badLuck.addImage(luck2);
                break;
        case 3: badLuck.addImage(luck3);
                break;
        case 4: badLuck.addImage(luck4);
                break;
        case 5: badLuck.addImage(luck5);
                break;
        case 6: badLuck.addImage(luck6);
                break;
        default: break;
      }
      badLuck.scale = 0.5;
      badLuck.velocityX = -3;
      badLuck.lifetime = 400;
      badLuck.depth = fox.depth;
      fox.depth = fox.depth + 1;
      luckGroup.add(badLuck);
    }
    
  }
  