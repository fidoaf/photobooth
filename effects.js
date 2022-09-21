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

function pre_split_screen_effect() {
    current_effect.function.start_time = millis();
    current_effect.function.backup = [];
}
function split_screen_effect({ delay }) {
    let this_func = current_effect.function;

    for (let x = 0; x < WIDTH / 2; x++) {
        for (let y = 0; y < HEIGHT; y++) {
            let index = (x + y * WIDTH) * 4;
            let newindex = (x + WIDTH / 4 + y * WIDTH) * 4;
            // Render left side of the canvas
            pixels[index + 0] = pixels[newindex + 0];
            pixels[index + 1] = pixels[newindex + 1];
            pixels[index + 2] = pixels[newindex + 2];
            pixels[index + 3] = pixels[newindex + 3];
        }
    }

    // Create a backup of frames to be used afterwards
    this_func.backup.push(pixels)
    if (time_lapsed(this_func.start_time) > delay)
        oldpixels = this_func.backup.shift();
    else
        oldpixels = this_func.backup[0];

    for (let x = WIDTH / 2; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT; y++) {
            let index = (x + y * WIDTH) * 4;
            let newindex = (x - WIDTH / 2 + y * WIDTH) * 4;
            // Render right side of the canvas
            pixels[index + 0] = oldpixels[newindex + 0];
            pixels[index + 1] = oldpixels[newindex + 1];
            pixels[index + 2] = oldpixels[newindex + 2];
            pixels[index + 3] = oldpixels[newindex + 3];
        }
    }
}

function colorize_effect({ channel }) {
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
        const channel = int(Math.random() * 3);
        for (let y = 0; y < HEIGHT; y++) {
            let index = (x + y * WIDTH) * 4;

            pixels[index + channel] = 0;
        }
    }
}

function threshold_effect({ level }) {
    filter(THRESHOLD, level)
}

function gray_effect() {
    filter(GRAY)
}

function bw_average_effect() {
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var index = (x + y * width) * 4;
            var r = pixels[index + 0];
            var g = pixels[index + 1];
            var b = pixels[index + 2];
            var a = pixels[index + 3];

            var bw = (r + g + b) / 3;

            pixels[index + 0] = bw;
            pixels[index + 1] = bw;
            pixels[index + 2] = bw;
        }
    }
}

function bw_luma_effect() {
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var index = (x + y * width) * 4;
            var r = pixels[index + 0];
            var g = pixels[index + 1];
            var b = pixels[index + 2];
            var a = pixels[index + 3];

            var luma = r * .299 + g * .587 + b * .0114;

            pixels[index + 0] = luma;
            pixels[index + 1] = luma;
            pixels[index + 2] = luma;
        }
    }
}

function sepia_effect() {
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var index = (x + y * width) * 4;
            var r = pixels[index + 0];
            var g = pixels[index + 1];
            var b = pixels[index + 2];
            var a = pixels[index + 3];

            var tr = r * .393 + g * .769 + b * .189;
            var tg = r * .349 + g * .686 + b * .168;
            var tb = r * .272 + g * .534 + b * .131;

            pixels[index + 0] = tr;
            pixels[index + 1] = tg;
            pixels[index + 2] = tb;
        }
    }
}

function opaque_effect() {
    filter(OPAQUE)
}

function invert_effect() {
    filter(INVERT)
}

function posterize_effect({ range }) {
    filter(POSTERIZE, range)
}

function dilate_effect() {
    filter(DILATE)
}

function blur_effect({ radius }) {
    filter(BLUR, radius)
}

function erode_effect() {
    filter(ERODE)
}

function dotted_effect({ radius }) {
    background(0);
    capture.loadPixels();
    //var stepSize = floor(map(mouseX, 0, width, 5, 20));
    for (var x = 0; x < capture.width; x += radius) {
        for (var y = 0; y < capture.height; y += radius) {
            var index = ((y * capture.width) + x) * 4;
            var redVal = capture.pixels[index];
            var greenVal = capture.pixels[index + 1];
            var blueVal = capture.pixels[index + 2];
            fill(redVal, greenVal, blueVal);
            ellipse(x, y, radius, radius); // square(x, y, STEPSIZE, ...corner radii) / 
        }
    }
}

function pixelate_effect({ interval }) {
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

function pre_face_mask_effect() {
    current_effect.function.poses = [];
    if (!current_effect.function.poseNet) {
        // Create a new poseNet method with a single detection
        current_effect.function.poseNet = ml5.poseNet(capture, function () {
            console.log('Model Loaded');
        });
        // This sets up an event that fills the global variable "poses"
        // with an array every time new poses are detected
        current_effect.function.poseNet.on('pose', function (results) {
            current_effect.function.poses = results;
        });

    }
    current_effect.function.start_time = millis();
    current_effect.function.backup = [];
}
function face_mask_effect() {
    // Loop through all the poses detected
    const poses = current_effect.function.poses;
    for (let i = 0; i < poses.length; i++) {
        // For each pose detected, loop through all the keypoints
        let pose = poses[i].pose;

        if (pose.nose.confidence > 0.5) {
            noStroke();
            fill(255, 0, 0);
            ellipse(pose.nose.x, pose.nose.y, 30, 30);
            fill(255, 255, 255);
            ellipse(pose.leftEye.x, pose.leftEye.y, 30, 30);
            ellipse(pose.rightEye.x, pose.rightEye.y, 30, 30);
        }
        // for (let j = 0; j < pose.keypoints.length; j++) {
        //     // A keypoint is an object describing a body part (like rightArm or leftShoulder)
        //     let keypoint = pose.keypoints[j];
        //     // Only draw an ellipse is the pose probability is bigger than 0.2
        //     if (keypoint.score > 0.2) {
        //         fill(255, 0, 0);
        //         noStroke();
        //         ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
        //     }
        // }

        //noLoop()
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
 * https://editor.p5js.org/bestesaylar/sketches/o1LW7RQeK
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
        "label": "Split screen",
        "function": split_screen_effect,
        "prefunction": pre_split_screen_effect,
        "updatePixels": true,
        "parameters": [
            {
                "name": "delay",
                "type": "int",
                "min": 0,
                "max": 10,
                "default": 3,
            }
        ]
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
        "label": "Black & White (Average)",
        "function": bw_average_effect,
        "updatePixels": true,
    },
    {
        "label": "Black & White (Luma formula)",
        "function": bw_luma_effect,
        "updatePixels": true,
    },
    {
        "label": "Sepia",
        "function": sepia_effect,
        "updatePixels": true,
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
                "type": "float",
                "min": 2,
                "max": 20,
                "default": 10,
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
                "max": 5,
                "default": 1,
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
                "step": 1,
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
                "max": 20,
                "default": 10,
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
                "min": 5,
                "max": 20,
                "default": 10,
            }
        ]
    },
    {
        "label": "Face mask",
        "function": face_mask_effect,
        "prefunction": pre_face_mask_effect,
        "parameters": [
        ]
    },
];