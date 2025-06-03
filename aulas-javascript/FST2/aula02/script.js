// let titulo = document.getElementById('titulo');
// console.log(titulo);

// let novoTitulo = prompt('Digite o novo título');
// titulo.textContent = novoTitulo;

// const myDivs = document.getElementsByTagName('div');
// console.log(myDivs);

const contents = document.getElementsByClassName('content');
console.log(contents);

for (let i = 0; i < contents.length; i++) {
    if (i % 2 === 0) {
        contents[i].style.backgroundColor = 'cyan';
        contents[i].style.fontWeight = 'bold';
    }
}