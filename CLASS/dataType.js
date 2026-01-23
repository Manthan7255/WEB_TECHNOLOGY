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


//Memory :
// There are two types of memory in JavaScript:
// 1. Stack Memory: Used for static memory allocation and contains primitive data types and references to objects.
// 2. Heap Memory: Used for dynamic memory allocation and stores objects and functions.

//e.g of Stack Memory
let myYoutubeName = "MMM";
let NewYoutubeName = myYoutubeName;
NewYoutubeName = "Manthan MMM";
console.log(myYoutubeName);
console.log(NewYoutubeName);

//it does not change the value of myYoutubeName because primitive data types are stored in stack memory and each variable has its own copy of the value.
//primitive data types store in stack when we assign a variable to another variable it creates a copy of the value.so changing one doesnt affect another.

//e.g of Heap Memory
let myobject = { name: "MMM",
    age: 22,
    id: 123
 };

 let myobject2 = myobject;
 myobject.id = 25;

 console.log(myobject.id);
 console.log(myobject2.id);

 //objects are stored in heap memory.when we assign an object to another variable it copies the reference not the actual object.so changing one affects another.
 
 