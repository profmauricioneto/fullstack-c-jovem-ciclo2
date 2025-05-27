const prompt = require("prompt-sync")();

let nota01 = parseFloat(prompt("Digite a primeira nota: "));
let nota02 = parseFloat(prompt("Digite a segunda nota: "));

let media = (nota01 + nota02) / 2;
console.log("Media do aluno = " + media);

// situacoes: Aprovado (M ⩾ 7), Reprovado (M < 4) e Final (4 ⩽ M < 7)
// if alinhado!
// if (media >= 7.0) {
//     console.log('aprovado!');
// }
// if (media < 4.0) {
//     console.log('reprovado');
// }
// if (media >= 4 && media < 7.0) {
//     console.log('final!');
//     // ...
// }

// if aninhado
// if (media >= 7.0) {
//     console.log('Aprovado!');
// } else {
//     if (media < 4.0) {
//         console.log('Reprovado!');
//     } else {
//         console.log('Final!');
//         let notaFinal = parseFloat(prompt('Digite a nota final: '));
//         let mediaFinal = (media + notaFinal)/2;
//         console.log('Media Final = ' + mediaFinal);

//         if (mediaFinal >= 5.0) {
//             console.log('Aprovado na Final!');
//         } else {
//             console.log('Reprovado na Final!');
//         }
//     }
// }

// if else if
if (media >= 7.0) {
  console.log("Aprovado!");
} else if (media < 4.0) {
  console.log("Reprovado!");
} else {
  console.log("Final!");
  let notaFinal = parseFloat(prompt("Digite a nota final: "));
  let mediaFinal = (media + notaFinal) / 2;
  console.log("Media Final = " + mediaFinal);

  if (mediaFinal >= 5.0) {
    console.log("Aprovado na Final!");
  } else {
    console.log("Reprovado na Final!");
  }
}
