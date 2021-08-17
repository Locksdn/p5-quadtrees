class Point extends p5.Vector{
    constructor(x, y){
        super(x,y);

        this.color = color('#e9ecef');
        this.strokeWeight = 2;
    }

    show () {
        stroke(this.color);
        strokeWeight(this.strokeWeight);
        point(this.x, this.y);
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