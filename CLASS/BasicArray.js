let myarr = [0, 1, 2, 3, 4];
console.log(myarr);

let myarr1 = [0,1,2,3,"MMM"];

const myarr2 = new Array(0,1,2,3,4);
console.log(myarr2);

console.log (myarr[1]);

//Array Methods
myarr.push(5); //adds 5 at the end
console.log(myarr);

myarr.pop(); //removes last element
console.log(myarr);

myarr.unshift(-1); //adds -1 at the beginning
console.log(myarr);

myarr.shift(); //removes first element
console.log(myarr);

console.log(myarr.includes); //checks if element is present or not
console.log(myarr.indexOf(3)); //gives index of element

console.log(typeof myarr); //object

const newArr = myarr.join(); //slices array from index 1 to 3
console.log(newArr);//"0,1,2,3,4"

console.log(typeof newArr);//string
