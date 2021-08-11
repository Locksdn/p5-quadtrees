let mainQuad;

function setup (){
    createCanvas(500,500);
    background('#212529');
    frameRate(15);
    rectMode(CENTER);
    noFill();
    mainQuad = new Quad(new Point(width/2, height/2), width, height);
    for(let i =0; i < 10;i++){
        let p = new Point(random(width), random(height));
        mainQuad.insert(p);
    }
}

function draw () {
    if(mouseIsPressed){
        let p = new Point(mouseX, mouseY);
        console.log(mainQuad);
        mainQuad.insert(p);
    }
    mainQuad.show();
}