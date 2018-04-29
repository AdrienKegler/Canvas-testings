class Vector {

    constructor(vectorArray  = {"X": 0, "Y": 0}) {
        this._components = vectorArray;
        for(let index in this._components){
            this._components[index] = Number.parseFloat(this._components[index]).toPrecision(6);
        }
        this._scale = 1;
        return this;
    }

    get components() {
        return this._components;
    }

    set components(value) {
        this._components = value;
        return this;
    }

    get scale() {
        return this._scale;
    }

    set scale(value) {
        this._scale = value;
        return this;
    }

    angle(unit){
        let deltaX = this.getDimension("X");
        let deltaY = this.getDimension("Y");
        let rad = Math.atan2(deltaY, deltaX); // In radians

        switch (unit){
            case "degree":
            case "degrees":
                return KeglerMaths.degrees(rad);

            case "radian":
            case "radians":
                return rad;

            default:
                return rad;
        }
    }

    static toVector(value) {
        if (value.constructor.name === "Vector") {
            return value;

        }
        else {
            return new Vector(value);
        }
    }

    getBaseDimension(value) {
        return this.components[value];
    }

    setBaseDimension(id, value) {
        this.components[id] = value;
        return this;
    }

    setScale(value) {
        this._scale = value;
        return this;
    }

    getDimension(value) {
        return this.getBaseDimension(value) * this._scale;
    }

    get2DMagnitude() {
        let a = this.getDimension("X");
        let b = this.getDimension("Y");

        return (Math.sqrt((a * a) + (b * b)));
    }


    getNormalized() {
        let mag = this.get2DMagnitude();
        return new Vector({"X" : this.getDimension("X") / mag, "Y" : this.getDimension("Y") / mag});
    }

    getSquared(){
        let newVector = {};

        for (dimension in this.components) {
            newVector[dimension] = this.getDimension(dimension) * this.getDimension(dimension);
        }

        return new Vector(newVector);
    }

    getRootSquared(){
        let newVector = {};

        for (dimension in this.components) {
            newVector[dimension] =  Math.sqrt(Math.abs(this.getDimension(dimension)));
            newVector[dimension] = this.getDimension(dimension) < 0 ? newVector[dimension] * -1 : newVector[dimension]
        }

        return new Vector(newVector);
    }

    // BE CAREFUL ! WOULD ERASE YOUR ORIGINAL STATE WITHOUT CHANCE OF RECOVER (from the class itself at least)
    normalize() {
        let mag = this.get2DMagnitude();
        this.componentX = this.componentX / mag;
        this.componentY = this.componentY / mag;
        return this;
    }
}


function vectorsSum(...args) {
    if(args.length === 1 && (Array.isArray(args[0]) || typeof args[0] === "object")){
        args = Object.values(args[0]);
    }

    let sumVector = {};
    for (dimension in args[0].components) { // dimensions of the returned vector are based on the first item given
        sumVector[dimension] = 0;
        for (let i = 0; i < args.length; i++) {
            sumVector[dimension] = args[i].getDimension(dimension) === undefined ? sumVector[dimension] : sumVector[dimension] + args[i].getDimension(dimension);
        }
    }

    return new Vector(sumVector);
}

// If you want to involve more than 2, use vectorsSum() before
function vectorsSubstract(vector1, vector2) {

    let newVector = {};
    for (dimension in vector1.components) {
        newVector[dimension] = vector1.getDimension(dimension) - (vector2.getDimension(dimension) === undefined ? 0 : vector2.getDimension(dimension));
    }
    return new Vector(newVector);
}

function vectorsMultiply(refVector, multiplicand){
    let newVector = {};

    for (dimension in refVector.components) {
        newVector[dimension] = refVector.getDimension(dimension) * multiplicand;
    }

    return new Vector(newVector);
}
