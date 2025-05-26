const prompt = require("prompt-sync")();

let nota01 = parseFloat(prompt("Nota 01: "));
let nota02 = parseFloat(prompt("Nota 02: "));

let media = (nota01 + nota02) / 2;
console.log("Media  = " + media);
//  Aprovado (M ⩾ 7), Reprovado (M < 4) e Final (4 ⩽ M < 7). Se o aluno ficar de Final, entre com a nota da prova Final e mostre a média e o resultado final.

// decisao alinhado!
// if (media >= 7.0) {
//     console.log('Aprovado!');
// }
// if (media < 4.0) {
//     console.log('Reprovado!');
// }
// if (media >= 4.0 && media < 7.0) {
//     console.log('Final');
//     // ...
// }

// decisao aninhada
// if (media >= 7.0) {
//   console.log("Aprovado!");
// } else {
//   if (media < 4.0) {
//     console.log("Reprovado!");
//   } else {
//     console.log("Final!");
//     let notaFinal = parseFloat(prompt("Nota Final: "));
//     let mediaFinal = (notaFinal + media) / 2;
//     console.log("Media Final = " + mediaFinal);

//     if (mediaFinal >= 5.0) {
//       console.log("Aprovado na Final");
//     } else {
//       console.log("Reprovado na Final");
//     }
//   }
// }

// if - else - if
if (media >= 7.0) {
  console.log("Aprovado!");
} else if (media < 4.0) {
  console.log("Reprovado!");
} else {
  console.log("Final!");
  let notaFinal = parseFloat(prompt("Nota Final: "));
  let mediaFinal = (notaFinal + media) / 2;
  console.log("Media Final = " + mediaFinal);

  if (mediaFinal >= 5.0) {
    console.log("Aprovado na Final");
  } else {
    console.log("Reprovado na Final");
  }
}
