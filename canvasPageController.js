var mouseX = window.innerWidth/2, mouseY = window.innerHeight/2;


function coreFunction(canvas) {

    let frameRate = 60;
    let delay = 1000 / frameRate;

    sizingCanvas(canvas);

    let container = new Canvas2DAsContainer(canvas);
    container.overflowStrategy = "delete";


    let a = function () {
        container.addParticle(
            new RoundParticle(
                new Vector({
                    "X" : Math.random() * 30 + 750,
                    "Y" : Math.random() * 30 + 350
                }),
                new PhysX(
                            {"X" : Math.random()*10, "Y" : 0},
                            {"X" : -0.02, "Y" : 0}
                        ).setBounceAbsorption(1).setBehavior("randomWalker"),
                new VisualFx(),
                3
            ));
    };


    let timer = new InvervalTimer(f => {
        if (container.particleCollection.length < 100) {
            a();
        }

        container.print();
    }, delay);


    document.addEventListener('keydown', (event) => {

        switch (event.key) {
            case " ":
                if (timer.state === 1) {
                    timer.pause();
                    console.log("PAUSE")
                }
                else {
                    timer.resume();
                    onsole.log("RESUME");
                }
                break;

            default:
                console.log(event.key);
                break;
        }
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
    mouseX = event.clientX;
    mouseY = event.clientY;
});