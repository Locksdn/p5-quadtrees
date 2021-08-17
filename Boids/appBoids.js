let mainQuad;
let debug = false;

function setup (){
    createCanvas(300,300);
    background('#212529');
    frameRate(30);
    rectMode(CENTER);
    noFill();
    
    mainQuad = new Quad(new Point(width/2, height/2), width/2, height/2);
    for(let i =0; i < 200;i++){
        let p = new Boid(random(width), random(height));
        mainQuad.insert(p);
    }
}

function draw () {
    background('#212529');
    mainQuad.show();

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