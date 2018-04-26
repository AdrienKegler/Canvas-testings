class Canvas2DAsContainer {

    constructor(canvas, keepTrace = false) {
        this._overflowStrategy = "delete";
        this._unvisibleStrategy = "delete";
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
    }

// check if Dot is inside a polygon (defined by apex and from any type)
    is_inside(dot, vs) {

        var x = dot.x, y = dot.y;

        var inside = false;
        for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            var xi = vs[i][0], yi = vs[i][1];
            var xj = vs[j][0], yj = vs[j][1];

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
                    if (elm.positionX > this.canvas.canvas.width || elm.positionY > this.canvas.canvas.height
                        ||
                        elm.positionX < 0 || elm.positionY < 0) {
                        this.removeParticle(elm);
                    }
                    break;

                case 'loop':
                    if (elm.positionX > this.canvas.canvas.width || elm.positionY > this.canvas.canvas.height) {
                        elm.positionX = elm.positionX % this.canvas.canvas.width;
                        elm.positionY = elm.positionY % this.canvas.canvas.height;
                    }
                    if (elm.positionX < 0) {
                        elm.positionX = this.canvas.canvas.width + elm.positionX;
                    }
                    if (elm.positionY < 0) {
                        elm.positionY = this.canvas.canvas.height + elm.positionY;
                    }
                    break;

                case 'bounce':
                    if (elm.positionX < 0) {
                        elm.positionX = 0;
                        elm.physX.bounceX();
                    } else if (elm.positionX > this.canvas.canvas.width) {
                        elm.positionX = this.canvas.canvas.width;
                        elm.physX.bounceX();
                    }


                    if (elm.positionY < 0) {
                        elm.positionY = 0;
                        elm.physX.bounceY();
                    }
                    else if (elm.positionY > this.canvas.canvas.height) {
                        elm.positionY = this.canvas.canvas.height;
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
        if (!this._keepTrace) {
            this.canvas.clearRect(0, 0, canvas.width, canvas.height)
        }
        this._particleCollection.forEach(elm => {
            if(!elm.isVisible()){
                switch(this.unvisibleStrategy){
                    case "delete":

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