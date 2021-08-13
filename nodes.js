class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    inRange (range) {
        /* console.log(`Is the point (${Math.round(this.x)}, ${Math.round(this.y)}) in the range
                (${Math.round(range.p1.x)}, ${Math.round(range.p1.y)}) (${Math.round(range.p2.x)}, ${Math.round(range.p2.y)})`) */
        return this.x >= range.center.x - range.halfWidth &&
               this.x <= range.center.x + range.halfWidth &&
               this.y >= range.center.y - range.halfHeight &&
               this.y <= range.center.y + range.halfHeight;
    }
}

class Range {
    constructor(p1, p2){
        this.p1 = p1;
        this.p2 = p2;
        this.halfWidth = (p2.x - p1.x)/2;
        this.halfHeight = (p2.y - p1.y)/2;
        this.center = new Point(p1.x + this.halfWidth, p1.y + this.halfHeight);
    }
}

class Boid extends Point{
    constructor(x, y){
        super(x, y);
        this.direction = new Point(1, 1);
        this.speed = 1;
    }

    move(){
        this.x += this.direction.x * this.speed;
        this.y += this.direction.y * this.speed;
    }
}