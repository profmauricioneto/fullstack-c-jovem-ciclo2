const prisma = require("../db/prisma");
const logger = require("../../shared/logger/logger");

// recuperar todos os produtos
const getAllProducts = async () => {
  try {
    const products = await prisma.produto.findMany({
      include: { user: { select: { id: true, nome: true, email: true } } },
    });
    logger.info("Produtos acessados com sucesso.", {
      count: products.push.length,
    });
    return products;
  } catch (error) {
    logger.error("Erro ao acessar os produtos.", {
      error: error.message,
    });
    throw error;
  }
};

// recuperar um produto pelo id
const getProductById = async (id) => {
  try {
    const product = await prisma.produto.findUnique({
      where: { id: parseInt(id) },
      include: { user: { select: { id: true, nome: true, email: true } } },
    });
    if (!product) {
      logger.warn("Produto não encontrado na base de dados.", {
        productId: id,
      });
      return;
    }
    logger.info("Produto encontrado com sucesso.", {
      productId: id,
    });
    return product;
  } catch (error) {
    logger.error("Erro ao acessar um produto específico.", {
      error: error.message,
    });
    throw error;
  }
};

// criar um novo produto
const createProduct = async ({nome, preco, descricao, userId}) => {
    try {
        const product = await prisma.produto.create({
            data: {
                nome: nome,
                preco: preco,
                descricao: descricao,
                userId: userId
            }
        });
        logger.info('Produto criado com sucesso.', { productId: product.id, userId});
        return product;
    } catch (error) {
        logger.error("Erro ao cadastrar um produto.", {
            error: error.message,
        });
        throw error;
    }
};

// deletar um produto pelo id
const deleteProduct = async (id) => {
    try {
        await prisma.produto.delete({
            where: {id: parseInt(id)}
        });
        logger.info('Produto deletado com sucesso.', {productId: id})
    } catch (error) {
        logger.error("Erro ao deletar um produto.", {
            error: error.message,
        });
        throw error;        
    }
};

// atualizar um produto pelo id
const updateProduct = async (id, { nome, preco, descricao }) => {
    try {
        const updatedProduct = await prisma.produto.update({
            where: { id: parseInt(id) },
            data: {
                nome,
                preco,
                descricao
            }
        });
        logger.info('Produto atualizado com sucesso.', {
            productId: id
        });
        return updatedProduct;    
    } catch (error) {
        logger.error("Erro ao atualizar um produto.", {
            error: error.message,
        });
        throw error;        
    }
};

module.exports = {
  updateProduct,
  deleteProduct,
  createProduct,
  getProductById,
  getAllProducts,
};
