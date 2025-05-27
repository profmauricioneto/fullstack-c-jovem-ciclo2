let vetor = [1,2,3,4,5,6,7,8,9,10];

for(let i = 0; i < vetor.length; i++) {
    let resultado = (vetor[i] % 2 === 0) ? 'valor = ' + vetor[i] + ' é par' : 'valor = ' + vetor[i] + ' é ímpar';
    console.log(resultado);
}