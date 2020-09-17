const arr = [1,2]
var varv
console.log(arr)

arr.push(3)
var varv =1
const obj = { //= это присвоение, : это свойство объекта
a:1,
b:2,
c: null,
d:{
dd:1,
cc:2}}

console.log(obj.d.dd)

//делаем проверку
const f1 =""

if(f1){
console.log("f1 exists")
}

if (obj){
console.log("obj exists")
}

const t = obj && obj.f ? obj.f.d:null //проверяет есть ли object (if)
// вместо этой конструкции мы будем использовать проще
///const t = obj.f.d
//console.log(t)

const a = obj.a !=1?3:5

let b // аналог const a = obj.a !=1?3:5
if(obj.a !=1){
    b = 3
    }else
    {
    b= 5
    }
let one = 1 // number
let two = 2
let str = '1'

console.log(one+two)

one = true //true = 1, false = 0, их можно переводить в числа
console.log(one+two)

one = '1'
console.log(one+two)

one = '1' //text

two = true

console.log(one+two)

console.log(one+one)

const student = {
name: 'Иван',
surname: 'Иванов'
}

console.log('Имя" '+ student.name+',Фамилия: '+student.surname)

console.log(`Имя: ${student.name}`)

const t11 = 1
const t2 = 1

if (t11==t2){
console.log('Its equal')
}

const t12 = 1
const t32 = '1'

if (t12===t32){
console.log('Its equal')
}else {
console.log('it isnt equal')
}

//нельзя дублировать конструкции, он ругается, а так все работает

const arr1 = [1,2,3,4,5,6,7]
const obj1 = {
a:'test',
b:'test'
}

const objArray= [ // когда нуно обратиться к индексу
{
a:1,
b:2
},
{
a:4,
b:5
    }
    ]

for (const [i,v] of arr1.entries())
{
console.log(i)
console.log(v)
}

arr1.forEach (element =>{
console.log(element)
})

for (const key in obj1){
console.log(key)
console.log(obj1[key])
}

const arr2 = [1,4,6,3,4,5,9,1,2]

for (const t of arr2){
if(t<4){
console.log(t)
}
}
let arr3 = []
for (const v of arr2){
//if(v<=3) arr3.push(v)

if (v<=3) arr3=[...arr3,v]
} console.log(arr3)

let arr4 = arr2.filter(item => item <=3) //стрелочная функция
console.log(arr4)