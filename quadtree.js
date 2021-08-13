class Quad{
    constructor(pos, w, h){
        this.w = w;
        this.h = h;
        this.pos = pos;

        this.points = [];
        this.limit = 1;

        this.nw = null;
        this.ne = null;
        this.sw = null;
        this.se = null;
        this.divided = false;
    }

    subdivide () {
        if (!this.divided){
            let pos = this.pos;
            let h = this.h/2;
            let w = this.w/2;

            this.nw = new Quad(new Point(pos.x - w/2, pos.y - h/2), w, h);
            this.ne = new Quad(new Point(pos.x + w/2, pos.y - h/2), w, h);
            this.sw = new Quad(new Point(pos.x - w/2, pos.y + h/2), w, h);
            this.se = new Quad(new Point(pos.x + w/2, pos.y + h/2), w, h);

            this.divided = true;
        }
    }

    show () {
        stroke('#e9ecef');
        strokeWeight(5);
        this.points.forEach(p =>{
            point(p.x, p.y);
        })
        stroke(200);
        strokeWeight(1);
        rect(this.pos.x, this.pos.y, this.w, this.h);
        if (this.divided){
            this.nw.show();
            this.ne.show();
            this.sw.show();
            this.se.show();
        }
    }

    insert (p) {
        if (!this.inBounds(p)){
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
            return points;
        }

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
        return ((range.p1.x >= this.pos.x - this.w/2 &&
                range.p1.x <= this.pos.x + this.w/2) ||
                (range.p2.x <= this.pos.x + this.w/2 &&
                range.p2.x >= this.pos.x - this.w/2)) &&
               ((range.p1.y >= this.pos.y - this.h/2 &&
                range.p1.y <= this.pos.y + this.h/2) ||
               (range.p2.y <= this.pos.y + this.h/2 &&
                range.p2.y >= this.pos.y - this.h/2));
    }

    inBounds (p) {
        /* console.log(`is (${Math.round(p.x)}, ${Math.round(p.y)}) between
                    (${this.pos.x - this.w/2}, ${this.pos.y + this.h/2}) and
                    (${this.pos.x + this.w/2}, ${this.pos.y - this.h/2})`); */
        return p.x >= (this.pos.x - this.w/2) &&
               p.x <= this.pos.x + this.w/2 &&
               p.y >= this.pos.y - this.h/2 &&
               p.y <= this.pos.y + this.h/2;
    }
}
