class Canvas2DAsContainer {

    constructor(canvas, keepTrace = false) {
        this._overflowStrategy = "bounce";
        this._unvisibleStrategy = "bounce";
        this._canvas = canvas.getContext('2d');
        this._particleCollection = [];
        this._keepTrace = keepTrace;
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
        return this;
    }

    get particleCollection() {
        return this._particleCollection;
    }

    addParticle(particle) {
        this._particleCollection.push(particle);
        return this;
    }

    removeParticle(particle) {
        let index = this._particleCollection.indexOf(particle);

        if (index > -1) {
            this._particleCollection.splice(index, 1);
        }
        return this;
    }

    get keepTrace() {
        return this._keepTrace;
    }

    set keepTrace(value) {
        this._keepTrace = value;
        return this;
    }

    get unvisibleStrategy() {
        return this._unvisibleStrategy;
    }

    set unvisibleStrategy(value) {
        this._unvisibleStrategy = value;
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

                case 'loop': // TODO : Check if it would work with speeds higher than width/height
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

                case 'bounce':
                    if (elm.position.getDimension("X") < 0) {
                        elm.position.setBaseDimension("X", 0);
                        elm.physX.bounceX();
                    } else if (elm.position.getDimension("X") > this.canvas.canvas.width) {
                        elm.position.setBaseDimension("X", this.canvas.canvas.width);
                        elm.physX.bounceX();
                    }


                    if (elm.position.getDimension("Y") < 0) {
                        elm.position.setBaseDimension("Y", 0);
                        elm.physX.bounceY();
                    }
                    else if (elm.position.getDimension("Y") > this.canvas.canvas.height) {
                        elm.position.setBaseDimension("Y", this.canvas.canvas.height);
                        elm.physX.bounceY();
                    }
                    break;

                default:
                    break;

            }
        }
        return this;
    }

    print() {
        if ( !this._keepTrace ) {
            this.canvas.clearRect(0, 0, canvas.width, canvas.height)
        }
        this._particleCollection.forEach( elm => {
            if( !elm.isVisible() ){
                switch(this.unvisibleStrategy){
                    case "delete":
                        this.removeParticle(elm);
                        break;

                    default:
                        break;
                }
            }
            this.overflowTreatment(elm);
            elm.draw(this.canvas);
        });
        return this;
    }


}