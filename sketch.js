let capture;
let effect_list;
let current_effect;

const WIDTH = 800 //Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const HEIGHT = 600 //Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

function setup() {
    canvas = createCanvas(WIDTH, HEIGHT);
    //centerElement(canvas)
    //
    capture = createCapture(VIDEO);
    capture.size(WIDTH, HEIGHT);
    capture.hide();

    // UI setup
    let selectX = canvas.position().x + (canvas.size().width / 2) - 50, selectY = canvas.position().y + canvas.size().height + 30
    btnPrev = createButton('<');
    //btnPrev.position(selectX - 40, selectY);
    btnPrev.mousePressed(prev_effect);
    
    current_effect = EFFECT_DATA_LIST[0];
    effect_list = createSelect();
    //effect_list.position(selectX, selectY);
    for (let effect of EFFECT_DATA_LIST) {
        effect_list.option(effect.label);
    }
    effect_list.selected(current_effect.label);
    effect_list.changed(effect_changed);
    
    btnNext = createButton('>');
    //btnNext.position(selectX + 120, selectY);
    btnNext.mousePressed(next_effect);
    //
}

// function windowResized() {
//     resizeCanvas(windowWidth, windowHeight);
// }

function centerElement(element) {
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    element.position(x, y);
}

function effect_changed() {
    let currentIndex = effect_list.elt.selectedIndex;
    current_effect = EFFECT_DATA_LIST[currentIndex];
}

function prev_effect() {
    let newIndex = effect_list.elt.selectedIndex - 1;
    if (newIndex < 0) newIndex = EFFECT_DATA_LIST.length - 1
    effect_list.value(EFFECT_DATA_LIST[newIndex].label);
    effect_changed();
}

function next_effect() {
    let newIndex = effect_list.elt.selectedIndex + 1;
    if (newIndex >= EFFECT_DATA_LIST.length) newIndex = 0
    effect_list.value(EFFECT_DATA_LIST[newIndex].label);
    effect_changed();
}

function downloadCanvas(){  
    // get canvas data  
    var image = canvas.elt.toDataURL();  
  
    // create temporary link  
    var tmpLink = document.createElement( 'a' );  
    tmpLink.download = `image_${Date.now()}.png`; // set the name of the download file 
    tmpLink.href = image;  
  
    // temporarily add link to body and initiate the download  
    document.body.appendChild( tmpLink );  
    tmpLink.click();  
    document.body.removeChild( tmpLink );  
}

function draw() {
    image(capture, 0, 0, WIDTH, HEIGHT);

    if (current_effect.function) {
        if (current_effect.updatePixels) loadPixels();
        current_effect.function();
        if (current_effect.updatePixels) updatePixels();
    }

}

/////////////////////

// function draw() {
//     image(capture, 0, 0, WIDTH, HEIGHT);

//     loadPixels();

//     for (let x = 0; x < WIDTH; x++) {
//         for (let y = 0; y < HEIGHT; y++) {
//             let index = (x + y * WIDTH) * 4;

            
//             pixels[index + 1] = 0
//         }
//     }


//     updatePixels();
    

// }
