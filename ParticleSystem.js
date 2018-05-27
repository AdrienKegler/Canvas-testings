class ParticleSystem {

    constructor(worldCoordinates = new Vector({"X" : 0, "Y" : 0})) {
        this.worldCoordinates = Vector.toVector(worldCoordinates);
        this._overflowStrategy = "bounce";
        this._unvisibleStrategy = "delete";
        this._canvas = world.window.getContext('2d');
        this._particleCollection = new Collection();
        return this;
        this._worldCoordinates = worldCoordinates;
    }

    get canvas() {
        return this._canvas;
    }

    set canvas(value) {
        this._canvas = value;
        return this;
    }


    get worldCoordinates() {
        return this._worldCoordinates;
    }

    set worldCoordinates(value) {
        this._worldCoordinates = Vector.toVector(value);
    }

    get overflowStrategy() {
        return this._overflowStrategy;
    }

    set overflowStrategy(value) {
        this._overflowStrategy = value;
    }

    get particleCollection() {
        return this._particleCollection;
    }

    get unvisibleStrategy() {
        return this._unvisibleStrategy;
    }

    set unvisibleStrategy(value) {
        this._unvisibleStrategy = value;
        return this;
    }

    setOverflowStrategy(value) {
        this._overflowStrategy = value;
        return this;
    }

    addParticle(particle, particleName) {
        this._particleCollection.add(particle, particleName);
        return this;
    }

    removeParticle(particle) {
        this._particleCollection.remove(particle);
        return this;
    }

    addForce(force){
        this.particleCollection.forEach(particle => {
            particle._physX.addForce(force);
        })
    }



// check if Dot is inside a polygon (defined by apex and from any type)
    is_inside(dot, vs) {

        var x = dot.x, y = dot.y;

        var inside = false;
        for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            var xi = vs[i].X, yi = vs[i].Y;
            var xj = vs[j].X, yj = vs[j].Y;

            var intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }

        return inside;
    };


    overflowTreatment(elm) {
        if (this.overflowStrategy !== 'nothing') {
            let posX = elm.position.getDimension("X") + this.worldCoordinates.getDimension("X");
            let posY = elm.position.getDimension("Y") + this.worldCoordinates.getDimension("Y");

            switch (this.overflowStrategy) {
                case 'delete':
                    if (posX > this.canvas.canvas.width || posY > this.canvas.canvas.height
                        ||
                        posX < 0 || posY < 0) {
                        this.removeParticle(elm);
                    }
                    break;

                case 'loop': // TODO : Check if it would work properly with speeds greater than width/height
                    if (posX > this.canvas.canvas.width || posY > this.canvas.canvas.height) {
                        elm.position.setBaseDimension("X", posX % this.canvas.canvas.width);
                        elm.position.setBaseDimension("Y", posY % this.canvas.canvas.height);
                    }
                    if (posX < 0) {
                        elm.position.setBaseDimension("X", this.canvas.canvas.width + posX);
                    }
                    if (posY < 0) {
                        elm.position.setBaseDimension("Y", this.canvas.canvas.height + posY);
                    }
                    break;

                case 'bounce':

                    if (posX < 0 && elm.physX.velocity.getDimension("X") < 0) {
                        elm.physX.bounce("X");
                    } else if (posX > this.canvas.canvas.width && elm.physX.velocity.getDimension("X") > 0) {
                        elm.physX.bounce("X");
                    }


                    if (posY < 0 && elm.physX.velocity.getDimension("Y") < 0) {
                        elm.physX.bounce("Y");
                    }
                    else if (posY > this.canvas.canvas.height && elm.physX.velocity.getDimension("Y") > 0) {
                        elm.physX.bounce("Y");
                    }
                    break;

                default:
                    break;

            }
        }
        return this;
    }

    print() {

        for (let elmIdx in this._particleCollection._content){
            let elm = this._particleCollection._content[elmIdx];

            if (world._interParticleInteraction){
                let particleCollectionCopy = this.particleCollection;
                elm.updateGravityAttractionBetweenParticles(particleCollectionCopy);
            }

            if (!elm.isVisible()) {
                switch (this.unvisibleStrategy) {
                    case "delete":
                        this.removeParticle(elm);
                        break;

                    default:
                        break;
                }
            }
            elm.draw(this.canvas, this.worldCoordinates);
            this.overflowTreatment(elm);
        }
        return this;
    }


}