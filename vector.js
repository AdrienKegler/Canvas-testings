
class Vector {

    constructor(vectorArray){
        if(!vectorArray){
            vectorArray = {"X" : 0, "Y" : 0}
        }
        this._components = vectorArray;
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

    getBaseDimension(value){
        return this.components[value];
    }

    setBaseDimension(id, value){
        this.components[id] = value;
        return this;
    }

    get scale() {
        return this._scale;
    }

    set scale(value) {
        this._scale = value;
        return this;
    }
    setScale(value) {
        this._scale = value;
        return this;
    }


    getDimension(value){
        return this.getBaseDimension(value) * this._scale;
    }


    static toVector(value){
        if(value.constructor.name === "Vector")
        {
            return value;

        }
        else {
            return new Vector(value);
        }
    }

    get2DMagnitude(){
        let a = this.X;
        let b = this.Y;

        return(Math.sqrt((a * a) + (b * b)));
    }

    getNormalized(){
        let mag = this.get2DMagnitude();

        return new Vector(x/mag, y/mag);
    }


    // BE CAREFUL ! WOULD ERASE YOUR ORIGINAL STATE WITHOUT CHANCE OF RECOVER (from the class itself at least)
    normalize(){
        let mag = this.get2DMagnitude();
        this.componentX = this.componentX/mag;
        this.componentY = this.componentY/mag;
        return this;
    }
}



function vectorsSum(...args){

    let sumVector = {};
    for(dimension in args[0].components) {
        sumVector[dimension] = 0;
        for (var i = 0; i < args.length; i++) {
            sumVector[dimension] = args[i].getDimension(dimension) === undefined ? sumVector[dimension] : sumVector[dimension] + args[i].getDimension(dimension);
        }
    }

    return new Vector(sumVector);
}

// If you want to involve more than 2, use sum() before
function vectorsSubstract(vector1, vector2){

    let newVector = {};
    vector1.components.forEach(dimension => {
        newVector[dimension] = vector1[dimension] - (vector2[dimension] === undefined ? 0 : vector2[dimension]);
    });
    return new Vector.prototype.map(newVector);
}
