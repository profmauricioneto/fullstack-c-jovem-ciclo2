const prompt = require('prompt-sync')();

let valor = parseInt(prompt('Digite um valor inteiro: '));

// if (valor % 2 === 0) {
//     console.log('valor = ' + valor + ' é par');
// } else {
//     console.log('valor = ' + valor + ' é ímpar');
// }

//  operador ternário!
// (condicao) ? caso verdade : caso falso;
let resultado = (valor % 2 === 0) ? 'valor = ' + valor + ' é par' : 'valor = ' + valor + ' é ímpar';
console.log(resultado);
