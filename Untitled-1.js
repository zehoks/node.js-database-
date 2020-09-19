console.log(2 + 2 + '1' ); // будет "41", а не "221"
console.log( 6 - '2' ); // 4, '2' приводится к числу
console.log( '6' / '2' )
// Преобразует не числа в числа
console.log( +true ); // 1
console.log( +"" );   // 0
let apples = "2";
let oranges = "3";
// оба операнда предварительно преобразованы в числа
console.log( +apples + +oranges ); 

let a = 1;
let b = 2;
let c = 3 - (a = b + 1);
console.log( a ); 
console.log( c ); 
let n = 2;
n += 5; // теперь n = 7 (работает как n = n + 5)
n *= 2; // теперь n = 14 (работает как n = n * 2)

console.log( n ); 
let counter = 2;
counter++;
let counterr = 1;
console.log( 2 * ++counterr );
for (a = 1, b = 3, c = a * b; a < 10; a++) {
    
}
console.log(""); 
console.log("" + 1 + 0);
console.log( null > 0 );  // (1) false
console.log( null == 0 ); // (2) false
console.log( null >= 0 ); // (3) true