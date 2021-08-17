let mainQuad;
let debug = false;

function setup (){
    createCanvas(600,600);
    background('#212529');
    frameRate(30);
    rectMode(CENTER);
    noFill();
    
    mainQuad = new Quad(new Point(width/2, height/2), width/2, height/2);
    for(let i =0; i < 400;i++){
        let p = new Boid(random(width), random(height));
        mainQuad.insert(p);
    }
}

function draw () {
    background('#212529');
    mainQuad.show();

    /* range = new Range(new Point(mouseX, mouseY), 20, 20);

    stroke(0, 255, 0);
    rect(range.center.x, range.center.y, range.halfWidth*2, range.halfHeight*2);
    let foundPoints = mainQuad.pointsInRange(range);
    for (let p of foundPoints){
        strokeWeight(5);
        point(p.x, p.y);
    } */

    foundPoints = mainQuad.pointsInRange(new Range(new Point(width/2, height/2), width/2, height/2));
    mainQuad = new Quad(new Point(width/2, height/2), width/2, height/2, debug);
    for (let point of foundPoints){
        let pointsInView = mainQuad.pointsInRange(point.viewArea);
        point.debug = debug;
        point.move(pointsInView);
        point.keepInBounds(mainQuad.boundary);
        mainQuad.insert(point);
    }
}