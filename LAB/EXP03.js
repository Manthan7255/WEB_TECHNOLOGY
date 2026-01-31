//function declaration
function addTwoNumbers(a, b){
    return a + b;   
    console.log("Inside addTwoNumbers function"); //it does not execute because return statement exits the function
}
//call function
let sum = addTwoNumbers(5, 10);
console.log(`Sum: ${sum}`); // Sum: 15

function loginUser(username){
    return `Welcome ${username}`;
}
// console.log(login_user);//when string is empty then it returns undefined

function random(...no1){
     return no1;       //rest operator is used 
}

console.log(random(200,300,400));  //to print all three values we have to 

//calling object in function
const object = {name:"Manthan", arr:[1,2,3]};
function callobj(any_object){
    console.log(any_object.name);
    console.log(any_object.arr);
}
callobj(object);

const arr = [100,200,300];

function handleobj(any){
    return any[2];
}
console.log(handleobj(arr));

// const addTwoNum = 
//      return num1+num2;


function coffee(){
    username="Manthan"
    console.log(this);
}

//call function
coffee();

const arrowfun = () => {
    username="Manthan"
    console.log(this);
}
arrowfun();

//activity 
//what is arrow function
//why we use this 

//write a code for arrow function with two exmaple
const multiply = (x, y) => x * y;
console.log(multiply(5, 10)); // 50
//example 2
const greet = name => `Hello, ${name}!`;
console.log(greet("Manthan")); // Hello, Manthan!

//write code for switch case in js
let day = 3;
let dayName;
switch(day) {
    case 1:
        dayName = "Monday";
        break;
    case 2:
        dayName = "Tuesday";
        break;
    case 3:
        dayName = "Wednesday";
        break;
    case 4:
        dayName = "Thursday";
        break;
    case 5:
        dayName = "Friday";
        break;
    case 6:
        dayName = "Saturday";
        break;
    case 7:
        dayName = "Sunday";
        break;
    default:
        dayName = "Invalid day";
}
console.log(`Day ${day} is ${dayName}`); // Day 3 is Wednesday
//how to use truthy and falsy value in js with example
let value = 2;
if (value) {
    console.log(`${value} is truthy`);
}
else {
    console.log(`${value} is falsy`);
}
//how to use ternary operator in js
let age = 20;
let eligibility = (age >= 18) ? "Eligible to vote" : "Not eligible to vote";
console.log(eligibility);

//write a code for how to use loops in array

//while,do while,for etc with ex
let a = [10, 20, 30, 40, 50];
//for loop
for (let i = 0; i < a.length; i++) {
    console.log(`Element at index ${i} is ${a[i]}`);
}
//while loop
let j = 0;
while (j < a.length) {
    console.log(`Element at index ${j} is ${a[j]}`);
    j++;
}
//do while loop
let k = 0;
do {
    console.log(`Element at index ${k} is ${a[k]}`);
    k++;
}
while (k < a.length);

//for in loop
for (let index in a) {
    console.log(`Element at index ${index} is ${a[index]}`);
}
//for of loop
for (let element of a) {
    console.log(`Element is ${element}`);
}
//diff between for in and for of loop
//for in loop iterates over the indices of the array
//for of loop iterates over the values of the array

//how to use map and filter fun in js
let numbers = [1, 2, 3, 4, 5];
//map function to double each element
let doubled = numbers.map(num => num * 2);
console.log(doubled);
//filter function to get even numbers
let evens = numbers.filter(num => num % 2 === 0);
console.log(evens);

