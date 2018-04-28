class PolygonDefinedByApexesParticle extends Particle {

    constructor(position, physX = new PhysX(), color, ...args) {
        super(position, physX, color);
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

    addApex(apex) {
        this._apexCollection.push(apex);
        return this;
    }

    centerShape() {
        let maxX = Math.max.apply(Math, this.apexCollection.map(function (o) {
            return o.x;
        }));
        let minX = Math.min.apply(Math, this.apexCollection.map(function (o) {
            return o.x;
        }));
        let maxY = Math.max.apply(Math, this.apexCollection.map(function (o) {
            return o.y;
        }));
        let minY = Math.min.apply(Math, this.apexCollection.map(function (o) {
            return o.y;
        }));

        let sizeX = maxX - minX;
        let sizeY = maxY - minY;


        this.apexCollection.forEach(apex => {
            apex.x = apex.x - sizeX / 2;
            apex.y = apex.y - sizeY / 2;
        })
        return this;
    }

    setToPremadeShape() {
        return this;
    }


    drawSpecific(ctx) {
        ctx.beginPath();
        let i = 0;
        this.apexCollection.forEach(apex => {
            if (i === 0) {
                ctx.moveTo(this.position.getDimension("X") + apex.x, this.position.getDimension("Y") + apex.y);
            }
            else {
                ctx.lineTo(this.position.getDimension("X") + apex.x, this.position.getDimension("Y") + apex.y);
            }
            i++;
        });
        return this;
    }
}