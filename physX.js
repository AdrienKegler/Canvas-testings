class PhysX {

    constructor(velocity, forcesCollection, bounceAbsorption = 0.60) {

        this._velocity = Vector.toVector(velocity);
        this._forcesCollection = new Collection(Object.values(forcesCollection));
        this._frictionsCollection = new Collection();
        this._mass = 1;

        this._behavior = 'standard';
        this._gravityFormulaName = "gaussian";
        this._attractedbyOtherParticles = true;
        this._bounceAbsorption = bounceAbsorption;
        this._normalBounceAbsorption = bounceAbsorption / 500;
        this._interParticuleGravitation = true;

        this._gotVisionAngle = true;

        this.addFriction(0.007, "Air");
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

    get frictionsCollection() {
        return this._frictionsCollection;
    }

    set frictionsCollection(value) {
        this._frictionsCollection = value;
    }

    get interParticuleGravitation() {
        return this._interParticuleGravitation;
    }

    set interParticuleGravitation(value) {
        this._interParticuleGravitation = value;
    }


    get gravityFormulaName() {
        return this._gravityFormulaName;
    }

    set gravityFormulaName(value) {
        this._gravityFormulaName = value;
    }

    get attractedbyOtherParticles() {
        return this._attractedbyOtherParticles;
    }

    set attractedbyOtherParticles(value) {
        this._attractedbyOtherParticles = value;
    }

    get gotVisionAngle() {
        return this._gotVisionAngle;
    }

    set gotVisionAngle(value) {
        this._gotVisionAngle = value;
    }

    setMass(value) {
        this._mass = value;
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
        for (var coef in this._frictionsCollection._content) {
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

    updateAcceleration() {
        this.updateFrictionVector();
        this.acceleration = vectorsSum(this.forcesCollection._content);

        this.acceleration.setScale(this.acceleration.scale / this.mass);
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
        for (let otherDimensions in this._velocity.components) {
            if (otherDimensions !== dimension) {
                this._velocity.setBaseDimension(otherDimensions, this._velocity.components[otherDimensions] * (1 - this.normalBounceAbsorption));
            }
        }
        return this;
    }

    gravityAttractionToParticles(fatherParticle, particles) {
        if (this._attractedbyOtherParticles) {
            let particleAttractionForce = new Vector();

            for (let particleIdx in particles._content) {
                let positionDiff = vectorsSubstract(particles._content[particleIdx].position, fatherParticle.position);
                let positionDiffMag = positionDiff.get2DMagnitude();
                let positionDiffNormalized = positionDiff.getNormalized();
                let potentialNewMagnitude = instance.gravityConstant * fatherParticle.physX._mass * particles._content[particleIdx].physX._mass;
                switch (this._gravityFormulaName) {
                    case 'Real':
                    case 'real':
                        potentialNewMagnitude = KeglerMaths.limit(potentialNewMagnitude / (positionDiffMag * positionDiffMag), 0.1);
                        break;

                    case "attractAndFakeBounce":
                        potentialNewMagnitude = KeglerMaths.limit(potentialNewMagnitude / Math.pow((positionDiffMag - 20), 2), 0.5, -0.5);
                        break;

                    case "gaussian":
                        potentialNewMagnitude = KeglerMaths.limit((potentialNewMagnitude / (5 * Math.sqrt(2 * Math.PI))) * Math.exp(-1 / 2 * Math.pow((positionDiffMag - 200) / Math.sqrt(1000), 2)) -0.001, 0.1, -0.01);
                        break;

                    default:
                        potentialNewMagnitude = KeglerMaths.limit(potentialNewMagnitude / (positionDiffMag * positionDiffMag), 0.1);
                        break;
                }
                let newMagnitude = potentialNewMagnitude === Infinity ? 0 : potentialNewMagnitude;
                let individualAttractionForce = vectorsMultiply(positionDiffNormalized, newMagnitude);
                particleAttractionForce = vectorsSum(individualAttractionForce, particleAttractionForce); // this order is important, particleAttractionForce will take the range of dimensions of the particles.
            }


            this.forcesCollection.update("particleAttractionForce", particleAttractionForce);
        }

        return this;
    }


    update(...args) {

        switch (this._behavior) {

            case "randomWalker" :
                this.velocity = this.getVelocityForRandomWalker(this.velocity);
                return this;


            case 'standard':
                this.updateAcceleration();
                this.velocity = vectorsSum(this.velocity, this.acceleration);
                break;

            case 'mouseFollower':
                let mouseAttraction = vectorsSubstract(instance.mouseLocation, args[0]).getRootSquared().setScale(0.01);
                this.forcesCollection.update("mouseAttraction", mouseAttraction);
                this.updateAcceleration();
                break;


            default:
                break;
        }


        this.velocity = vectorsSum(this.velocity, this.acceleration);
        return this;
    }
}