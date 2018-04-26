class Particle {


    constructor(positionX, positionY, physX = new PhysX(), color) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.color = color;
        this.physX = physX;
    }


    get positionX() {
        return this._positionX;
    }

    set positionX(value) {
        this._positionX = value;
        return this;
    }

    get positionY() {
        return this._positionY;
    }

    set positionY(value) {
        this._positionY = value;
        return this;
    }

    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value;
        return this;
    }


    get physX() {
        return this._physX;
    }

    set physX(value) {
        this._physX = value;
        return this;
    }


    applyPhysics(tics = 1){
        for (let i = 0; i < tics; i++) {
            this.positionX = this.positionX + this.physX.velocityX;
            this.positionY = this.positionY + this.physX.velocityY;
            this.physX.update();
        }
        return this;
    }


}