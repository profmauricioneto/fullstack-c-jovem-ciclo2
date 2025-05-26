let valores = [1,2,3,4,5,6,7,8,9,10];

for(let i = 0; i < valores.length; i++) {
    if (valores[i] % 2 === 0) {
        console.log('valor: ' + valores[i] + ' é par.'); 
    } else {
        console.log('valor: ' + valores[i] + ' é ímpar.'); 
    }
}

let j = 0;
while (j < valores.length) {
        if (valores[j] % 2 === 0) {
        console.log('valor: ' + valores[j] + ' é par.'); 
    } else {
        console.log('valor: ' + valores[j] + ' é ímpar.'); 
    }
    j++;
}