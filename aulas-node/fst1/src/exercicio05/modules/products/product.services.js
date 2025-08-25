const prisma = require('../db/prisma');
const logger = require('../../shared/logger/logger');

const getAllProducts = async () => {
    try {
        const products = await prisma.product.findMany({
            include: { user: { select: {id: true, nome: true, email: true }}}
        });
        logger.info('Produtos listados com sucesso', { count: products.length });
        return products;
    } catch (error) {
        logger.error('Error ao acessar os produtos', { error: error.message });
        throw error;
    }
};

const getProductById = async (id) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) },
            include: { user: { select: {id: true, nome: true, email: true }}}
        });
        if (!product) {
            logger.warn('Produto não encontrado', { id });
            return null;
        }
        logger.info('Produto encontrado com sucesso.', { id });
        return product;
    } catch (error) {
        logger.error('Error ao buscar o produto', { error: error.message });
        throw error;    
    }
};

const createProduct = async ({ nome, preco, descricao, userId }) => {
    try {
        const product = await prisma.product.create({
            data: {
                name: nome,
                price: preco,
                description: descricao,
            }
        });
        logger.info('Produto criado com sucesso.', {id: product.id, userId});
        return product
    } catch (error) {
        logger.error('Error ao criar um produto', { error: error.message });
        throw error;
    }
};

const deleteProduct = async (id) => {
    try {
        const product = getProductById(id);
        if (!product) {
            return;
        }
        await prisma.product.delete({
            where: { id: parseInt(id) },
        });
        logger.info('Produto deletado com sucesso.', { id });
        return true;
    } catch (error) {
        logger.error('Error ao deletar um produto', { error: error.message });
        throw error;
    }
};

const updateProduct = async (id, { nome, preco, descricao }) => {
    try {
        const updatedProduct = await prisma.product.update({
            where: { id: parseInt(id)},
            data: {
                name: nome,
                price: preco,
                description: descricao,
            }
        });
        logger.info('Atualizar um produto com sucesso.', { id });
        return updateProduct;
    } catch (error) {
        logger.error('Error ao atualizar o produto', { error: error.message });
        throw error;
    }
};

module.exports = {
    updateProduct,
    deleteProduct,
    createProduct,
    getProductById,
    getAllProducts,
}