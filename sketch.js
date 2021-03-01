let xspeed = 1; // Speed of the shape
let yspeed = 1; // Speed of the shape



var age_data;
var input;

var main_url = "https://api.agify.io?name="
var name = "angelo"

var balls = [];

function preload(){
  var url = main_url + name;
  loadJSON(url, getData);
}

function getData(data){
  age_data = data;
}

function setup() {
  createCanvas(700, 700);

  var button = select('button');
  input = select('#name');
  button.mousePressed(updateAge);
}

function updateAge(){ //PROBLEM: NEW BALL IS PUSHED WITH OLD DATA? HOW 2 FIX
  name = input.value();
  var url = main_url + name;
  loadJSON(url, getData);
  balls.push(new Ball(random(0,700),random(0,700),map(age_data.age,15,80,0,200),age_data.name));
}

function draw() {
  background(color(211, 101, 130));
  //background(0);
  // Grab the description, look how we can "chain" calls.
  for (let i = 0; i < balls.length; i++) {
    balls[i].update();
  }
  textAlign(CENTER);
  textSize(32);
  noStroke();
  fill(color(111, 31, 53));
  textStyle(BOLD);
  text("What age are you statistically most likely to be?",100,75,450,400);
  text("You are " + age_data.age + " years old.", 100, 225,450,500);
  fill(color(255, 238, 207));
  text(age_data.name,100,175,450,400);
}

class Ball{
  constructor(x,y,r,name){
    this.xpos = x;
    this.ypos = y;
    this.r = r;
    this.name = name;
    this.ydirection = 1;
    this.xdirection = 1;
  }
  update(){
    this.xpos = this.xpos + xspeed * this.xdirection;
    this.ypos = this.ypos + yspeed * this.ydirection;

    // Test to see if the shape exceeds the boundaries of the screen
    // If it does, reverse its direction by multiplying by -1
    if (this.xpos > width - this.r || this.xpos < this.r) {
      this.xdirection *= -1;
    }
    if (this.ypos > height - this.r || this.ypos < this.r) {
      this.ydirection *= -1;
    }
    fill(color(255, 238, 207));
    ellipse(this.xpos, this.ypos, this.r, this.r);
    textSize(10);
    fill(0);
    text(this.name,this.xpos,this.ypos+2);
  }
}
  
