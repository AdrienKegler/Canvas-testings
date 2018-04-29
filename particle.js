class Particle {


    constructor(position, physX, visualFx) {

        this._position = Vector.toVector(position);
        this._physX = physX;
        this._visualFx = visualFx;
        this._rotAngle = 0;
        this._directionPointer = "N";
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


    get rotAngle() {
        return this._rotAngle;
    }

    set rotAngle(value) {
        this._rotAngle = value;
        return this;
    }
    setRotAngle(value){
        this._rotAngle = value;
        return this;
    }

    get directionPointer() {
        return this._directionPointer;
    }

    set directionPointer(value) {
        this._directionPointer = value;
        return this;
    }

    setPointerDirection(){
        switch (this._directionPointer){
            case "North":
            case "N":
                this._rotAngle = 0;
                break;
            case "South":
            case "S":
                this._rotAngle = 180;
                break;
            case "West":
            case "W":
                this._rotAngle = 270;
                break;
            case "East":
            case "E":
                this._rotAngle = 90;
                break;

            case "Velocity":
                this._rotAngle = this.physX.velocity.angle("degrees") + 90;
                break;

            case "Acceleration":
                this._rotAngle = this.physX.acceleration.angle("degrees") + 90;
                break;

            default:
                this._rotAngle = 0;
                break;
        }
    }

    isVisible() {
        return !(this.visualFx.colorA === 0 || (this.visualFx.colorR === 0 && this.visualFx.colorG === 0 && this.visualFx.colorB === 0));
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

    draw(ctx) {
        this.applyPhysics();
        this.setPointerDirection();



        ctx.save();

        ctx.translate(this._position.getDimension("X"), this._position.getDimension("Y"));

        ctx.rotate(this._rotAngle * Math.PI / 180);

        ctx.fillStyle = this.visualFx.getColor();

        this.drawSpecific(ctx);

        ctx.fill();

        ctx.restore();






        this.visualFx.update();
        return this;
    }


}