class Particle {


    constructor(positionX, positionY, physX = new PhysX(), visualFx) {
        this._positionX = positionX;
        this._positionY = positionY;
        this._physX = physX;
        this._visualFx = visualFx;
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


    get visualFx() {
        return this._visualFx;
    }

    set visualFx(value) {
        this._visualFx = value;
    }

    get physX() {
        return this._physX;
    }

    set physX(value) {
        this._physX = value;
        return this;
    }


    isVisible(){
        return this.visualFx.colorA === 0;
    }


    applyPhysics(tics = 1) {
        for (let i = 0; i < tics; i++) {
            this.positionX = this.positionX + this.physX.velocityX;
            this.positionY = this.positionY + this.physX.velocityY;
            this.physX.update(this.positionX, this.positionY);
            console.log(this.physX);
        }
        return this;
    }

    drawSpecific() {

    }

    draw(ctx) {
        this.applyPhysics();
        this.drawSpecific(ctx);
        ctx.fillStyle = this.visualFx.getColor();
        ctx.fill();
        this.visualFx.update();
        return this;
    }


}