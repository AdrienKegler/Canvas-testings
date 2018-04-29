function coreFunction(canvas) {

    sizingCanvas(canvas);

    let container = new Canvas2DAsContainer(canvas);
    instance._containerCollection.add(container, "Container");
    container.setOverflowStrategy("delete").setRemanancy(0.3);




    var a = function (size) {
        let point = KeglerMaths.randPointInCircle(50);

        container.addParticle(
            new RoundParticle(
                new Vector({
                    "X": point.X + window.innerWidth/2,
                    "Y": point.Y + window.innerHeight/2
                }),
                new PhysX(
                    {"X": 0, "Y": 0},
                    {}).addForce(new Vector({"X": 0, "Y": 0.00 * size * instance._gravityConstant}), "gravity")
                    .setBounceAbsorption(0.65).setBehavior("mouseFollower").setMass(size),
                new VisualFx().setColor(Math.random() * 255, Math.random() * 255, Math.random() * 255, 1),
                8
            ));
    };


    let timer = new InvervalTimer(f => {
        if (container.particleCollection._content.length < 100) {
            a(3);
        }

        instance.print();
    }, instance._delay);


    document.addEventListener('keydown', (event) => {

        switch (event.key) {
            case " ":
                if (timer.state === 1) {
                    timer.pause();
                    console.log("PAUSE")
                }
                else {
                    timer.resume();
                    console.log("RESUME");
                }
                break;
            case "w":
                container.particleCollection.forEach(particle => {
                    particle._physX.addForce(
                        new Vector({"X": 0.1, "Y": 0}), "Wind"
                    )
                });
                break;
            default:
                console.log(event.key);
                break;
        }
    });

    document.addEventListener('keyup', (event) => {
        container.particleCollection.forEach(particle => {
            particle._physX._forcesCollection.update("Wind", new Vector());
        });

    });

}

function sizingCanvas(canvas) {
    let widthPx = (window.innerWidth - 8).toString() + 'px';
    let heightPx = (window.innerHeight - 8).toString() + 'px';

    canvas.style.width = widthPx;
    canvas.style.height = heightPx;
    canvas.setAttribute("width", widthPx);
    canvas.setAttribute("height", heightPx);
}


addEventListener("mousedown", function updateMouse(event) {
    instance.mouseLocation = new Vector({"X": event.clientX, "Y": event.clientY});
});