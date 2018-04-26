class RoundParticle extends Particle {

    constructor(positionX, positionY, physX = new PhysX(), visualFx, radius) {
        super(positionX, positionY, physX, visualFx);
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


    drawSpecific(ctx) {
        ctx.beginPath();
        ctx.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI, true);
        return this;
    }

}