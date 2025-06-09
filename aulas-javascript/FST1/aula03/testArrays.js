let idades = [12, 24, 16, 18, 20, 56, 32, 11];

let adultos = idades.filter((idade) => {
    return idade >= 18;
});

// console.log(adultos);
// console.log(idades);

let pares = idades.map((valor) => {
    return valor*11;
}).filter((item) => {
    return item % 2 === 0;
});

console.log(pares);

let produtos = [
    {nome: 'banana', quantidade: 4},
    {nome: 'sapoti', quantidade: 5},
    {nome: 'ata', quantidade: 7},
    {nome: 'morango', quantidade: 2},
    {nome: 'maracuja', quantidade: 1},
    {nome: 'pitomba', quantidade: 4},
];

let frutaEscolhida = produtos.find((item) => {
    return item.quantidade === 'pitomba';
});

console.log(frutaEscolhida);

