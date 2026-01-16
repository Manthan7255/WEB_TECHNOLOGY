let fullName = "Manthan";
fullName = "Aditya" //let is used to declare Variable Many time but store only one value 
console.log(fullName);

const name = "Manthan";
console.log(name); //const allows to store only one permenent value inside the variable 

const Student = {
    name : "Manthan",  // Obj : key
    cgpa : "7.40",
    PRN : "23UAM077",
    isPass : true,
};

console.log(Student.name); // accessing the key value from object
console.log(Student.cgpa);
console.log(Student.PRN);
console.log(Student.isPass);
Student.cgpa = "8.40" // we can change the value of key in const object
console.log(Student.cgpa);
