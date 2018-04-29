class PhysX {

    constructor(velocity, forcesCollection, bounceAbsorption = 0.60) {

        this._velocity = Vector.toVector(velocity);
        this._forcesCollection = new Collection(Object.values(forcesCollection));
        this._frictionsCollection = new Collection();
        this.addFriction(0.007  , "Air");
        this._mass = 1;
        this.updateAcceleration();


        this._behavior = 'standard';
        this._bounceAbsorption = bounceAbsorption;
        this._normalBounceAbsorption = bounceAbsorption/500;
        this._interParticuleGravitation = true;
        return this;
    }


    get velocity() {
        return this._velocity;
    }

    set velocity(value) {
        this._velocity = value;
        return this;
    }

    get mass() {
        return this._mass;
    }

    set mass(value) {
        this._mass = value;
        return this;
    }

    get forcesCollection() {
        return this._forcesCollection;
    }

    set forcesCollection(value) {
        this._forcesCollection = value;
        return this;
    }

    get frictionCollection() {
        return this._frictionsCollection;
    }

    set frictionCollection(value) {
        this._frictionsCollection = value;
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

    get normalBounceAbsorption() {
        return this._normalBounceAbsorption;
    }

    set normalBounceAbsorption(value) {
        this._normalBounceAbsorption = value;
    }

    get behavior() {
        return this._behavior;
    }

    set behavior(value) {
        this._behavior = value;
        return this;
    }



    addForce(force, forceName) {
        this._forcesCollection.add(force, forceName);
        this.updateAcceleration();
        return this;
    }

    removeForce(force) {
        this._forcesCollection.remove(force);
        this.updateAcceleration();
        return this;
    }

    updateFrictionVector() {
        let frictionSum = 0;
        for (var coef in this._frictionsCollection._content){
            frictionSum = frictionSum + this._frictionsCollection._content[coef];
        }
        this._forcesCollection.update("frictions", vectorsMultiply(this.velocity, frictionSum * -1));
        return this;
    }

    addFriction(friction, frictionName = null) {
        this._frictionsCollection.add(friction, frictionName);
        this.updateFrictionVector().updateAcceleration();
        return this;
    }

    removeFriction(friction) {
        this._frictionsCollection.remove(friction)
        this.updateFrictionVector().updateAcceleration();
        return this;
    }

    setMass(value) {
        this._mass = value;
        return this;
    }

    updateAcceleration() {
        this.updateFrictionVector();
        this.acceleration = vectorsSum(this.forcesCollection._content);
        this.acceleration.scale = this.acceleration.scale / this.mass;
        return this;
    }

    setBounceAbsorption(value) {
        this._bounceAbsorption = value;
        return this;
    }

    setBehavior(value) {
        this._behavior = value;
        return this;
    }


    getVelocityForRandomWalker(value) {
        var newVelocity = {};

        for (let dimension in value.components) {
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


    bounce(dimension) {
        this._velocity.setBaseDimension(dimension, this._velocity.components[dimension] * this.bounceAbsorption * -1);
        for (let otherDimensions in this._velocity.components){
            if (otherDimensions !== dimension){
                this._velocity.setBaseDimension(otherDimensions, this._velocity.components[otherDimensions] * (1-this.normalBounceAbsorption));
            }
        }
        return this;
    }


    update(...args) {

        if(this._interParticuleGravitation){

        }

        switch (this._behavior) {
            case 'standard':
                this.updateAcceleration();
                this.velocity = vectorsSum(this.velocity, this.acceleration);
                break;

            case 'mouseFollower':
                this.acceleration = vectorsSubstract(instance.mouseLocation, args[0]).getRootSquared().setScale(0.01);
                this.velocity = vectorsSum(this.velocity, this.acceleration);
                break;


            case "randomWalker" :
                this.velocity = this.getVelocityForRandomWalker(this.velocity);
                break;

            default:
                this.velocity = vectorsSum(this.velocity, this.acceleration);
                break;
        }
        return this;
    }
}