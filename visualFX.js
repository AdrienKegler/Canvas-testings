class VisualFx {

    constructor() {
        this._colorR = 255;
        this._colorG = 255;
        this._colorB = 255;
        this._colorA = 1;
        this._fading = false;
        this._fadingProbabilities = {"rate": 0.8};
        this._melting = false;
        this._meltingProbabilities = {
            "rate": 1,
            "rateR": 1, "positiveRateR": 1,
            "rateG": 1, "positiveRateG": 0.5,
            "rateB": 1, "positiveRateB": 0
        };
        return this;
    }

    get colorR() {
        return this._colorR;
    }

    set colorR(value) {
        this._colorR = value;
        return this;
    }

    get colorG() {
        return this._colorG;
    }

    set colorG(value) {
        this._colorG = value;
        return this;
    }

    get colorB() {
        return this._colorB;
    }

    set colorB(value) {
        this._colorB = value;
        return this;
    }

    get colorA() {
        return this._colorA;
    }

    set colorA(value) {
        this._colorA = value;
        return this;
    }

    get fading() {
        return this._fading;
    }

    set fading(value) {
        this._fading = value;
        return this;
    }

    get melting() {
        return this._melting;
    }

    set melting(value) {
        this._melting = value;
        return this;
    }

    get fadingProbabilities() {
        return this._fadingProbabilities;
    }

    set fadingProbabilities(value) {
        this._fadingProbabilities = value;
        return this;
    }

    get meltingProbabilities() {
        return this._meltingProbabilities;
    }

    set meltingProbabilities(value) {
        this._meltingProbabilities = value;
        return this;
    }

    getColor() {
        return "rgba(" + this.colorR + ", " + this.colorG + ", " + this.colorB + ", " + this.colorA + ")";
    }

    setColor(colorR, colorG, colorB, colorA) {
        this.colorR = colorR;
        this.colorG = colorG;
        this.colorB = colorB;
        this.colorA = colorA;

        return this;
    }

    fading(value) {
        this._fading = value;
        return this;
    }

    melting(value) {
        this._melting = value;
        return this;
    }

    setMeltingProbabilities(value) {
        this._meltingProbabilities = value;
        return this;
    }

    fade(rate = 1) {
        if (rate === 1 || rate > Math.random()) {
            this._colorA = this._colorA - 0.01;
        }
        return this;
    }


    melt(rates) {
        if (rates["rate"] !== undefined && (rates["rate"] === 1 || rates["rate"] > Math.random())) {
            if (rates["rateR"] !== undefined && (rates["rateR"] === 1 || rates["rateR"] > Math.random())) {

                this._colorR = ProbabilistChanges.randIncrementationOrDecrementation(this._colorR, rates["positiveRateR"] ? rates["positiveRateR"] : null, 0, 255);
            }
            if (rates["rateG"] !== undefined && (rates["rateG"] === 1 || rates["rateG"] > Math.random())) {
                this._colorG = ProbabilistChanges.randIncrementationOrDecrementation(this._colorG, rates["positiveRateG"] ? rates["positiveRateG"] : null, 0, 255);
            }
            if (rates["rateB"] !== undefined && (rates["rateB"] === 1 || rates["rateB"] > Math.random())) {
                this._colorB = ProbabilistChanges.randIncrementationOrDecrementation(this._colorB, rates["positiveRateB"] ? rates["positiveRateB"] : null, 0, 255);
            }
        }
        return this;
    }


    update() {
        if (this._fading) {
            this.fade(this._fadingProbabilities["rate"]);
        }

        if (this._melting) {
            this.melt(this._meltingProbabilities);
        }
        return this;
    }
}