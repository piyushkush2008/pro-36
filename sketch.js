var dog,dogImg,happyDog
var foodS, foodStock;
function preload() {
  dogImg = loadImage("dogimg.png");
  happyDog = loadImage("dogimg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);

  dog = createSprite(250, 300, 100, 100);
  dog.addImage(dogImg)
  dog.scale = 0.2
  
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  foodStock.set(20)
}

function draw() {
  background(46, 139, 87)
  
  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS)
    dog.addImage(happyDog)
  }

  if (keyWentUp(UP_ARROW)) {
    
    dog.addImage(dogImg)
  }

  fill("white")
  stroke(8)
  textSize(20)
  text("Food Remaining=" + foodS, 155, 160)
  
  fill("black");
  stroke(12);
  textSize(15);
  text("Note:Press Up_Arrow Key To Feed Drago Milk",100,50)
drawSprites();
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x) {

  if (x <= 0) {
    x = 0
  } else {
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}