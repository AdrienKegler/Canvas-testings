class PendulumParticle extends Particle{

    constructor(position, physX = new PhysX(), color, width, length, radius) {
        super(position, physX, color);
        this._width = width;
        this._length = length;
        this._radius = radius;
        return this;
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this._width = value;
        return this;
    }

    get length() {
        return this._length;
    }

    set length(value) {
        this._length = value;
        return this;
    }

    get radius() {
        return this._radius;
    }

    set radius(value) {
        this._radius = value;
        return this;
    }

    updateAngularAcceleration(){
        this.angularAcceleration = - world.gravityConstant * this.physX.mass * Math.sin(KeglerMaths.radians(this.angle)) * 0.001;
        return this;
    }



    drawSpecific(ctx) {

        ctx.fillRect(  - (this.width / 2),
                        0,
                        this.width,
                        this.length
                    );
        ctx.beginPath();
        ctx.arc(0,
                this.length,
                this.radius,
                0, 2 * Math.PI, true);

        return this;
    }


}