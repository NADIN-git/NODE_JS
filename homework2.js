const colors = require('colors');

let param = [[], []];

// Конвертация и проверка параметров
// Программа настроена на 2 параметра в формате «минута-час-день-месяц-год»
for (let j = 0; j <= 1; j++) {
    let { pos, psk } = 0
    for (let i = 0; i <= 6; i++) {
        psk = process.argv[j + 2].indexOf("-", pos);
        let nextPsk = parseInt(process.argv[j + 2].slice(pos, psk));
        if (isNaN(nextPsk) == true) {
            nextPsk = 0
        };
        if (psk == -1) {
            psk = process.argv[j + 2].lastIndexOf("-");
            nextPsk = parseInt(process.argv[j + 2].slice(psk + 1));
            i = 6
        } else {
            pos = psk + 1
        }
        param[j].push(nextPsk)
    }
}

let second = [10, 60];
let stop = [false, false];
param[0][0]--;
param[1][0]--;

//let second2 = 60
//let stop2 = false
//param2[0]--;

const EventEmitter = require('events');
const emitter = new EventEmitter();
const RequestTypes = [
    {
        type: 'time',
        payload: 'запуск таймера',
    },
];

class Customer {
    constructor({ type, payload }) {
        this.type = type;
        this.payload = payload;
    };
}

const generateIntInRange = (min, max) => {
    console.clear();
    for (let j = 0; j <= 1; j++) {
        second[j]--;
        if (second[j] == 0) {
            if (param[j][0] == 0 && param[j][1] == 0) {
                second[j] = 0;
                stop[j] = true
            } else {
                param[j][0] = param[j][0] - 1;
                second[j] = 60;
            }
        }
        if (stop[j] == true) {
            console.log('(' + process.argv[j + 2] + ')  ' + colors.green('работа таймера завершена'))
        } else {
            console.log('(' + process.argv[j + 2] + ')  ' + colors.yellow(param[j][4] + '/' + param[j][3] + '/' + param[j][2] + "  " + param[j][1] + ":" + param[j][0] + ':' + second[j]))
        }
    }
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const generateNewCustomer = () => {
    const params = RequestTypes[generateIntInRange(0, 0)];
    return new Customer(params);
};

const run = async () => {
    const { type, payload } = generateNewCustomer();
    emitter.emit(type, payload);
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (stop[0] == false || stop[1] == false) {
        await run();
    }
};

run();