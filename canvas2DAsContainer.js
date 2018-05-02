class Canvas2DAsContainer {

    constructor(canvas, keepTrace = false) {
        this.worldCoordonates = new Vector({"X" : 0, "Y" : 0});
        this._overflowStrategy = "bounce";
        this._unvisibleStrategy = "delete";
        this._canvas = canvas.getContext('2d');
        this._particleCollection = new Collection();
        this.visualFx = new VisualFx().setColor(0, 0, 0, 1);
        return this;
    }

    get canvas() {
        return this._canvas;
    }

    set canvas(value) {
        this._canvas = value;
        return this;
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

    setRemanancy(value) {
        this.visualFx.colorA = value;
        return this;
    }

    keepTrace() {
        this.setRemanancy(0);
        return this;
    }

    overflowTreatment(elm) {
        if (this.overflowStrategy !== 'nothing') {
            switch (this.overflowStrategy) {
                case 'delete':
                    if (elm.position.getDimension("X") > this.canvas.canvas.width || elm.position.getDimension("Y") > this.canvas.canvas.height
                        ||
                        elm.position.getDimension("X") < 0 || elm.position.getDimension("Y") < 0) {
                        this.removeParticle(elm);
                    }
                    break;

                case 'loop': // TODO : Check if it would work with speeds greater than width/height
                    if (elm.position.getDimension("X") > this.canvas.canvas.width || elm.position.getDimension("Y") > this.canvas.canvas.height) {
                        elm.position.setBaseDimension("X", elm.position.getDimension("X") % this.canvas.canvas.width);
                        elm.position.setBaseDimension("Y", elm.position.getDimension("Y") % this.canvas.canvas.height);
                    }
                    if (elm.position.getDimension("X") < 0) {
                        elm.position.setBaseDimension("X", this.canvas.canvas.width + elm.position.getDimension("X"));
                    }
                    if (elm.position.getDimension("Y") < 0) {
                        elm.position.setBaseDimension("Y", this.canvas.canvas.height + elm.position.getDimension("Y"));
                    }
                    break;

                case 'share':
                    // TODO : make share particles with other containers
                    break;



                case 'bounce':

                    if (elm.position.getDimension("X") < 0 && elm.physX.velocity.getDimension("X") < 0) {
                        elm.physX.bounce("X");
                    } else if (elm.position.getDimension("X") > this.canvas.canvas.width && elm.physX.velocity.getDimension("X") > 0) {
                        elm.physX.bounce("X");
                    }


                    if (elm.position.getDimension("Y") < 0 && elm.physX.velocity.getDimension("Y") < 0) {
                        elm.physX.bounce("Y");
                    }
                    else if (elm.position.getDimension("Y") > this.canvas.canvas.height && elm.physX.velocity.getDimension("Y") > 0) {
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
        this.canvas.fillStyle = this.visualFx.getColor();
        this.canvas.fillRect(0, 0, canvas.width, canvas.height);


        for (let elmIdx in this._particleCollection._content){
            let elm = this._particleCollection._content[elmIdx];

            if (instance._interParticleInteraction){
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
            elm.draw(this.canvas);
            this.overflowTreatment(elm);
        }
        return this;
    }


}