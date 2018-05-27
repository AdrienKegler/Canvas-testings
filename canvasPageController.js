function coreFunction() {

    sizingcanvas(world.window);


    var a = function (container, size, pointX = null, pointY = null) {

        let point = KeglerMaths.randPointInCircle(40);

        container.addParticle(
            new RoundParticle(
                new Vector({
                    "X": point.X,
                    "Y": point.Y
                }),
                new PhysX(
                    {
                        "X": KeglerMaths.gaussRand(),
                        "Y": -20 + Math.random()*5
                    },
                    {}).addForce(new Vector({"X": 0, "Y": 0.01 * size * world._gravityConstant}), "gravity")
                    .setBounceAbsorption(0.8).setBehavior("standard").setMass(size),
                new VisualFx().setColor(255, 255, 255, 0.8),
                size
            )
        );
    };


    let timer = new InvervalTimer(f => {
        world.particleSystemCollection.forEach(particleSystem => {
            if (particleSystem.particleCollection._content.length < 1000) {
               for(let i = 0; i<1       ; i++){
                   a(particleSystem, 5);
               }
            }
        });
        world.print();
    }, world._delay);


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

            case "s":
                a(3);
                break;

            case "w":
                world.particleSystemCollection.forEach(particleSystem => {
                    particleSystem.addForce(
                        new Vector({"X": 0.5, "Y": 0}), "Wind"
                    )
                });
                break;
            default:
                console.log(event.key);
                break;
        }
    });

    document.addEventListener('keyup', (event) => {
        world.particleSystemCollection.forEach(particleSystem => {
            particleSystem.particleCollection.forEach(particle => {
                particle._physX._forcesCollection.update("Wind", new Vector());
            });
        });
    });

}

function sizingcanvas(canvas) {
    let widthPx = (window.innerWidth - 8).toString() + 'px';
    let heightPx = (window.innerHeight - 8).toString() + 'px';

    canvas.style.width = widthPx;
    canvas.style.height = heightPx;
    canvas.setAttribute("width", widthPx);
    canvas.setAttribute("height", heightPx);
}


addEventListener("mousedown", function updateMouse(event) {
    world.mouseLocation = new Vector({"X": event.clientX, "Y": event.clientY});
});

addEventListener("mousedown", function addNewParticleSystem(event) {
    if (event.ctrlKey) {
        let container = new ParticleSystem({"X" : world.mouseLocation.getDimension("X"), "Y" : world.mouseLocation.getDimension("Y")});
        world._particleSystemCollection.add(container);
        container.setOverflowStrategy("delete");
    }
});