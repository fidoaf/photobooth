/**
 * Functions manipulating the pixels from the data source.
 * We assume that pixels have been loaded and 
 * pixels will be updated at the end of the processing
 */

// EFFECT: Upside-Down
function upside_down_effect() {
    for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT / 2; y++) {
            let index = (x + y * WIDTH) * 4;
            let newheight = HEIGHT - y
            let newindex = (x + newheight * WIDTH) * 4;

            topcolor = color(pixels[index + 0], pixels[index + 1], pixels[index + 2], pixels[index + 3]);
            bottomcolor = color(pixels[newindex + 0], pixels[newindex + 1], pixels[newindex + 2], pixels[newindex + 3]);
            // Swap
            pixels[index + 0] = bottomcolor.levels[0];
            pixels[index + 1] = bottomcolor.levels[1];
            pixels[index + 2] = bottomcolor.levels[2];
            pixels[index + 3] = bottomcolor.levels[3];
            pixels[newindex + 0] = topcolor.levels[0];
            pixels[newindex + 1] = topcolor.levels[1];
            pixels[newindex + 2] = topcolor.levels[2];
            pixels[newindex + 3] = topcolor.levels[3];
        }
    }
}

function bottom_mirror_effect() {
    for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT / 2; y++) {
            let index = (x + y * WIDTH) * 4;
            let newheight = HEIGHT - y
            let newindex = (x + newheight * WIDTH) * 4;

            bottomcolor = color(pixels[newindex + 0], pixels[newindex + 1], pixels[newindex + 2], pixels[newindex + 3]);
            // Change top half of the capture
            pixels[index + 0] = bottomcolor.levels[0];
            pixels[index + 1] = bottomcolor.levels[1];
            pixels[index + 2] = bottomcolor.levels[2];
            pixels[index + 3] = bottomcolor.levels[3];
        }
    }
}

function top_mirror_effect() {
    for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT / 2; y++) {
            let index = (x + y * WIDTH) * 4;
            let newheight = HEIGHT - y
            let newindex = (x + newheight * WIDTH) * 4;

            topcolor = color(pixels[index + 0], pixels[index + 1], pixels[index + 2], pixels[index + 3]);
            // Change bottom half of the capture
            pixels[newindex + 0] = topcolor.levels[0];
            pixels[newindex + 1] = topcolor.levels[1];
            pixels[newindex + 2] = topcolor.levels[2];
            pixels[newindex + 3] = topcolor.levels[3];
        }
    }
}

function left_mirror_effect() {
    for (let x = WIDTH / 2; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT; y++) {
            let rightindex = (x + y * WIDTH) * 4;
            let leftindex = ((WIDTH - x) + y * WIDTH) * 4;

            // Change right half of the capture
            pixels[rightindex + 0] = pixels[leftindex + 0];
            pixels[rightindex + 1] = pixels[leftindex + 1];
            pixels[rightindex + 2] = pixels[leftindex + 2];
            pixels[rightindex + 3] = pixels[leftindex + 3];
        }
    }
}

function right_mirror_effect() {
    for (let x = 0; x < WIDTH / 2; x++) {
        for (let y = 0; y < HEIGHT; y++) {
            let leftindex = (x + y * WIDTH) * 4;
            let rightindex = ((WIDTH - x) + y * WIDTH) * 4;

            // Change left half of the capture
            pixels[leftindex + 0] = pixels[rightindex + 0];
            pixels[leftindex + 1] = pixels[rightindex + 1];
            pixels[leftindex + 2] = pixels[rightindex + 2];
            pixels[leftindex + 3] = pixels[rightindex + 3];
        }
    }
}

function double_top_effect() {
    let halfImage = 4 * width * (height / 2);
    for (let i = 0; i < halfImage; i++) {
        pixels[i + halfImage] = pixels[i];
    }
}

function double_bottom_effect() {
    let halfImage = 4 * width * (height / 2);
    for (let i = 0; i < halfImage; i++) {
        pixels[i] = pixels[i + halfImage];
    }
}

const channel = parseInt(Math.random() * 3);
function colorize_effect() {
    for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT; y++) {
            let index = (x + y * WIDTH) * 4;
            
            pixels[index + channel] = 0;
        }
    }
}

function noise_effect() {
    for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT; y++) {
            let index = (x + y * WIDTH) * 4;

            pixels[index + 0] = Math.min(pixels[index + 0] + random(0, 100), 255);
            pixels[index + 1] = Math.min(pixels[index + 1] + random(0, 100), 255);
            pixels[index + 2] = Math.min(pixels[index + 2] + random(0, 100), 255);
            pixels[index + 3] = Math.min(pixels[index + 3] + random(0, 100), 255);
        }
    }
}

function color_bars_effect() {
    for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT; y++) {
            let index = (x + y * WIDTH) * 4;
            
            const channel = parseInt(Math.random() * 3);
            pixels[index + channel] = 0;
        }
    }
}

function threshold_effect() {
    filter(THRESHOLD)
}

function gray_effect() {
    filter(GRAY)
}

function opaque_effect() {
    filter(OPAQUE)
}

function invert_effect() {
    filter(INVERT)
}

function posterize_effect() {
    filter(POSTERIZE)
}

function dilate_effect() {
    filter(DILATE)
}

function blur_effect() {
    filter(BLUR)
}

function erode_effect() {
    filter(ERODE)
}

function dotted_effect() {
    const STEPSIZE = 10
    background(0);
    capture.loadPixels();
    //var stepSize = floor(map(mouseX, 0, width, 5, 20));
    for (var x = 0; x < capture.width; x += STEPSIZE) {
        for (var y = 0; y < capture.height; y += STEPSIZE) {
            var index = ((y * capture.width) + x) * 4;
            var redVal = capture.pixels[index];
            var greenVal = capture.pixels[index + 1];
            var blueVal = capture.pixels[index + 2];
            fill(redVal, greenVal, blueVal);
            ellipse(x, y, STEPSIZE, STEPSIZE); // square(x, y, STEPSIZE, ...corner radii) / 
        }
    }
}

function pixelate_effect() {
    let interval = 10;
    for (let x = 0; x < WIDTH; x += interval) {
        for (let y = 0; y < HEIGHT; y += interval) {
            let index = (x + y * WIDTH) * 4;
            var r = pixels[index + 0];
            var g = pixels[index + 1];
            var b = pixels[index + 2];
            var a = pixels[index + 3];

            for (let newX = x; newX < x + interval; newX++) {
                for (let newY = y; newY < y + interval; newY++) {
                    let newIndex = (newX + newY * WIDTH) * 4;

                    pixels[newIndex + 0] = r;
                    pixels[newIndex + 1] = g;
                    pixels[newIndex + 2] = b;
                    pixels[newIndex + 3] = a;
                }
            }

        }
    }
}

/**
 * TODO:
 * https://editor.p5js.org/brunoruchiga/sketches/Byms8vMam
 * 
 * https://editor.p5js.org/mtchl/sketches/bbrRRu20G
 * 
 * https://editor.p5js.org/aahdee/sketches/7QOCHYfI4
 * 
 * https://editor.p5js.org/Kubi/sketches/eflfgqFfU
 * https://editor.p5js.org/enickles/sketches/mu3WkrEX2
 * 
 * https://editor.p5js.org/jgl/sketches/XMy0GHKDIS
 * https://editor.p5js.org/pixelfelt/sketches/oS5CwSbM1
 */

///////////////////////////////////////////////////////////////////////////
//////////////////////////////// CONSTANTS ////////////////////////////////
///////////////////////////////////////////////////////////////////////////
const EFFECT_DATA_LIST = [
    {
        "label": "No effect",
    },

    {
        "label": "Upside down",
        "function": upside_down_effect,
        "updatePixels": true
    },
    {
        "label": "Bottom mirror",
        "function": bottom_mirror_effect,
        "updatePixels": true
    },
    {
        "label": "Top mirror",
        "function": top_mirror_effect,
        "updatePixels": true
    },
    {
        "label": "Left mirror",
        "function": left_mirror_effect,
        "updatePixels": true
    },
    {
        "label": "Right mirror",
        "function": right_mirror_effect,
        "updatePixels": true
    },
    {
        "label": "Double top",
        "function": double_top_effect,
        "updatePixels": true
    },
    {
        "label": "Double bottom",
        "function": double_bottom_effect,
        "updatePixels": true
    },
    {
        "label": "Threshold",
        "function": threshold_effect,
        "parameters": [
            {
                "name": "level",
                "type": "float",
                "min": 0.0,
                "max": 1.0,
                "default": 0.5,
            }
        ]
    },
    {
        "label": "Gray",
        "function": gray_effect
    },
    {
        "label": "Opaque",
        "function": opaque_effect
    },
    {
        "label": "Invert",
        "function": invert_effect
    },
    {
        "label": "Posterize",
        "function": posterize_effect,
        "parameters": [
            {
                "name": "range",
                "type": "int",
                "min": 2,
                "max": 255,
            }
        ]
    },
    {
        "label": "Dilate",
        "function": dilate_effect
    },
    {
        "label": "Blur",
        "function": blur_effect,
        "parameters": [
            {
                "name": "radius",
                "type": "int",
                "min": 1,
            }
        ]
    },
    {
        "label": "Erode",
        "function": erode_effect
    },
    {
        "label": "Colorize",
        "function": colorize_effect,
        "updatePixels": true,
        "parameters": [
            {
                "name": "channel",
                "type": "int",
                "min": 0,
                "max": 2,
            }
        ]
    },
    {
        "label": "Noise",
        "function": noise_effect,
        "updatePixels": true,
        "parameters": [
            {
                "name": "red",
                "type": "int",
                "min": 0,
                "max": 255,
            },
            {
                "name": "green",
                "type": "int",
                "min": 0,
                "max": 255,
            },
            {
                "name": "blue",
                "type": "int",
                "min": 0,
                "max": 255,
            },
            {
                "name": "alpha",
                "type": "int",
                "min": 0.0,
                "max": 255,
            },
        ]
    },
    {
        "label": "Color bars",
        "function": color_bars_effect,
        "updatePixels": true,
    },
    {
        "label": "Dotted",
        "function": dotted_effect,
        "parameters": [
            {
                "name": "radius",
                "type": "int",
                "min": 5,
            }
        ]
    },
    {
        "label": "Pixelate",
        "function": pixelate_effect,
        "updatePixels": true,
        "parameters": [
            {
                "name": "interval",
                "type": "int",
                "min": 1,
            }
        ]
    },
];