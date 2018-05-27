class Particle {


    constructor(position, physX, visualFx) {

        this._position = Vector.toVector(position);
        this._physX = physX;
        this._visualFx = visualFx;
        this._angle = 0; // degrees
        this._angularVelocity = 0; // degrees
        this._angularAcceleration = 0; // degrees
        this._directionPointer = "Else";
    }


    get position() {
        return this._position;
    }

    set position(value) {
        this._position = Vector.toVector(value);
        return this;
    }


    get visualFx() {
        return this._visualFx;
    }

    set visualFx(value) {
        this._visualFx = value;
        return this;
    }

    get physX() {
        return this._physX;
    }

    set physX(value) {
        this._physX = value;
        return this;
    }


    get angle() {
        return this._angle;
    }

    set angle(value) {
        this._angle = value;
        return this;
    }
    setAngle(value){
        this._angle = value;
        return this;
    }


    get angularVelocity() {
        return this._angularVelocity;
    }

    set angularVelocity(value) {
        this._angularVelocity = value;
    }

    setAngularVelocity(value) {
        this._angularVelocity = value;
        return this;
    }

    get angularAcceleration() {
        return this._angularAcceleration;
    }

    set angularAcceleration(value) {
        this._angularAcceleration = value;
    }

    setAngularAcceleration(value) {
        this._angularAcceleration = value;
        return this;
    }

    updateAngularAcceleration(){

    }


    get directionPointer() {
        return this._directionPointer;
    }

    set directionPointer(value) {
        this._directionPointer = value;
        return this;
    }

    setDirectionPointer(value) {
        this._directionPointer = value;
        return this;
    }

    updateRotAngle(){
        switch (this._directionPointer){
            case "North":
            case "N":
                this._angle = 0;
                break;
            case "South":
            case "S":
                this._angle = 180;
                break;
            case "West":
            case "W":
                this._angle = 270;
                break;
            case "East":
            case "E":
                this._angle = 90;
                break;

            case "Velocity":
                this._angle = this.physX.velocity.angle("degrees") + 90;
                break;

            case "Acceleration":
                this._angle = this.physX.acceleration.angle("degrees") + 90;
                break;

            default:
                this.updateAngularAcceleration();
                this.angularVelocity = this.angularVelocity + this.angularAcceleration;
                this.angle = this.angle + this.angularVelocity;
                break;
        }
    }

    isVisible() {
        return !(this.visualFx.colorA === 0 || (this.visualFx.colorR === 0 && this.visualFx.colorG === 0 && this.visualFx.colorB === 0));
    }

    updateGravityAttractionBetweenParticles(particles){
        this.physX.gravityAttractionToParticles(this, particles);
    }

    applyPhysics(tics = 1) {
        for (let i = 0; i < tics; i++) {
            this.position = vectorsSum(this.position, this.physX.velocity);
            this.physX.update(this.position);
        }
        return this;
    }




    drawSpecific() {

    }

    draw(ctx, positionOffset) {

        this.applyPhysics();
        this.updateRotAngle();



        ctx.save();

        ctx.translate(  positionOffset.getDimension("X") + this._position.getDimension("X"),
                        positionOffset.getDimension("Y") + this._position.getDimension("Y"));

        ctx.rotate(this._angle * Math.PI / 180);

        ctx.fillStyle = this.visualFx.getColor();

        this.drawSpecific(ctx);

        ctx.fill();

        ctx.restore();






        this.visualFx.update();
        return this;
    }


}