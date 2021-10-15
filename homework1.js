const colors = require('colors');
console.log("Поиск простых чисел в диапазоне от ", process.argv[2], "до", process.argv[3]);

let n1 = parseInt(process.argv[2]), n2 = parseInt(process.argv[3]);
for (let m = 2; m <= 3; m++) {
    if (isNaN(process.argv[m]) == true) {
        console.log(colors.red(process.argv[m] + " не является целым числом"))
    };
};
let per = 0
for (let i = n1; i <= n2; i++) {
    let next = false;
    for (let j = 2; j < i; j++) {
        if (i % j == 0) {
            next = true;
        }
    }
    if (next == false) {
        per = per + 1
        switch (per) {
            case 1:
                console.log(colors.green(i))
                break
            case 2:
                console.log(colors.yellow(i))
                break
            case 3:
                console.log(colors.red(i))
                break
        }
        if (per == 3) {
            per = 0
        }
    }
}
