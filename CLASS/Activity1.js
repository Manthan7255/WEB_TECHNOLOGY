// 1. String → Number
let M = "72";
let N = Number(M);
console.log(N, typeof N);

// 2. Number → String
let P = 2;
let Q = String(P);
console.log(Q, typeof Q);

// 3. Boolean → Number
let A = true;
let B = Number(A);
console.log(B, typeof B);   // true -> 1

// 4. Number → Boolean
let C = 0;
let D = Boolean(C);
console.log(D, typeof D);   // 0 -> false

// 5. Undefined → String
let E;
let F = String(E);
console.log(F, typeof F);   // "undefined"

// 6. Null → Number
let G = null;
let H = Number(G);
console.log(H, typeof H);   // null -> 0 (dangerous)

// 7. Number → BigInt
let I = 123;
let J = BigInt(I);
console.log(J, typeof J);

// 8. Symbol → String (ONLY explicit)
let K = Symbol("id");
let L = K.toString();
console.log(L, typeof L);

// 9. Object → String
let O = { a: 1 };
let R = String(O);
console.log(R, typeof R);
