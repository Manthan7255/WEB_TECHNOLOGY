//Declare Array,Function and Object
//Declare Array,Function and Object with example
//Array
const arr = [1, 2, 3, 4, 5];
console.log(typeof arr);

//Object
const myobj = { name: "Manthan", age: 23};
console.log(typeof myobj); // object
console.log(myobj.name); // Manthan
console.log(myobj.age); // 23

//Function
function myFunction() {
    return "Hello, World!";
}

console.log(typeof myFunction); // function
console.log(myFunction())

//Activity 02
//Reverse a number
let num = 12345;
let reversedNum = 0;
while (num > 0) {
    let digit = num % 10;
    reversedNum = reversedNum * 10 + digit;
    num = Math.floor(num / 10);
}


//check palindrome or not
if (originalNum === reversedNum) {
    console.log(`${originalNum} is a palindrome.`);
} else {
    console.log(`${originalNum} is not a palindrome.`);
}
//fibbonacci series
let n1 = 0, n2 = 1, nextTerm;
let terms = 10; // Number of terms to display
console.log("Fibonacci Series:");
for (let i = 1; i <= terms; i++) {
    console.log(n1);
    nextTerm = n1 + n2;
    n1 = n2;
    n2 = nextTerm;
}
//Find largest element in array
const array = [10, 5, 8, 20, 3];
let largest = array[0];
for (let i = 1; i < array.length; i++) {
    if (array[i] > largest) {
        largest = array[i];
    }
}
console.log(`Largest element in array is ${largest}`);
//remove duplicates from array
const arrWithDuplicates = [1, 2, 2, 3, 4, 4, 5];
const uniqueArr = [...new Set(arrWithDuplicates)];
console.log(`Array with duplicates removed: ${uniqueArr}`);

//find missing number in 
//an array of 1 to n
function findMissingNumber(arr, n) {
    let total = (n * (n + 1)) / 2;
    let sum = arr.reduce((acc, val) => acc + val, 0);
    return total - sum;
}

//String

//Reverse string
function reverseString(str) {
    return str.split("").reverse().join("");
}
console.log(reverseString("Manthan")); // nahtnaM

//Vowel count
function countVowels(str) {
    const vowels = "aeiouAEIOU";
    let count = 0;
    for (let char of str) {
        if (vowels.includes(char)) {
            count++;
        }
    }
    return count;
}
console.log(countVowels("Manthan")); // 2
//Check palindrome or not
function isPalindrome(str) {
    const reversedStr = str.split("").reverse().join("");
    return str === reversedStr;
}
console.log(isPalindrome("madam")); // true
console.log(isPalindrome("hello")); // false


//Check prime no
function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}
console.log(isPrime(7)); // true
console.log(isPrime(10)); // false
//Factorial of 
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}
console.log(factorial(5)); // 120


//Function to check whether the no is even or odd
function checkEvenOdd(number){
    if(number % 2 === 0){
        return "Even";
    } else {
        return "Odd";
    }
}
checkEvenOdd(4); // Even
checkEvenOdd(7); // Odd

//function defination
function checkEvenOdd(number){
    if(number % 2 === 0){
        return "Even";
    } else {
        return "Odd";
    }
}


