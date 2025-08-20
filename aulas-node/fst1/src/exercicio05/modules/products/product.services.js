const dataProducts = require('../../config/data.product');
let idProduct = 4;

const getAllProducts = () => {
    return dataProducts;
};

const getProductById = (id) => {
    const product = dataProducts.find((prod) => prod.id === id);
    if (!product) {
        console.log(`Produto não encontrado!`);
        return;
    }
    return product;
};

const createProduct = (nome, preco, descricao) => {
    dataProducts.push({id: ++idProduct, nome, preco, descricao});
    return true;
};

const deleteProduct = (id) => {
    const indexProduct = dataProducts.findIndex((prod) => prod.id === id);
    if (indexProduct === -1) {
        console.log(`Produto não encontrado.`);
        return;
    }
    dataProducts.splice(indexProduct, 1);
};

const updateProduct = (id, nome, preco, descricao) => {
    const productFound = dataProducts.find((prod) => prod.id === id);
    if (!productFound) {
        console.log(`Produto não encontrado.`);
        return;
    } else {
        productFound.nome = nome || productFound.nome;
        productFound.preco = preco || productFound.preco;
        productFound.descricao = descricao || productFound.descricao;
    }
};

module.exports = {
    updateProduct,
    deleteProduct,
    createProduct,
    getProductById,
    getAllProducts,
}