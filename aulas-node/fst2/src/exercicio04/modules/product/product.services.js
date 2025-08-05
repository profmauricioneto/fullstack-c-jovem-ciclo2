const dataProducts = require('../../config/data.products');
const idProduct = 4;

// recupero todos os produtos
const getAllProducts = () => {
    return dataProducts;
};

// recuperar um produto pelo id
const getProductById = (id) => {
    const product = dataProducts.find((prod) => prod.id === id);
    if (!product) {
        console.error(`produto não encontrado`);
        return;
    }
    return product;
};

// criar um novo produto
const createProduct = (nome, preco, descricao) => {
    dataProducts.push({id: ++idProduct, nome, preco, descricao});
    return true;
};

// deletar um produto pelo id
const deleteProduct = (id) => {
    const productIndex = dataProducts.findIndex((prod) => prod.id === id);
    if (productIndex === -1) {
        console.error(`produto não encontrado!`);
        return;
    }
    dataProducts.splice(productIndex, 1);
};

// atualizar um produto pelo id
const updateProduct = (id, nome, preco, descricao) => {
    const productFound = getProductById(id);
    if (productFound) {
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