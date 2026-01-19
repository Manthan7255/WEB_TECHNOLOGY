// 1. Number
let num = 10;

// 2. String
let str = "JavaScript";

// 3. Boolean
let isTrue = false;

// 4. Undefined
let a;

// 5. Null
let b = null;

// 6. BigInt
let big = 9007199254740991n;

// 7. Symbol
let sym = Symbol("123");

// 8. Object
let obj = { name: "Manthan" };

let id = "123";
console.log(id===a)


console.log(typeof num);        // "number"
console.log(typeof str);        // "string"
console.log(typeof isTrue);     // "boolean"
console.log(typeof a);          // "undefined"
console.log(typeof b);          // "object"
console.log(typeof big);        // "bigint"
console.log(typeof sym);        // "symbol"
console.log(typeof obj);        // "object"


//Array
const arr = [1, 2, 3, 4, 5];
console.log(typeof arr);

const myobj = { name: "Manthan", age: 23};
console.log(typeof myobj); // object
console.log(myobj.name); // Manthan
console.log(myobj.age); // 23

//Function
function myFunction() {
    return "Hello, World!";
}
console.log(typeof myFunction); // function
console.log(myFunction()); // Hello, World!

let func =function myname(){
    return "Manthan";
}
console.log(typeof func); // function
console.log(func()); // Manthan

