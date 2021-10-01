const colors = require('colors');
console.log("таймер с обратным отсчётом ", process.argv[2]);

// Подключаю модуль events
const EventEmitter = require('events');
const emitter = new EventEmitter();
const RequestTypes = [
    {
        // 
        type: 'time1',
        payload: 'Таймер обратного отсчета: process.argv[2]',
    },
    {
        // 
        type: 'time2',
        payload: 'Таймер обратного отсчета: process.argv[3]',
    },
];

class Customer {
    constructor({ type, payload }) {
        this.type = type;
        this.payload = payload;
    };
}


let param = [];
let { pos, psk } = 0

for (let i = 0; i <= 6; i++) {
    psk = process.argv[2].indexOf("-", pos);
    let nextPsk = parseInt(process.argv[2].slice(pos, psk));
    if (psk == -1) {
        psk = process.argv[2].lastIndexOf("-");
        nextPsk = parseInt(process.argv[2].slice(psk + 1));
        i = 6
    } else {
        pos = psk + 1
    }
    param.push(nextPsk)
    console.log(param)
}

let param2 = [];
pos = 0
psk = 0

for (let i = 0; i <= 6; i++) {
    psk = process.argv[3].indexOf("-", pos);
    let nextPsk = parseInt(process.argv[3].slice(pos, psk));
    if (psk == -1) {
        psk = process.argv[3].lastIndexOf("-");
        nextPsk = parseInt(process.argv[3].slice(psk + 1));
        i = 6
    } else {
        pos = psk + 1
    }
    param2.push(nextPsk)
    console.log(param2)
}

let second = 60
let second2 = 60
//let n1 = param[0]
//let n1 = param[0]

//let timerId = setInterval(Ynnn, 1000);
//let timer2Id = setInterval(Xnnn, 1000);
//let timeinterval = setInterval(updateClock, 1000);

function Ynnn() {
    second--;
    console.clear()
    console.log(param[4] + '/' + param[3] + '/' + param[2] + "  " + param[1] + ":" + param[0] + ':' + second)
   // if (second <= 0) {
        //clearInterval(timerId);
    //}
};

function Xnnn() {
    second2--;
    console.clear()
    console.log(param2[4] + '/' + param2[3] + '/' + param2[2] + "  " + param2[1] + ":" + param2[0] + ':' + second2)
    //if (second2 <= 0) {
        //clearInterval(timer2Id);
    //}
}

//let timer2Id = setInterval((Хnnn(60)), 1000);
//let timerId = setInterval((Ynnn(60)), 1000);

const generateIntInRange = () => {
    second2--;
    second--;
    console.clear()
    console.log(param2[4] + '/' + param2[3] + '/' + param2[2] + "  " + param2[1] + ":" + param2[0] + ':' + second2--)
    console.log(param[4] + '/' + param[3] + '/' + param[2] + "  " + param[1] + ":" + param[0] + ':' + second--)
    //let timerId = setInterval((Ynnn), 1000);
    //    return Math.floor(Math.random() * (max - min + 1) + min);
}

const generateIntOnRange = () => {
    Ynnn();
    //let timer2Id = setInterval((Xnnn), 1000);
    //let timerId = setInterval((Ynnn), 1000);
    //    return Math.floor(Math.random() * (max - min + 1) + min);
}

//console.log(generateIntInRange(100, 200));

const generateNewCustomer = () => {
    const params = RequestTypes[generateIntInRange(0, 1)];
    return new Customer(params)
};

const run = async () => {
    const { type, payload } = generateNewCustomer();
    emitter.emit(type, payload);
    await new Promise(resolve => setTimeout(resolve, generateIntInRange(1000, 5000)));    
    await run();
};

class Handler {
    static time1(payload) {
        console.log('time1', payload);
        //emitter.emit('error', 'Ошибка!')
    }
    static time2(payload) {
        console.log('time2', payload);
        //emitter.emit('error', 'Ошибка!')
    }
}

emitter.on('time1', Handler.time1);
emitter.on('time2', Handler.time2);
//emitter.on('error', console.log);

run();
//   подписка на событие
//emitter.on('send', console.log);
//Обработка ошибок, чтобы не падала программа.
//Подписываемся на error, чтобы выводить ошибки в консоль
//emitter.on('error', (error) => {
//console.log(error);
//})
//emitter.on('send', () => {
//emitter.emit('error', 'Error!');
//});




//let deadline = "January 01 2018 00:00:00 GMT+0300"; //for Ukraine
//let deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000); // for endless timer
//initializeClock('countdown', deadline);
//getTimeRemaining(deadline);
//console.log(deadline);

//const deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000); // for endless timer

//function getTimeRemaining(endtime) {
//    var t = Date.parse(endtime) - Date.parse(new Date());
//    var seconds = Math.floor((t / 1000) % 60);
//    var minutes = Math.floor((t / 1000 / 60) % 60);
//    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
//    var days = Math.floor(t / (1000 * 60 * 60 * 24));
//    return {
//      'total': t,
//      'days': days,
//      'hours': hours,
//      'minutes': minutes,
//      'seconds': seconds
//    };
//  }
//  
//  function initializeClock(id, endtime) {
//    var clock = document.getElementById(id);
//    var daysSpan = clock.querySelector('.days');
//    var hoursSpan = clock.querySelector('.hours');
//    var minutesSpan = clock.querySelector('.minutes');
//    var secondsSpan = clock.querySelector('.seconds');
//  
//    function updateClock() {
//      var t = getTimeRemaining(endtime);
//  
//      daysSpan.innerHTML = t.days;
//      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
//      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
//      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
//  
//      if (t.total <= 0) {
//        clearInterval(timeinterval);
//      }
//    }
//  
//    updateClock();
//    var timeinterval = setInterval(updateClock, 1000);
//  }
//  
//  var deadline="January 01 2018 00:00:00 GMT+0300"; //for Ukraine
//  var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000); // for endless timer
//  initializeClock('countdown', deadline);
//
//// ----------------------------------  
//// 2 пример
//
//const EventEmitter = require('events');
//const emitter = new EventEmitter();
//const RequestTypes = [
//  {
//      // отправка документов
//      type: 'send',
//      payload: 'to send a document',
//  },
//  {
//      // получение документов
//      type: 'receive',
//        payload: 'to  receive a document',
//    },
//    {
//        // подписание документов
//        type: 'sign',
//        payload: 'to  sing a document',
//    },
//];
//
//class Customer {
//    constructor({ type, payload }) {
//        this.type = type;
//        this.payload = payload;
//    };
//}
//
//const generateIntInRange = (min, max) => {
//    return Math.floor(Math.random() * (max - min + 1) + min);
//}
//
////console.log(generateIntInRange(100, 200));
//
//const generateNewCustomer = () => {
//    const params = RequestTypes[generateIntInRange(0, RequestTypes.length - 1)];
//    return new Customer(params)
//};
//
//const run = async () => {
//    const { type, payload } = generateNewCustomer();
//    emitter.emit(type, payload);
//    await new Promise(resolve => setTimeout(resolve, generateIntInRange(1000, 5000)));
//    await run();
//};
//
//class Handler {
//    static send(payload) {
//        console.log('send request', payload);
//    }
//    static receive(payload) {
//        console.log('Receive request', payload);
//    }
//    static sign(payload) {
//        console.log('Sign request', payload);
//        emitter.emit('error', 'pen is broken!')
//    }
//}
//
//emitter.on('send', Handler.send);
//emitter.on('receive', Handler.receive);
//emitter.on('sign', Handler.sign);
//emitter.on('error', console.log);
//
//run();

// подписка на событие
//emitter.on('send', console.log);
// Обработка ошибок, чтобы не падала программа.
// Подписываемся на error, чтобы выводить ошибки в консоль
//emitter.on('error', (error) => {
    //console.log(error);
//})
//emitter.on('send', () => {
    //emitter.emit('error', 'Error!');
//});

// подписка на событие только один раз
//emitter.once('send', console.log);
// отписаться от события
//emitter.removeListener('send', console.log);
//emitter.emit('send', 'to send a document');