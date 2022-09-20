let capture;
let effect_list;
let current_effect;

let settings_controls;

let start_time;

const WIDTH = 800 //Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const HEIGHT = 600 //Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

function setup() {
    /**
     * IMPORTANT NOTE:
     * DO NOT REMOVE this line!
     * On high density screens the total amount of pixels
     * to be modified increases n-fold (4 time for ppi=4)
     */
    pixelDensity(1);

    canvas = createCanvas(WIDTH, HEIGHT);

    //
    capture = createCapture(VIDEO);
    capture.size(WIDTH, HEIGHT);
    capture.hide();

    // UI setup
    let controls = createDiv();
    let effect_controls = createDiv();
    effect_controls.parent(controls);
    settings_controls = createDiv();
    settings_controls.parent(controls);
    let capture_controls = createDiv();
    capture_controls.parent(controls);
    //
    let btnPrev = createButton('<');
    btnPrev.mousePressed(prev_effect);
    btnPrev.parent(effect_controls);
    //
    current_effect = EFFECT_DATA_LIST[0];
    effect_list = createSelect();
    for (let effect of EFFECT_DATA_LIST) {
        effect_list.option(effect.label);
    }
    effect_list.selected(current_effect.label);
    effect_list.changed(effect_changed);
    effect_list.parent(effect_controls);
    //
    let btnNext = createButton('>');
    btnNext.mousePressed(next_effect);
    btnNext.parent(effect_controls);
    //
    let btnCapture = createButton('Capture');
    btnCapture.mousePressed(downloadCanvas);
    btnCapture.parent(capture_controls);

    start_time = millis();

    // PoseNet-related effects
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
    // Execute current effects's post function
    if (current_effect.postfunction) current_effect.postfunction();
    current_effect = EFFECT_DATA_LIST[currentIndex];
    //
    settings_controls.html(null);
    if (current_effect.parameters) {
        for (let param of current_effect.parameters) {
            let min = param.min || 0;
            let max = param.max || 10;
            let val = param.default || (max - min) / 2;
            let step = param.step || (max - min) / 10;
            let slider = createSlider(min, max, val, step);
            slider.id(param.name);
            slider.parent(settings_controls);
        }
    }
    // Execute new effects's pre function
    if (current_effect.prefunction) current_effect.prefunction();
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

function downloadCanvas() {
    // get canvas data  
    var image = canvas.elt.toDataURL();

    // create temporary link  
    var tmpLink = document.createElement('a');
    tmpLink.download = `image_${Date.now()}.png`; // set the name of the download file 
    tmpLink.href = image;

    // temporarily add link to body and initiate the download  
    document.body.appendChild(tmpLink);
    tmpLink.click();
    document.body.removeChild(tmpLink);
}

// Return the number of seconds elapsed from sketch's start time
// or input start time
function time_lapsed(custom_start) {
    let current_time = millis();
    return Math.round((current_time - (custom_start || start_time)) / 1000);
}

function draw() {
    image(capture, 0, 0, WIDTH, HEIGHT);

    if (current_effect.function) {
        if (current_effect.updatePixels) loadPixels();

        let params = {};
        if (current_effect.parameters) {
            for (let param of current_effect.parameters) {
                let key = param.name;
                let val = window[key].value;
                switch (param.type) {
                    case 'int': val = parseInt(val); break;
                    case 'float': val = parseFloat(val); break;
                }
                params[key] = val;
            }
        }

        current_effect.function(params);
        if (current_effect.updatePixels) updatePixels();
    }

}


// NEXT: https://editor.p5js.org/AndreasRef/sketches/r1_w73FhQ