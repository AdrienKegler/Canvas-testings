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
            return  o.getDimension("X");
        }));
        let minX = Math.min.apply(Math, this.apexCollection.map(function (o) {
            return  o.getDimension("X");
        }));
        let maxY = Math.max.apply(Math, this.apexCollection.map(function (o) {
            return  o.getDimension("Y");
        }));
        let minY = Math.min.apply(Math, this.apexCollection.map(function (o) {
            return  o.getDimension("Y");
        }));

        let sizeX = maxX - minX;
        let sizeY = maxY - minY;


        this.apexCollection.forEach(apex => {
            apex.setBaseDimension("X", apex.getDimension("X") - sizeX / 2);
            apex.setBaseDimension("Y", apex.getDimension("Y") - sizeY / 2);
        });
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
                ctx.moveTo(apex.getDimension("X"), apex.getDimension("Y"));
            }
            else {
                ctx.lineTo(apex.getDimension("X"), apex.getDimension("Y"));
            }
            i++;
        });
        return this;
    }
}