// funcao nomeada
function somarValores (...args) {
    let soma = 0;
    for (let i = 0; i < args.length; i++) {
        soma += args[i];
    }
    return soma;
}
console.log(somarValores(4, 5, 5));

// funcao anonima
let somarValoresAnonima = function(...args) {
    let soma = 0;
    for (let i = 0; i < args.length; i++) {
        soma += args[i];
    }
    return soma;
}
console.log(somarValoresAnonima(5, 6, 7));

// funcao arrow
let somarValoresArrow = (...args) => {
    let soma = 0;
    for (let i = 0; i < args.length; i++) {
        soma += args[i];
    }
    return soma;
}
console.log(somarValoresArrow(5, 6, 8));
