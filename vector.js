
class Vector {

    constructor(...args){
        if(!args){
            args = {"X" : 0, "Y" : 0}
        }
        this._components = args;
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

    getBaseComponentById(value){
        return this.components[value];
    }

    setBaseComponentById(id, value){
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

    getComponentById(value){
        return this.getBaseComponentById(value) * this._scale;
    }



    getMagnitude(){
        let a = this.X;
        let b = this.Y;

        return(Math.sqrt((a * a) + (b * b)));
    }

    getNormalized(){
        let mag = this.getMagnitude();

        return new Vector(x/mag, y/mag);
    }


    // BE CAREFUL ! WOULD ERASE YOUR ORIGINAL STATE WITHOUT CHANCE OF RECOVER (from the class itself at least)
    normalize(){
        let mag = this.getMagnitude();
        this.componentX = this.componentX/mag;
        this.componentY = this.componentY/mag;
        return this;
    }
}


class Vectors{

    sum(...args){

        sumVector = [];

        args[0].components.forEach(dimention => {
            sumVector[dimention] = 0;
            for (var i = 0; i < args[0].components.length; i++) {
                sumVector[dimention] += args[i].getComponentById(dimention) === undefined ? 0 :args[i].getComponentById(dimention);
            }
        });
    }

    // If you want to involve more than 2
    substract(){

    }
}