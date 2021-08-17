class Quad{
    constructor(pos, w, h, debug=false){
        this.boundary = new Range(pos, w, h);

        this.color = color(200);
        this.strokeWeight = 2;
        this.drawQuad = debug;
        this.drawPoints = true;

        this.points = [];
        this.limit = 3;

        this.nw = null;
        this.ne = null;
        this.sw = null;
        this.se = null;
        this.divided = false;
    }

    setDrawQuad(bool){
        this.drawQuad = bool;
        if (this.divided){
            this.nw.setDrawQuad(bool);
            this.ne.setDrawQuad(bool);
            this.sw.setDrawQuad(bool);
            this.se.setDrawQuad(bool);
        }
    }

    setDrawPoints(bool){
        this.drawPoints = bool;
        if (this.divided){
            this.nw.setDrawPoints(bool);
            this.ne.setDrawPoints(bool);
            this.sw.setDrawPoints(bool);
            this.se.setDrawPoints(bool);
        }
    }

    subdivide () {
        if (!this.divided){
            let pos = this.boundary.center;
            let h = this.boundary.halfHeight/2;
            let w = this.boundary.halfWidth/2;

            this.nw = new Quad(new Point(pos.x - w, pos.y - h), w, h, this.drawQuad);
            this.ne = new Quad(new Point(pos.x + w, pos.y - h), w, h, this.drawQuad);
            this.sw = new Quad(new Point(pos.x - w, pos.y + h), w, h, this.drawQuad);
            this.se = new Quad(new Point(pos.x + w, pos.y + h), w, h, this.drawQuad);

            this.divided = true;
        }
    }

    show () {
        
        if (this.drawPoints)
        {
            this.points.forEach(p =>{
                p.show();
            });
        }

        if (this.drawQuad)
        {
            stroke(this.color);
            strokeWeight(this.strokeWeight);
            rect(this.boundary.center.x, this.boundary.center.y,
                this.boundary.halfWidth*2, this.boundary.halfHeight*2);
        }

        if (this.divided)
        {
            this.nw.show();
            this.ne.show();
            this.sw.show();
            this.se.show();
        }
    }

    insert (p) {
        if (!p.inRange(this.boundary)){
            return false;
        }

        //console.log(`adding (${Math.round(p.x)}, ${Math.round(p.y)}) to qtree (${this.pos.x}, ${this.pos.y})`);

        if (!this.divided){
            if (this.points.length < this.limit){
                this.points.push(p);
                return true;
            }
            //console.log('Reached limit');
            this.subdivide();
            this.points.forEach(item =>{
                this.nw.insert(item);
                this.ne.insert(item);
                this.sw.insert(item);
                this.se.insert(item);
            });
            this.points = [];
        }

        if (this.nw.insert(p)) {return true;}
        if (this.ne.insert(p)) {return true;}
        if (this.sw.insert(p)) {return true;}
        if (this.se.insert(p)) {return true;}

        return false;
    }

    pointsInRange (range){        
        let points = [];

        if (!this.interceptsRange(range)){
            //console.log('no');
            /* this.color = color(200);
            this.strokeWeight = 2; */
            return points;
        }

        /* this.color = color(0, 255, 0);
        this.strokeWeight = 6; */

        if(this.divided){
            points = points.concat(this.nw.pointsInRange(range));
            points = points.concat(this.ne.pointsInRange(range));
            points = points.concat(this.sw.pointsInRange(range));
            points = points.concat(this.se.pointsInRange(range));
            return points;
        } else {
            this.points.forEach(point =>{
                if (point.inRange(range)){
                    points.push(point);
                }
            })
            return points;
        }
    }

    interceptsRange (range) {

        let pos = this.boundary;

        /* console.log(`Does the range (${range.p1.x}, ${range.p1.y}), (${range.p2.x}, ${range.p2.y}) intercept
                    with (${this.boundary.p1.x}, ${this.boundary.p1.y}), (${this.boundary.p2.x}, ${this.boundary.p2.y})`);
 */
        return (((range.p1.x >= pos.p1.x &&
                range.p1.x <= pos.p2.x) ||
                (range.p2.x <= pos.p2.x &&
                range.p2.x >= pos.p1.x)) &&
               ((range.p1.y >= pos.p1.y &&
                range.p1.y <= pos.p2.y) ||
               (range.p2.y <= pos.p2.y &&
                range.p2.y >= pos.p1.y))) ||
                ((range.p1.x < pos.p1.x &&
                range.p2.x > pos.p2.x) ||
                (range.p1.y < pos.p1.y &&
                range.p2.y > pos.p2.y));
    }

    /* inBounds (p) {
        console.log(`is (${Math.round(p.x)}, ${Math.round(p.y)}) between
                    (${this.pos.x - this.w/2}, ${this.pos.y + this.h/2}) and
                    (${this.pos.x + this.w/2}, ${this.pos.y - this.h/2})`);
        return p.x >= (this.pos.x - this.w/2) &&
               p.x <= this.pos.x + this.w/2 &&
               p.y >= this.pos.y - this.h/2 &&
               p.y <= this.pos.y + this.h/2;
    } */
}
