class KeglerMaths {

    static limit(input, limitMax, limitMin = 0) {
        return Math.max(Math.min(input, limitMax), limitMin);
    }

    static getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    static gaussRand() {
        let u = 0, v = 0;
        while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
        while (v === 0) v = Math.random();
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    }









    // TRIGONOMETRY

    static randPointInCircle(radius = 1) {
        let pt_angle = Math.random() * 2 * Math.PI;
        let pt_radius_sq = Math.random() * radius * radius;
        let pt_x = Math.sqrt(pt_radius_sq) * Math.cos(pt_angle);
        let pt_y = Math.sqrt(pt_radius_sq) * Math.sin(pt_angle);

        return {"X": pt_x, "Y": pt_y}
    }

    static polarToCarthesian(angle, radius){ // angle in radians

        let xVal = radius * Math.sin(angle);
        let yVal = radius * Math.sin(angle);

        return {"X" : xVal, "Y" : yVal};

    }

    static degrees(rad){ //converts radians to degrees
        return rad * 180 / Math.PI;
    }

    static radians(deg){ //converts degrees to radians
        return deg * Math.PI / 180;
    }

}

Number.prototype.toFixedDown = function(digits) {
    let n = this - Math.pow(10, -digits)/2;
    n += n / Math.pow(2, 53); // added 1360765523: 17.56.toFixedDown(2) === "17.56"
    return n.toFixed(digits);
}