class WorldSettings {
    constructor(){
        this._gravityConstant = 20;
        this._mouseLocation = new Vector({"X": window.innerWidth / 2, "Y": window.innerHeight / 2});
        this.frameRate = 60;
        this._containerCollection = new Collection();
        this._interParticleInteraction = true;
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


    get containerCollection() {
        return this._containerCollection;
    }

    set containerCollection(value) {
        this._containerCollection = value;
    }

    get interParticleInteraction() {
        return this._interParticleInteraction;
    }

    set interParticleInteraction(value) {
        this._interParticleInteraction = value;
    }

    print() {
        for (let contnrIdx in this._containerCollection._content){
            this._containerCollection._content[contnrIdx].print();
        }
        return this;
    }

    getContainerByCoord(...args){} // TODO




}
