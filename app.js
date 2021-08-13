let mainQuad;
let range;

function setup (){
    createCanvas(500,500);
    background('#212529');
    frameRate(15);
    rectMode(CENTER);
    noFill();
    
    mainQuad = new Quad(new Point(width/2, height/2), width/2, height/2);
    for(let i =0; i < 10;i++){
        let p = new Point(random(width), random(height));
        mainQuad.insert(p);
    }

    stroke(200);
    let p1 = new Point(random(width), random(height));
    let p2 = new Point(p1.x + 100, p1.y + 100);
    range = new Range(p1, p2);

    console.log(range);

    rect(range.center.x, range.center.y, range.halfWidth*2, range.halfHeight*2);
    point(range.center.x, range.center.y);

    console.log(mainQuad);
}

function draw () {
    if(mouseIsPressed){
        let p = new Point(mouseX, mouseY);
        console.log(mainQuad);
        mainQuad.insert(p);
    }
    
    mainQuad.show();
}