class PhysX {

    constructor(velocity, acceleration, bounceAbsorption = 0.60) {

        // TODO : think about velocity Object
        this._velocity = Vector.toVector(velocity);

        // TODO : think about acceleration Object
        this._acceleration = Vector.toVector(acceleration);

        this._behavior = 'standard';
        this._bounceAbsorption = bounceAbsorption;
        return this;
    }


    get velocity() {
        return this._velocity;
    }

    set velocity(value) {
        this._velocity = value;
        return this;
    }

    get acceleration() {
        return this._acceleration;
    }

    set acceleration(value) {
        this._acceleration = value;
        return this;
    }

    get bounceAbsorption() {
        return this._bounceAbsorption;
    }

    set bounceAbsorption(value) {
        this._bounceAbsorption = value;
        return this;
    }

    setBounceAbsorption(value) {
        this._bounceAbsorption = value;
        return this;
    }

    get behavior() {
        return this._behavior;
    }

    set behavior(value) {
        this._behavior = value;
        return this;
    }

    setBehavior(value) {
        this._behavior = value;
        return this;
    }


    getVelocityForRandomWalker(value) {
        var newVelocity = {};

        for (let dimension in value.components){
            let num;

            // num value
            switch (KeglerMaths.getRandomInt(3)) {
                case 0:
                    num = 0;
                    break;

                case 1:
                    num = 1;
                    break;

                case 2:
                    num = -1;
                    break;

                default:
                    num = 1;
                    break;
            }

            // operation operator
            switch (KeglerMaths.getRandomInt(2)) {
                case 0:
                    newVelocity[dimension] = value.components[dimension] * num;
                    break;
                case 1:
                    newVelocity[dimension] = value.components[dimension] + num;
                    break;
                default:
                    newVelocity[dimension] = value.components[dimension] * num;
                    break;
            }

        }
        return new Vector(newVelocity);
    }



    bounceX() {
        this.velocity["X"] = this.velocity["X"] * this.bounceAbsorption * -1;
        return this;
    }

    bounceY() {
        this.velocity["Y"] = this.velocity["Y"] * this.bounceAbsorption * -1;
        return this;
    }


    update(particlePosition) {
        switch (this._behavior) {
            case 'standard':
                this.velocity = vectorsSum(this.velocity, this.acceleration);
                break;

            case 'mouseFollower':
                let distanceParticleMouseX = mouseX - particlePosition.getDimension("X");
                let distanceParticleMouseY = mouseY - particlePosition.getDimension("Y");

                this.acceleration = new Vector({
                                                "X": distanceParticleMouseX * Math.abs(distanceParticleMouseX),
                                                "Y": distanceParticleMouseY * Math.abs(distanceParticleMouseY)
                                                }).setScale(0.0001);

                this.velocity = vectorsSum(this.velocity, this.acceleration);
                break;


            case "randomWalker" :
                this.velocity = this.getVelocityForRandomWalker(this.velocity);
                break;

            default:
                this.velocityX = this.velocityX + this.baseAccelerationX;
                this.velocityY = this.velocityY + this.baseAccelerationY;
                break;
        }
        return this;
    }
}