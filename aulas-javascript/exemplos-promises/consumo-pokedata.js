const pokedata = async (pokemonName) => {
    let response;
    try {
        response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    } catch (error) {
        console.log('An wild error occurs: ' + error);
    }
    if (response.statusText === 'Not Found') {
        return `error. Pokemon não encontrado.`;
    }
    const objPokemon = await response.json();
    return objPokemon;
}


pokedata('qwerty').then((result) => {
    console.log(result);
})
.catch((err) => {
    console.error(err);
});