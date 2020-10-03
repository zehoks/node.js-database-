//callback,promise,async-await
const timeout = 1500;

let call = [1, 2, 3]

function times(start) {
return new Date() - start
}

function addValue() {
    const start = new Date();
    call.push(1)
    console.log("first iteration callback " , call, 'time:', times(start));

    setTimeout(() => {
        call.push(2)
        console.log("second iteration callback ", call, "time:", times(start));

        setTimeout(() => {
            call.push(3)
            console.log("third iteration callback ", call, "time:", times(start));
        }, timeout)    
    }, timeout)

    console.log("continuation cod callback");
}
console.log(call);
addValue();
console.log(call);


/**
 * delay ожидает указанное время,чтобы двигаться дальше
 * @param {number} ms - time to wait 
 */
function delay(ms) {
    return new Promise((resolve) => { setTimeout(resolve,ms) } )
}


//Promise wrong realization
let pro = [1]

function addvaluePro() {
    const start = new Date();
    pro.push(1);
    console.log("first iteration promise ", pro, "time:", times(start));
    delay(timeout)
    .then(() => {
            pro.push(2);
            console.log("second iteration promise ", pro, "time:", times(start));
    })
        .then(() => {
        delay(timeout).then(() => {
            pro.push(3);
            console.log("third iteration promise ", pro, "time:", times(start));
        });
    })
        .then(() => {
        delay(timeout).then(() => {
            pro.push(4);
            console.log("fourth iteration promise ", pro, "time:", times(start));
        });
    });
}
addvaluePro();


//Promise correct realization
let prom = [1];

function addvalueProm() {
const start = new Date();
prom.push(1);
console.log("first iteration prom ", prom, "time:", times(start));
delay(timeout)
    .then(() => {
        prom.push(2);
        console.log("second iteration prom ", prom, "time:", times(start));
    })
    .then(() => {
        return new Promise((resolve) => {
        delay(timeout).then(() => {
            prom.push(3);
            console.log("third iteration prom ", prom, "time:", times(start));
            resolve('Hi');//передает в 4 итерацию
        });
    })
    
    })
    .then((val) => {
        console.log('val:',val);//после принятия resolve c 3 итерации
        delay(timeout).then(() => {
            prom.push(4);
            console.log("fourth iteration prom ", prom, "time:", times(start));
    });
    });
}
addvalueProm();


let aa = [1, 2, 3]

//await применятеся в асинхронной функции
async function addValueAwait() {
    const start = new Date()
    aa.push(1)
    console.log("first iteration async ", aa, "time:", times(start));
    await delay(timeout)
    aa.push(2)
    console.log("second iteration async ", aa, "time:", times(start));
    await delay(timeout);
    aa.push(3)
    console.log("third iteration async ", aa, "time:", times(start));
}

addValueAwait();
