const { PrismaClient } = require('../../generated/prisma');
const logger = require('../../shared/logger');

const prisma = new PrismaClient();

exports.createProduct = async ({ nome, preco, descricao, userId }) => {
    try {
        const product = await prisma.product.create({
            data: {
                nome,
                preco,
                descricao,
                userId
            }
        });
        logger.info('Produto criado com sucesso', { productId: product.id, userId });
        return product;
    } catch (error) {
        logger.error('Erro ao criar produto', { error: error.message });
        throw error;
    }
};

exports.getAllProducts = async () => {
    try {
        const products = await prisma.product.findMany({
            include: { user: { select: { id: true, nome: true, email: true } } }
        });
        logger.info('Produtos listados com sucesso', { count: products.length });
        return products;
    } catch (error) {
        logger.error('Erro ao listar produtos', { error: error.message });
        throw error;
    }
};

exports.getProductById = async (id) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: Number(id) },
            include: { user: { select: { id: true, nome: true, email: true } } }
        });
        if (!product) {
            logger.warn('Produto não encontrado', { productId: id });
            return null;
        }
        logger.info('Produto encontrado', { productId: id });
        return product;
    } catch (error) {
        logger.error('Erro ao buscar produto', { error: error.message });
        throw error;
    }
};

exports.updateProduct = async (id, { nome, preco, descricao }) => {
    try {
        const updatedProduct = await prisma.product.update({
            where: { id: Number(id) },
            data: {
                nome,
                preco,
                descricao
            }
        });
        logger.info('Produto atualizado com sucesso', { productId: id });
        return updatedProduct;
    } catch (error) {
        logger.error('Erro ao atualizar produto', { error: error.message });
        throw error;
    }
};

exports.deleteProduct = async (id) => {
    try {
        await prisma.product.delete({
            where: { id: Number(id) }
        });
        logger.info('Produto deletado com sucesso', { productId: id });
        return true;
    } catch (error) {
        logger.error('Erro ao deletar produto', { error: error.message });
        return false;
    }
};