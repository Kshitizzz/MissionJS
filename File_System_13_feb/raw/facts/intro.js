console.log("BhauBhau");


let varName; // Intialize
// Dynamically typed language so dont need to define var type

varName = 'Chal be'; // Declaration

console.log("I am", varName);

// Primitive Data Types : number, boolena, string, null, undefined, bigint, object, symbol

// JS created in 10 days by Brandon Eich, for the NetScape Browser.
// Syntax similar to JAVA

// For example: a program to print prime number
let number = 32;
let flag = true;

for(let i = 2; i * i <= number; i++){
    if(number % i == 0){
        flag = false;
        break;
    }
}
if(flag == true){
    console.log("Bhai ye number prime hai!")
} else {
    console.log("Ni hai prime bhai!");
}

// >>  Learn to take input in JAVASCRIPT << 