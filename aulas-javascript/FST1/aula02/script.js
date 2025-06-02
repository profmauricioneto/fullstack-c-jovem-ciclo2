// const titulo = document.getElementById('title-page');
// console.log(titulo);

// let novoTitulo = prompt('Digite novo titulo');

// titulo.textContent = novoTitulo;


// const divContents = document.getElementsByClassName('card');

// console.log(divContents);

// for(let i = 0; i < divContents.length; i++) {
//     if (i % 2 === 0) {
//         divContents[i].style.backgroundColor = 'cyan';
//         divContents[i].style.fontWeight = 'bold';
//     }
// }

// const p = document.querySelector('p.card');
// console.log(p);
// let newContent = prompt('Novo Conteudo de P');
// p.textContent = newContent;

const cards = document.querySelectorAll('.card');
console.log(cards);

for (let i = 0; i < cards.length; i++) {
    cards[i].textContent = 'Mudando o conteúdo';
    cards[i].style.backgroundColor = '#ccc';
}