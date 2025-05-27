const prompt = require('prompt-sync')();

let valor = parseInt(prompt('Digite o valor da tabuada desejada: '));

// for (let i = 1; i <= 10; i++) {
//     console.log(valor + ' * ' + i + ' = ' + valor*i);
// }

let j = 1;
while(j <= 10) {
    console.log(valor + ' * ' + j + ' = ' + valor*j);
    j++;
}