let idades = [33, 13, 15, 19, 54, 22, 12];

let adultos = idades.filter((idade) => {
    return idade >= 18;
});

console.log(adultos);

let pares = idades.map((item) => {
    return item * 11;
}).filter((valorPar) => {
    return valorPar % 2 === 0;
});

console.log(pares);

let frutas = [
    {nome: 'banana', preco: 4.99},
    {nome: 'ameixa', preco: 10},
    {nome: 'carambola', preco: 15},
    {nome: 'piqui', preco: 30},
    {nome: 'kiwi', preco: 2},
    {nome: 'pitomba', preco: 40},
];

let produtoEncontrado = frutas.find((item) => {
    return item.nome === 'kiwi';
});

console.log(produtoEncontrado);

let niveis = {
    alto: 1,
    medio: 2,
    basico: 3
}
