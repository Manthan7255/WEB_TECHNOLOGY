let score = "22";
let ScoreForBoll = true;
let ScoreForNull = null;
let undefinedVar = undefined;

console.log(typeof score);
console.log(typeof ScoreForBoll);
console.log(typeof ScoreForNull);
console.log(typeof undefinedVar);

let M = "72";
let N= Number(M);
console.log(typeof N); 

let P = 2;
let Q = String(P);
console.log(typeof Q);

let S = "23";
let T = Number(S);
console.log(typeof T);


/*Activity 1:
All Conversion Operations
let s="a";*/

//if number is in string then it does not convert to number and returns NaN.

//Arithmetic Operations
let a = 10;
let b = 5;
console.log(a - b); 
console.log(a + b); 
console.log(a * b); 
console.log(a / b); 
console.log(a % b); 
console.log(a ** b); 
console.log(++b);
console.log(--b);
console.log(b++); 
console.log(b--); 
console.log(b);

let str1 = "Hello";
let str2 = "MANTHAN";
console.log(str1 + str2);   

console.log("1"+2);
console.log(1+"2");
console.log("1"+2+2);
console.log(1+3+"2");
console.log((3+4)*5%3);

//JS only automATICALL cONVERTS STRING TO NUMBER IN ARITHMETIC OPERATIONS(except + operator)
