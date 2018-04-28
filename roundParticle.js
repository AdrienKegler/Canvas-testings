class RoundParticle extends Particle {

    constructor(position, physX, visualFx, radius) {
        super(position, physX, visualFx);
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
        ctx.arc(this.position.getDimension("X"), this.position.getDimension("Y"), this.radius, 0, 2 * Math.PI, true);
        return this;
    }

}