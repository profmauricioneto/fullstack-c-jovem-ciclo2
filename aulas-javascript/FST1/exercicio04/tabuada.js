const prompt = require('prompt-sync')();

let valor = parseInt(prompt('Digite o valor referente a tabuada: '));

for(let i = 0; i <= 10; i++) {
    console.log(valor + ' * ' + i + ' = ' + valor*i);
}

let j = 0;
while(j <= 10) {
    console.log(valor + ' * ' + j + ' = ' + valor*j);
    j++;
}