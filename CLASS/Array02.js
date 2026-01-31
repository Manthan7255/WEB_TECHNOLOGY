const superheroes = ["Ironman","Superman","Krish"];

let a = ["dhoni","Virat","Rohit"];

superheroes.push("Spiderman"); //adds element at the end
console.log(superheroes);
console.log(superheroes[3]);

console.log(superheroes[2][2]); 

superheroes.concat(2); //does not change the original array
console.log(superheroes); 

const anotherArray = [1,2,3,[4,5,6],7,[6,7,[4,5]]];
const real_anotherArray = anotherArray.flat(Infinity); 
console.log(real_anotherArray);

const arr2 = anotherArray.flat(Infinity);
console.log(arr2);

const arr3 = anotherArray.flat(1);//flat is used to remove nested arrays
console.log(arr3);

console.log(Array.isArray("Manthan")); //false it is used to data scripting 

console.log(Array.from("Manthan")); //['M','a','n','t','h','a','n'] converts string to array

console.log(Array.from({name:"Manthan"})); //gives empty array as object is not convertible to array

let score1 = 100;
let score2 = 200;
let score3 = 300;

console.log(Array.of(score1,score2,score3)); //[100,200,300] creates array from the given elements
