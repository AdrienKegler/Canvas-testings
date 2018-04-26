class TriangleParticle extends PolygonDefinedByApexesParticle{

    constructor(positionX, positionY, physX = new PhysX(), color, apex1, apex2, apex3) {
        super(positionX, positionY, physX, color, apex1, apex2, apex3);
        return this;
    }

    // TODO : refactor this for some PolygonDefinedByApexesParticle Class
    get apex1() {
        return this.apexCollection[0];
    }

    set apex1(value) {
        this.this.apexCollection[0] = value;
        return this;
    }

    get apex2() {
        return this.this.apexCollection[1];
    }

    set apex2(value) {
        this.this.apexCollection[1] = value;
        return this;
    }

    get apex3() {
        return this.this.apexCollection[2];
    }

    set apex3(value) {
        this.this.apexCollection[2] = value;
        return this;
    }

    draw(ctx){
        super.applyPhysics();
        super.draw(ctx);
        return this;
    }
}