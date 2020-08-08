require('dotenv').config({
    path: __dirname + '/.env'
});

const senseJoystick = require('sense-joystick')
const senseLeds = require('sense-hat-led')

const sensehat = require('./sensehat_monitor');
const ping = require('ping');
const Push = require('pushover-notifications');

let senseLeds;


var p = new Push({
    user: process.env['PUSHOVER_USER'],
    token: process.env['PUSHOVER_TOKEN'],
});

const msg = {
    message: 'Aqara hub got offline', // required
    title: "Warning - Aqara Hub",
    sound: 'magic',
    device: 'raspberry',
    priority: 1
}

const aqaraHub = '192.168.1.105';
const interval = 1 * 60 * 1000;

/* Only for the emulator */
module.exports = (_senseJoystick, _senseLeds) => {
    senseLeds = _senseLeds;
}

function notifyWhenDown() {
    ping.sys.probe(aqaraHub, (isAlive) => {

        if (!isAlive) {

            console.log('Aqara hub is down, sending notification ...');

            p.send(msg, (err, result) => {
                if (err) {
                    throw err
                }

                sensehat.lightNextLed(senseLeds);
                //console.log(result)
            })
        } else {
            sensehat.lightNextLed(senseLeds);
        }
    });
}

 setInterval(notifyWhenDown, interval);



