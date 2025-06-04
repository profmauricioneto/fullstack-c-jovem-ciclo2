// função nomeada
function somarValores(a, b) {
    return a + b;
}

let resultado = somarValores(3, 5);
console.log(resultado);

// função anonima
let somarValoresAnonimo = function(a, b) {
    return a + b;
}

resultado = somarValoresAnonimo(10, 20);
console.log(resultado);

// função arrow
let somarValoresArrow = (a, b) => {
    let total = a + b;
    return total;
}

resultado = somarValoresArrow(20, 30);
console.log(resultado);

let professor = {};
professor.nome = 'Mauricio';
console.log(professor);
professor.idade = 35;
console.log(professor);

for (attr in professor) {
    console.log(attr + ' = ' + professor[attr])
}

professor.disciplinas = ['poo', 'lp1', 'lp2', 'lm1', 'datavis'];
console.log(professor);

let frutas = ['banana', 'maça', 'uva', 'pitomba'];
// for (let i = 0; i < frutas.length; i++) {
//     console.log(frutas[i]);
// }

for (let fruta of frutas) {
    console.log(fruta);
}
