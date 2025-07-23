const products = require('../../config/data.products');
let productsId = 6;

const createProduct = (nome, preco, descricao) => {
    products.push({id: productsId, nome, preco, descricao});
    productsId++;
    return true;
};

const getAllProducts = () => {
    return products;
};

const getProductById = (id) => {
    const product = products.find((prod) => prod.id === id);
    return product;
};

const updateProduct = (id, nome, preco, descricao) => {
    const product = getProductById(id);
    if (product) {
        product.nome = nome || product.nome
        product.preco = preco || product.preco
        product.descricao = descricao || product.descricao
    }
};

const deleteProduct = (id) => {
    const indexId = products.findIndex((prod) => prod.id === id);
    products.splice(indexId, 1);
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};