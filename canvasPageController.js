function coreFunction(canvas) {

    let frameRate = 120;
    let delay = 1000/frameRate;

    sizingCanvas(canvas);

    let container = new Canvas2DAsContainer(canvas);
    container.overflowStrategy = "bounce";


    var a = function(){
                container.addParticle(
                    new PolygonDefinedByApexesParticle(
                        Math.random()*100 + 500,
                        Math.random()*100+250,
                        new PhysX(  0, // Initial velocity X
                            -1,// Initial velocity Y
                            Math.random() / -100,    // Permanent Force X
                            Math.random() / 100),   // Permanent Force Y
                        "white",
                        ApexShapeSamples.starDestroyer()
                    ));
                };




    var timer = new InvervalTimer( f => {
        if(container.particleCollection.length < 1){
            a();
        }


        // container.addParticle(new RoundParticle(    Math.random()*100 + 500,
        //                                             Math.random()*100+250,
        //                                             new PhysX(  0, // Initial velocity X
        //                                                         -1,// Initial velocity Y
        //                                                         Math.random() / -100,    // Permanent Force X
        //                                                         Math.random() / 100),   // Permanent Force Y
        //                                             "white",
        //                                             3));
        container.print();
    }, delay);


    document.addEventListener('keydown', (event) => {

        switch (event.key)
        {
            case " ":
                if(timer.state === 1)
                {
                    timer.pause();
                }
                else {
                    timer.resume();
                }
                break;

            default:
                console.log(event.key);
                break;
        }
    });


}

function sizingCanvas(canvas){
    let widthPx = (window.innerWidth - 8).toString()+'px';
    let heightPx = (window.innerHeight - 8).toString()+'px';

    canvas.style.width= widthPx;
    canvas.style.height= heightPx;
    canvas.setAttribute("width",widthPx);
    canvas.setAttribute("height", heightPx);
}
