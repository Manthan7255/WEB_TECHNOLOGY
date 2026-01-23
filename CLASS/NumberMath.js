let myNumber = new Number(100);
console.log(myNumber);
console.log("myNumber.toFixed(100)", myNumber.toFixed(2));
console.log("myNumber.toString(): ", myNumber.toString());

//when we build e commerce website and precision value are too long then we use toFixed() method to limit the decimal points
let h = 1000000
console.log(h.toLocaleString('en-IN')); //1,00,00,000
console.log(h.toLocaleString('en-US')); //10,000,000

// console.log(math.Abs(-5)); //5
console.log(Math.abs(-4)); //Absolute Value is positive when we take negative value

console.log(Math.round(4.2)); //5
console.log(Math.ceil(4.7)); //5 top value
console.log(Math.floor(4.7)); //4 lowest value
console.log(Math.min(1,2,3,-4,5)); //-4
console.log(Math.max(1,2,3,4,5)); //5
console.log(Math.random()); //gives random value between 0 to 1



