// const titulo = document.getElementById('title-page');
// console.log(titulo);

// let novoTitulo = prompt('Digite novo titulo');

// titulo.textContent = novoTitulo;


const divContents = document.getElementsByClassName('card');

console.log(divContents);

for(let i = 0; i < divContents.length; i++) {
    if (i % 2 === 0) {
        divContents[i].style.backgroundColor = 'cyan';
        divContents[i].style.fontWeight = 'bold';
    }
}
