class Particle {


    constructor(position, physX, visualFx) {

        this._position = Vector.toVector(position);
        this._physX = physX;
        this._visualFx = visualFx;
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


    isVisible(){
        return (this.visualFx.colorA === 0 || (this.visualFx.colorR === 0 && this.visualFx.colorG === 0 && this.visualFx.colorB === 0));
    }


    applyPhysics(tics = 1) {
        for (let i = 0; i < tics; i++) {

            this.position =  vectorsSum(this.position, this.physX.velocity);

            this.physX.update(this.position);
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