let professor = {};
professor.nome = 'Mauricio Neto';
console.log(professor);

professor.idade = 35;
console.log(professor);

professor.disciplinas = ['lp1', 'lp2', 'datavis', 'daf-web'];
console.log(professor);

for (att in professor) {
    console.log(att + ' = ' + professor[att]);
}

let arranjo = [];
console.log(typeof arranjo);

let frutas = ['banana', 'tomate', 'maça', 'uva', 'pitomba'];
// for(let i = 0; i < frutas.length; i++) {
//     console.log(frutas[i]);
// }

// for (let fruta of frutas) {
//     console.log(fruta);
// }

frutas.forEach((fruta) => {
    console.log("Frutas atuais: " + fruta);
});