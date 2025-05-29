// let titulo = document.getElementById('titulo');
// console.log(titulo);

// let novoTitulo = prompt('Digite o novo título');
// titulo.textContent = novoTitulo;

const myDivs = document.getElementsByTagName('div');
console.log(myDivs);

for (let i = 0; i < myDivs.length; i++) {
    if (i % 2 === 0) {
        myDivs[i].style.backgroundColor = 'cyan';
        myDivs[i].style.fontWeight = 'bold';

    }
}