let mainQuad;
let range;

function setup (){
    createCanvas(400,300);
    background('#212529');
    frameRate(30);
    rectMode(CENTER);
    noFill();
    
    mainQuad = new Quad(new Point(width/2, height/2), width/2, height/2);
    for(let i =0; i < 200;i++){
        let p = new Point(random(width), random(height));
        mainQuad.insert(p);
    }
    
}

function draw () {
    background('#212529');
    mainQuad.show();

    range = new Range(new Point(mouseX, mouseY), 20, 20);

    stroke('#3c6e71');
    rect(range.center.x, range.center.y, range.halfWidth*2, range.halfHeight*2);
    let foundPoints = mainQuad.pointsInRange(range);
    for (let p of foundPoints){
        strokeWeight(5);
        point(p.x, p.y);
    }
}