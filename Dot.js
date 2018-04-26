class Dot {
    constructor(x,y){
        this._x = x;
        this._y = y;
        return this;
    }


    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
        return this;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
        return this;
    }
}