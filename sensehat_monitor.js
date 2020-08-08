
const _ = [0, 0, 0] // black color
const R = [255, 0, 0] // red color
const G = [0, 255, 0]

let leds = [
    _, _, _, _, _, _, _, _,
    _, _, _, _, _, _, _, _,
    _, _, _, _, _, _, _, _,
    _, _, _, _, _, _, _, _,
    _, _, _, _, _, _, _, _,
    _, _, _, _, _, _, _, _,
    _, _, _, _, _, _, _, _,
    _, _, _, _, _, _, _, _
];
let nextLed = 0

module.exports.lightNextLed = (senseLeds) => {

    leds[nextLed] = G;
    senseLeds.setPixels(leds);
    nextLed++;

    if (nextLed == 64) {
        nextLed = 0;
        leds.forEach((value, index, array) => array[index] = _ );
    }

}