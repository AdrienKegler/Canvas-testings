class PolygonDefinedByApexesParticle extends Particle{

    constructor(positionX, positionY, physX = new PhysX(), color, ...args){
        super(positionX, positionY, physX, color);
        this._apexCollection = args.length === 1 ? args[0] : args;
        this.centerShape();
        return this;
    }


    get apexCollection() {
        return this._apexCollection;
    }

    set apexCollection(value) {
        this._apexCollection = value;
        return this;
    }

    addApex(apex){
        this._apexCollection.push(apex);
        return this;
    }

    centerShape(){
        let maxX = Math.max.apply(Math, this.apexCollection.map(function(o){return o.x;}));
        let minX = Math.min.apply(Math, this.apexCollection.map(function(o){return o.x;}));
        let maxY = Math.max.apply(Math, this.apexCollection.map(function(o){return o.y;}));
        let minY = Math.min.apply(Math, this.apexCollection.map(function(o){return o.y;}));

        let sizeX = maxX - minX;
        let sizeY = maxY - minY;


        this.apexCollection.forEach(apex => {
            apex.x = apex.x - sizeX/2;
            apex.y = apex.y - sizeY/2;
        })
        return this;
    }

    setToPremadeShape(){
        return this;
    }




    draw(ctx){
        super.applyPhysics();
        ctx.beginPath();
        let i = 0;
        this.apexCollection.forEach(apex => {
            if (i === 0)
            {
                ctx.moveTo(this.positionX + apex.x, this.positionY + apex.y);
            }
            else
            {
                ctx.lineTo(this.positionX + apex.x, this.positionY + apex.y);
            }
            i++;
        });
        ctx.fillStyle = this.color;
        ctx.fill();
        return this;
    }
}