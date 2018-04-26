class InvervalTimer {

    constructor(callback, interval){
        this.state = 0; //  0 = idle, 1 = running, 2 = paused, 3= resumed
        this.timerId = 0;
        this.startTime = 0;
        this.remaining = 0;
        this.interval = interval;
        this.startTime = new Date();
        this.callback = callback;
        this.timerId = window.setInterval(this.callback, interval);

        this.state = 1;
        return this;
    }



    pause() {
        if (this.state !== 1) return;

        this.remaining = this.interval - (new Date() - this.startTime);
        window.clearInterval(this.timerId);
        this.state = 2;
        return this;
    };

    resume() {
        if (this.state !== 2) return;

        this.state = 3;
        window.setTimeout(this.timeoutCallback(), this.remaining);
        return this;
    };

    timeoutCallback() {
        if (this.state !== 3) return;

        this.callback();

        this.startTime = new Date();
        this.timerId = window.setInterval(this.callback, this.interval);
        this.state = 1;
        return this;
    };
}