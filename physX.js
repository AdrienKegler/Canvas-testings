class PhysX {

    constructor(velocityX = 0, velocityY = 0, accelerationX = 0, accelerationY = 0, bounceAbsorption = 0.60) {
        // TODO : think about velocity Object
        this._velocityX = velocityX;
        this._velocityY = velocityY;
        this.maxVelocity = 2;
        // TODO : think about acceleration Object
        this._accelerationX = accelerationX;
        this._accelerationY = accelerationY;

        this._behavior = 'mouseFollower'
        this._bounceAbsorption = bounceAbsorption;
        return this;
    }


    get velocityX() {
        return this._velocityX;
    }

    set velocityX(value) {
        this._velocityX = value;
        return this;
    }

    get velocityY() {
        return this._velocityY;
    }

    set velocityY(value) {
        this._velocityY = value;
        return this;
    }

    get baseAccelerationX() {
        return this._accelerationX;
    }

    set baseAccelerationX(value) {
        this._accelerationX = value;
        return this;
    }

    get baseAccelerationY() {
        return this._accelerationY;
    }

    set baseAccelerationY(value) {
        this._accelerationY = value;
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


    getVelocityForRandomWalker(value) {
        let num;

        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }

        // num value
        switch (getRandomInt(3)) {
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
        switch (getRandomInt(2)) {
            case 0:
                return value * num;

            case 1:
                return value + num;

            default:
                return value * num;
        }

    }

    bounceX() {
        this.velocityX = this.velocityX * this.bounceAbsorption * -1;
        return this;
    }

    bounceY() {
        this.velocityY = this.velocityY * this.bounceAbsorption * -1;
        return this;
    }

    update(particlePositionX, particlePositionY) {
        switch (this._behavior) {
            case 'standard':
                this.velocityX = this.velocityX + this.baseAccelerationX;
                this.velocityY = this.velocityY + this.baseAccelerationY;
                break;

            case 'mouseFollower':

                console.log(mouseX);
                this.baseAccelerationX = (this.baseAccelerationX + (mouseX-particlePositionX)/2/10000);
                this.baseAccelerationY = (this.baseAccelerationY + (mouseY-particlePositionY)/2/10000);

                this.velocityX = Math.max(Math.min(this.velocityX + this.baseAccelerationX, this.maxVelocity), this.maxVelocity * -1);
                this.velocityY = Math.max(Math.min(this.velocityY + this.baseAccelerationY, this.maxVelocity), this.maxVelocity * -1);
                break;


            case 'randomWalker':
                this.velocityX = this.getVelocityForRandomWalker(this.velocityX);
                this.velocityY = this.getVelocityForRandomWalker(this.velocityY);
                break;

            default:
                this.velocityX = this.velocityX + this.baseAccelerationX;
                this.velocityY = this.velocityY + this.baseAccelerationY;
                break;
        }
        return this;
    }
}