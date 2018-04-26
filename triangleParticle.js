class TriangleParticle extends Particle{

    constructor(positionX, positionY, physX = new PhysX(), color, apex1, apex2, apex3) {
        super(positionX, positionY, physX, color);
        this._apex1 = apex1;
        this._apex2 = apex2;
        this._apex3 = apex3;
    }

    // TODO : refactor this for some PolygonDefinedByApexesParticle Class
    get apex1() {
        return this._apex1;
    }

    set apex1(value) {
        this._apex1 = value;
    }

    get apex2() {
        return this._apex2;
    }

    set apex2(value) {
        this._apex2 = value;
    }

    get apex3() {
        return this._apex3;
    }

    set apex3(value) {
        this._apex3 = value;
    }

    draw(ctx){
        super.applyPhysics();
        ctx.beginPath();
        ctx.moveTo(this.positionX + this.apex1.x, this.positionY + this.apex1.y);
        ctx.lineTo(this.positionX + this.apex2.x, this.positionY + this.apex2.y);
        ctx.lineTo(this.positionX + this.apex3.x, this.positionY + this.apex3.y);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}