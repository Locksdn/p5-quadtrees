class Range {

    /* Constructor can take 2 or 3 parameters:
    (Point p1, Point p2)
    (Point center, Number radius)
    (Point center, Number halfWidth, Number halfHeight)*/
    constructor(p1, p2, p3){
        
        if (typeof p2 == 'object')
        {
            console.log('two points given');
            this.p1 = p1;
            this.p2 = p2;
            this.halfWidth = (p2.x - p1.x)/2;
            this.halfHeight = (p2.y - p1.y)/2;
            this.center = new Point(p1.x + this.halfWidth, p1.y + this.halfHeight);
            return;
        }
        this.center = p1;
        this.halfWidth = p2;
        

        if (typeof p3 != 'undefined')
        {
            this.halfHeight = p3;
        } else {
            this.halfHeight = p2;
        }

        this.p1 = new Point(p1.x - this.halfWidth, p1.y - this.halfHeight);
        this.p2 = new Point(p1.x + this.halfWidth, p1.y + this.halfHeight);
    }
}