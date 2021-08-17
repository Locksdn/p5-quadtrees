class Boid extends Point{
    constructor(x, y, debug=false){
        super(x, y);

        this.direction = new Point(random(-1, 1), random(-1, 1));
        this.direction.normalize();
        this.speed = 1;

        this.viewDistance = 20;
        this.viewArea = new Range(new Point(this.x, this.y), this.viewDistance);
        this.debug = debug;
    }

    show(){
        let p1 = new Point(this.x + this.direction.x*10, this.y + this.direction.y*10);

        stroke(this.color);
        strokeWeight(this.strokeWeight);
        line(this.x, this.y, p1.x, p1.y);
        stroke(0, 255, 0);
        strokeWeight(4);
        point(this.x, this.y);

        if (this.debug){
            stroke(this.color);
            strokeWeight(this.strokeWeight);
            rect(this.viewArea.center.x, this.viewArea.center.y, this.viewArea.halfWidth);
        }
    }

    keepInBounds(range){
        //let vector = createVector(0, 0);

        if(this.x <= range.p1.x){
            this.x = range.p2.x;
            //vector.add(1, 0);
        } else if (this.x > range.p2.x){
            this.x = range.p1.x;
            //vector.add(-1, 0);
        }

        if (this.y < range.p1.y){
            this.y = range.p2.y;
            //vector.add(0, 1);
        } else if (this.y > range.p2.y){
            this.y = range.p1.y;
            //vector.add(0, -1);
        }

        //return vector;
    }

    move(boidsInView){
        let delta = this.direction;
        delta.setMag(15);

        let centerOfMass = createVector(0, 0);
        for (let boid of boidsInView){
            if(!boid.equals(this))
            {
                stroke(0, 255, 0);
                strokeWeight(1);

                if (this.debug){
                    line(this.x, this.y, boid.x, boid.y);
                }

                centerOfMass.add(boid);

                delta.add(this.separation(boid));
                delta.add(this.alignment(boid));
            }
        }

        if(centerOfMass.x != 0 && centerOfMass.y != 0){
            centerOfMass.div(boidsInView.length);
            strokeWeight(2);
            //line(this.x, this.y, centerOfMass.x, centerOfMass.y);
            //point(centerOfMass);
            let vector = createVector(centerOfMass.x - this.x, centerOfMass.y - this.y);
            vector.normalize()
            delta.add(vector);
        }

        
        //line(this.x, this.y, this.x + delta.x, this.y + delta.y);
        this.direction = delta.normalize();

        this.x += this.direction.x * this.speed;
        this.y += this.direction.y * this.speed;
        this.viewArea = new Range(new Point(this.x, this.y), this.viewDistance);
    }

    separation (boid) {
        let vector = createVector(-(boid.x - this.x), -(boid.y - this.y));
        vector.setMag(10/vector.mag());
        //vector.normalize();
        line(this.x, this.y, (vector.x + this.x), (vector.y + this.y));
        return vector;
    }

    alignment (boid) {
        return boid.direction;
    }

    cohesion (boidsInView) {
        let centerOfMass = createVector(0, 0);
        for(let boid of boidsInView){
            centerOfMass = centerOfMass.add(boid)
        }
        centerOfMass.div(boidsInView.length);
        return createVector(centerOfMass.x - this.x, centerOfMass.y - this.y);
    }
}