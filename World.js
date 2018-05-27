class World {
    constructor(){
        this._gravityConstant = 20;
        this._mouseLocation = new Vector({"X": window.innerWidth / 2, "Y": window.innerHeight / 2});
        this.frameRate = 60;
        this._particleSystemCollection = new Collection();
        this._interParticleInteraction = false;
        this._afterglow = 0;
    }


    get gravityConstant() {
        return this._gravityConstant;
    }

    get mouseLocation() {
        return this._mouseLocation;
    }

    set mouseLocation(value) {
        this._mouseLocation = value;
        return this;
    }

    get window() {
        return this._window;
    }

    set window(value) {
        this._window = value;
        return this;
    }

    get frameRate() {
        return this._frameRate;
    }

    set frameRate(value) {
        this._frameRate = value;
        this._delay = 1000 / this._frameRate;
        return this;
    }

    get delay() {
        return this._delay;
    }


    get worldMap() {
        return this._worldMap;
    }

    set worldMap(value) {
        this._worldMap = value;
    }

    get particleSystemCollection() {
        return this._particleSystemCollection;
    }

    set particleSystemCollection(value) {
        this._particleSystemCollection = value;
    }

    getClosestParticleSystem(point = this._mouseLocation){
        let closestPS = null; // closest Particle System
        let closestPSMag = Infinity;

        this._particleSystemCollection.forEach( ps => {
            if(ps.location.getMagnitude() < closestPSMag){
                closestPSMag = ps.location.getMagnitude();
                closestPS = ps;
            }
        });

        return closestPS;
    }


    get interParticleInteraction() {
        return this._interParticleInteraction;
    }

    set interParticleInteraction(value) {
        this._interParticleInteraction = value;
    }


    get afterglow() {
        return this._afterglow;
    }

    set afterglow(value) {
        this._afterglow = value;
    }

    setAfterGlow(value) {
        this._afterglow = value;
        return this;
    }

    print() {
        let canvas = this.window.getContext("2d");
        canvas.fillStyle = "rgba(0, 0, 0, " + (1 - this._afterglow).toString() +")";
        canvas.fillRect(0, 0, this.window.width, this.window.height);

        for (let particleSysIdx in this._particleSystemCollection._content){
            this._particleSystemCollection._content[particleSysIdx].print();
        }
        return this;
    }




}
