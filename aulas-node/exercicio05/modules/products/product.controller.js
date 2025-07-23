const productService = require('./product.service');

exports.createProductController = async (req, res) => {
    try {
        const { nome, preco, descricao } = req.body;
        await productService.createProduct(nome, preco, descricao);
        res.status(201).json({ message: 'task created with success'});
    } catch (error) {
        res.status(500).json({message: 'Error interno do servidor'});
    }

}

exports.getAllProductsController = async (req, res) => {
    try {
        const product = await productService.getAllProducts();
        res.status(200).json(product);
    } catch(error) {
        res.status(500).json({message: 'Error interno do servidor'});
    }
}

exports.getProductByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productService.getProductById(Number(id));
        (product) ? res.status(200).json(product) : res.status(404).json({message: 'product not found'})
    } catch(error) {
        res.status(500).json({message: 'Error interno do servidor'});
    }
}

exports.updateProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, preco, descricao } = req.body;
        await productService.updateProduct(Number(id), nome, preco, descricao);
        res.status(200).json({message: 'product update.'});
    } catch(error) {
        res.status(500).json({message: 'Error interno do servidor'});
    }

}

exports.deleteProductController = async (req, res) => {
    try {
        const { id } = req.params;
        await productService.deleteProduct(Number(id));
        res.status(200).json({message: 'product deleted'});
    } catch(error) {
        res.status(500).json({message: 'Error interno do servidor'});
    }
}

// const productService = require('./product.service');
// const logger = require('../../shared/logger');

// exports.createProductController = async (req, res) => {
//     const correlationId = req.headers['x-correlation-id'] || `create-${Date.now()}`;
    
//     try {
//         logger.info('Iniciando criação de produto', {
//             correlationId,
//             userId: req.user?.id
//         });

//         const { nome, preco, descricao } = req.body; 
//         if (!nome || !preco || !descricao) {
//             logger.warn('Dados obrigatórios faltando', {
//                 correlationId,
//                 missing: { nome: !nome, preco: !preco, descricao: !descricao }
//             });
//             return res.status(400).json({ 
//                 error: 'Campos obrigatórios: nome, preco, descricao' 
//             });
//         }

//         if (typeof preco !== 'number' || preco <= 0) {
//             logger.warn('Preço inválido', { correlationId, preco });
//             return res.status(400).json({ 
//                 error: 'Preço deve ser um número positivo' 
//             });
//         }

//         const product = await productService.createProduct({ nome, preco, descricao });

//         logger.info('Produto criado com sucesso', {
//             correlationId,
//             productId: product.id,
//             productName: product.nome
//         });

//         res.status(201).json({
//             message: 'Produto criado com sucesso',
//             product
//         });

//     } catch (error) {
//         logger.error('Erro ao criar produto', {
//             correlationId,
//             error: error.message,
//             stack: error.stack
//         });

//         res.status(500).json({
//             error: 'Erro interno do servidor'
//         });
//     }
// };

// exports.getAllProductsController = async (req, res) => {
//     const correlationId = req.headers['x-correlation-id'] || `list-${Date.now()}`;
    
//     try {
//         logger.info('Listando produtos', { correlationId });

//         const products = await productService.getAllProducts(); 
//         logger.info('Produtos listados com sucesso', {
//             correlationId,
//             count: products.length
//         });

//         res.status(200).json({
//             products,
//             count: products.length
//         });

//     } catch (error) {
//         logger.error('Erro ao listar produtos', {
//             correlationId,
//             error: error.message,
//             stack: error.stack
//         });

//         res.status(500).json({
//             error: 'Erro interno do servidor'
//         });
//     }
// };

// exports.getProductByIdController = async (req, res) => {
//     const correlationId = req.headers['x-correlation-id'] || `get-${Date.now()}`;
    
//     try {
//         const { id } = req.params; 
//         logger.info('Buscando produto por ID', {
//             correlationId,
//             productId: id
//         });

//         if (!id || isNaN(Number(id))) {
//             logger.warn('ID inválido fornecido', { correlationId, id });
//             return res.status(400).json({
//                 error: 'ID deve ser um número válido'
//             });
//         }

//         const product = await productService.getProductById(Number(id)); 
//         if (!product) {
//             logger.warn('Produto não encontrado', {
//                 correlationId,
//                 productId: id
//             });
//             return res.status(404).json({
//                 error: 'Produto não encontrado'
//             });
//         }

//         logger.info('Produto encontrado', {
//             correlationId,
//             productId: product.id,
//             productName: product.nome
//         });

//         res.status(200).json(product);

//     } catch (error) {
//         logger.error('Erro ao buscar produto', {
//             correlationId,
//             productId: req.params.id,
//             error: error.message,
//             stack: error.stack
//         });

//         res.status(500).json({
//             error: 'Erro interno do servidor'
//         });
//     }
// };

// exports.updateProductController = async (req, res) => {
//     const correlationId = req.headers['x-correlation-id'] || `update-${Date.now()}`;
    
//     try {
//         const { id } = req.params; // Corrigido
//         const { nome, preco, descricao } = req.body; 

//         logger.info('Iniciando atualização de produto', {
//             correlationId,
//             productId: id,
//             updateFields: Object.keys(req.body)
//         });

//         if (!id || isNaN(Number(id))) {
//             logger.warn('ID inválido para atualização', { correlationId, id });
//             return res.status(400).json({
//                 error: 'ID deve ser um número válido'
//             });
//         }

//         if (!nome && !preco && !descricao) {
//             logger.warn('Nenhum campo para atualizar', { correlationId });
//             return res.status(400).json({
//                 error: 'Pelo menos um campo deve ser fornecido para atualização'
//             });
//         }

//         if (preco !== undefined && (typeof preco !== 'number' || preco <= 0)) {
//             logger.warn('Preço inválido na atualização', { correlationId, preco });
//             return res.status(400).json({
//                 error: 'Preço deve ser um número positivo'
//             });
//         }

//         const updatedProduct = await productService.updateProduct(
//             Number(id), 
//             { nome, preco, descricao }
//         ); 

//         if (!updatedProduct) {
//             logger.warn('Produto não encontrado para atualização', {
//                 correlationId,
//                 productId: id
//             });
//             return res.status(404).json({
//                 error: 'Produto não encontrado'
//             });
//         }

//         logger.info('Produto atualizado com sucesso', {
//             correlationId,
//             productId: id,
//             updatedFields: Object.keys(req.body)
//         });

//         res.status(200).json({
//             message: 'Produto atualizado com sucesso',
//             product: updatedProduct
//         });

//     } catch (error) {
//         logger.error('Erro ao atualizar produto', {
//             correlationId,
//             productId: req.params.id,
//             error: error.message,
//             stack: error.stack
//         });

//         res.status(500).json({
//             error: 'Erro interno do servidor'
//         });
//     }
// };

// exports.deleteProductController = async (req, res) => {
//     const correlationId = req.headers['x-correlation-id'] || `delete-${Date.now()}`;
    
//     try {
//         const { id } = req.params;

//         logger.info('Iniciando deleção de produto', {
//             correlationId,
//             productId: id
//         });

//         if (!id || isNaN(Number(id))) {
//             logger.warn('ID inválido para deleção', { correlationId, id });
//             return res.status(400).json({
//                 error: 'ID deve ser um número válido'
//             });
//         }

//         const deleted = await productService.deleteProduct(Number(id)); // Adicionado await

//         if (!deleted) {
//             logger.warn('Produto não encontrado para deleção', {
//                 correlationId,
//                 productId: id
//             });
//             return res.status(404).json({
//                 error: 'Produto não encontrado'
//             });
//         }

//         logger.info('Produto deletado com sucesso', {
//             correlationId,
//             productId: id
//         });

//         res.status(200).json({
//             message: 'Produto deletado com sucesso'
//         });

//     } catch (error) {
//         logger.error('Erro ao deletar produto', {
//             correlationId,
//             productId: req.params.id,
//             error: error.message,
//             stack: error.stack
//         });

//         res.status(500).json({
//             error: 'Erro interno do servidor'
//         });
//     }
// };