class RoundParticle extends Particle{

    constructor(positionX, positionY,  physX = new PhysX(), color, radius) {
        super(positionX, positionY, physX, color);
        this.radius = radius;
        return this;
    }

    get radius() {
        return this._radius;
    }

    set radius(value) {
        this._radius = value;
        return this;
    }


    draw(ctx){
        super.applyPhysics();
        ctx.beginPath();
        ctx.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI, true);
        ctx.fillStyle = this.color;
        ctx.fill();
        return this;
    }

}