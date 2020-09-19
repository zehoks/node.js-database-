let message;
message = 'Hello!';

let admin;
let name = 'ДЖОН';
admin = name;
console.log(admin);
console.log(`привет, ${admin}, ${4+1}`)
let nameFieldChecked = true; // да, поле отмечено
let ageFieldChecked = false;// нет, поле не отмечено
let isGreater = 4 > 1;
console.log(isGreater);
let age = null;
age = 3;
age = 'taverna';
console.log(age);
let tar;
console.log(tar);
tar = 5;
tar = undefined;
console.log(tar);
// undefined – для проверок, была ли переменная назначена.
tar = null;
console.log(tar);
console.log(typeof (1)) ;
console.log(typeof (null)) ;
console.log(typeof (10n)) ;
console.log(typeof (Math)) ;
console.log(typeof (true)) ;

let stroka = true;
console.log(typeof (stroka));
stroka = 'tak';
console.log(typeof(stroka));
console.log(stroka);
stroka = 5;
stroka = false;
stroka = String(stroka);
console.log(typeof(stroka));
console.log(stroka);
stroka = 4;
stroka = BigInt(stroka);
console.log(typeof(stroka));
console.log(stroka);
stroka = String(stroka);
console.log(typeof(stroka));
console.log(stroka);
stroka = Number(stroka);
console.log(typeof(stroka));
console.log(stroka);

console.log("4"*"6");
console.log("4"/"6");
console.log("4"-"6");
console.log("4"+"6");
console.log(false/true);
let aage = Number("");
console.log(aage);
console.log( Number("   123   ") ); // 123
console.log( Number("123z") );      // NaN (ошибка чтения числа на месте символа "z")
console.log( Number(true) );        // 1
console.log( Number(false) ); 
console.log( Boolean(1) ); 
console.log( Boolean(0) ); 
console.log( Boolean("Привет!") );
console.log( Boolean("") ); 
console.log( Boolean("0") );
console.log( Boolean(" ") ); 

