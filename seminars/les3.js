//callback,promise,async-await
const timeout = 1500;

let call = [1, 2, 3]

function times(start) {
return new Date() - start
}

function addValue() {
    const start = new Date();
    call.push(1)
    console.log("first iteration  " , call, 'time:', times(start));

    setTimeout(() => {
        call.push(2)
        console.log("second iteration  ", call, "time:", times(start));

        setTimeout(() => {
            call.push(3)
            console.log("third iteration  ", call, "time:", times(start));
        }, timeout)    
    }, timeout)

    console.log("continuation cod");
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

function addvaluepro() {
    const start = new Date();

    
}

let pro = [1, 2, 3]



let aa = [1,2,3]