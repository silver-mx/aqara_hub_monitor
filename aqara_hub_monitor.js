require('dotenv').config({
    path: __dirname + '/.env'
});
var ping = require('ping');
var Push = require('pushover-notifications');


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
const interval5Mins = 5 * 60 * 1000;

setInterval(notifyWhenDown, interval5Mins);

function notifyWhenDown() {
    ping.sys.probe(aqaraHub, (isAlive) => {

        if (!isAlive) {

            console.log('Aqara hub is down, sending notification ...');

            p.send(msg, (err, result) => {
                if (err) {
                    throw err
                }

                console.log(result)
            })
        }
    });
}



