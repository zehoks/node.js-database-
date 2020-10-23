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

///Logistic operation
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
console.log(counter);

/////function
let p = 3;
let t = " hi";
function nai() {
    let i = 5;
    console.log(i+p+t);
    
}
nai();
nai();
nai();
function pas (text) {
    console.log(text+'  771')
}
pas('autobalid');
pas('tanya');

function seti(frap) {
    frap = "////  " + frap;
console.log(frap)
}
let frap = 'gans';
seti(frap);
console.log(frap);

function showpat(text, pr = 'неизвестно') {
    console.log(text + ':::' + pr);
}
showpat('rita');
showpat('rita', 'privet');

function calcsum(a, b) {
    return(
    a + b);
}
let result = calcsum(5, 6);
console.log(result);

//Object+function
let user = new Object();
user = {
    name: 'John',
    surname: 'Smith'
};
console.log(user.name);
user.name = 'Pete';
console.log(user.name);
user.isAdmin = true;
console.log(user.isAdmin);
delete user.name;
console.log(user.name);
///
function makeuser(name, age) {
    return {
        name: name,
        age: age
    };
}
let userk = makeuser('Tom', 25);
console.log(userk.name);
console.log(userk.age);

for (let key in userk) {
    console.log(key);
    console.log(userk[key]);
}
let message = "Hello!";
let phrase = message; //две независимые переменные, каждая из которых хранит строку "Hello!".

let apple = {
    quality:'normal'
};
let basket = apple;// копируется ссылка
console.log(apple.quality);
basket.quality = 'bad';
console.log(basket);
console.log(basket.quality);
let clone = {};
for (let key in apple) {
    clone[key] = apple[key];
}//клонирование свйоств объекта apple
clone.quality = 'good'; 
console.log(clone.quality);
let clone2 = Object.assign({}, apple);
console.log(clone2.quality);//клонирование но через функцию и ответ такой, так как basket по ссылке изменил свойство

//Masive(array)
let car = ['mazda', 'BMW', 'opel'];
console.log(car[1]);
car[2] = 'honda';
car[3] = 'toyota';
console.log(car);
console.log(car.length);

let arr = [ 'Яблоко', { name: 'Джон' }, true, function() { console.log("привет"); } ];
console.log(arr[1].name); // получить элемент с индексом 1 (объект) и затем показать его свойство
arr[3](); // получить элемент с индексом 3 (функция) и выполнить её
///pop,unshift,push,shift
car.pop();
console.log(car);
car.push('lada');
console.log(car);
car.shift();
console.log(car);
car.unshift('skoda');
console.log(car);
car.push('hyundai', 'kia');
console.log(car);
let brend = car;
brend.unshift("mercedes");
console.log(brend);
console.log(car == brend);
for (let i = 0; i < brend.length; i++){
    console.log(brend[i]);
}//древний вариант
for (let brends of brend) {
    console.log(brends);
}//короткий вариант(но не дает доступ к текущему номеру)
brend.length = 0;//очистка массива
console.log(brend);
brend.push('mazda');
console.log(brend);
console.log(brend.length);

let arrr = [1, 2, 3];
console.log(arrr);
console.log(String(arrr) === '1,2,3');
console.log([] + 1)
console.log([1] + 1)
console.log([1, 2] + 1)
//Когда бинарный оператор плюс "+" добавляет что-либо к строке, он тоже преобразует это в строку

//несколько записей функции как метода
let people = {
    nickname: 'Dasha',
    resource: 'time',
    age: 25
    
}
people.hey = function () {
    console.log('hey '+this.nickname)
}
people.hey()


function hii() {
    console.log('hii')
}
people.hii = hii
people.hii()


isera = {
    sayprivet: function () {
        console.log('privet')
    }
}
isera.sayprivet();

iserka = {
    bay() {
        console.log('bay')
    }
}
iserka.bay();

let diman = {
    age: 22
}
let misha = {
    age:74
}

function sayage() {
    console.log('mne '+ this.age)
}

diman.f = sayage;
diman.f();

misha.f = sayage;
misha.f();

//немного ссылочных функций
//let func = (arg1, arg2, ...argN) => expression
//обычная функция 
//let func = function(arg1, arg2, ...argN) {
//   return expression;
// };

function sum(a,b) {
    return a + b;
}
console.log(sum(5, 7))

let difference = function (a, b) {
    return a - b
};
console.log(difference(19, 2))

let multiplier = (a, b) => a * b
console.log(multiplier(3, 5))

let hand = () => console.log('mawet rykoi')
hand();

let calculator = {
    read(a,b) {
    return a,b 
    },
    summ(a,b) {
    return a+b 
    },
    mul(a, b) {
        return a*b
    }
};
console.log(calculator.read(1,2));
console.log( calculator.summ(5,6) );
console.log( calculator.mul(4,5) );

////Функция-конструктор
function Userp(names) {
    //this = {} (неявно) 
    this.names = names
    this.isAdmin = false
    //return this (неявно)
}

let peoplep = new Userp('Vasya')
//let user = {
//   name: "Вася",
//   isAdmin: false
// };

console.log(peoplep.names)
console.log(peoplep.isAdmin)

//Возврат значения из конструктора return
function BigUser() {
    this.name = 'Gleb'
    return { name: 'Godzilla' }
}
console.log( new BigUser().name )

function SmallUser() {
    this.name = 'Gleb'
    return
}
console.log(new SmallUser().name)
//Обычно у конструкторов отсутствует return. В данном блоке мы упомянули особое поведение с возвращаемыми объектами



