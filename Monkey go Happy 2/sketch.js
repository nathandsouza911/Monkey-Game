var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score, survivalTime;
var PLAY = 1
var END = 0
var gameState = 1

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

  obstacleGroup = new Group();
  FoodGroup = new Group();

}



function setup() {
  createCanvas(600, 400);

  banana = createSprite(600, 128, 20, 20);
  banana.addImage("banana", bananaImage);
  banana.scale = 0

  obstacle = createSprite(600, 328, 1, 1);

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;


  ground = createSprite(400, 350, 1200, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  survivalTime = 0
  score = 0;
}


function draw() {
  background("white");
  if (gameState === 1) {
    bananas();
    obstacles();
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    text("score:" + score, 20, 10)
    text("Survival Time:" + survivalTime, 380, 10)
    monkey.collide(ground)

    if (keyWentUp("space")) {
      monkey.velocityY = -12;
    }
    survivalTime = Math.ceil(frameCount / getFrameRate());
    monkey.velocityY = monkey.velocityY + 0.4;

    if (FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score = score + 2;
    }

    if (obstacleGroup.collide(monkey)) {

      gameState = 0;
    }
  }
  if (gameState === 0) {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    banana.velocityX = 0;
    obstacle.lifetime = -1;
    banana.lifetime = -1;

    if (mousePressedOver(monkey)) {
      reset();
    }
  }



  drawSprites();
}

function reset() {
  FoodGroup.destroyEach();
  obstacleGroup.destroyEach();
  score = 0;
  gameState = 1;
}

function obstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(600, 328, 20, 20);
    obstacle.addImage("obstacle", obstaceImage);
    obstacle.velocityX = -4;
    obstacle.scale = 0.1
    obstacle.lifetime = 300;
  }
  obstacleGroup.add(obstacle);
}

function bananas() {
  if (frameCount % 200 === 0) {
    banana = createSprite(600, 128, 20, 20);
    banana.addImage("banana", bananaImage);
    banana.y = Math.round(random(120, 200));
    banana.velocityX = -4;
    banana.scale = 0.1;
    banana.lifetime = 300;
  }
  FoodGroup.add(banana);
}