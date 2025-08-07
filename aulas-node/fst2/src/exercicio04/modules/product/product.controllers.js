const productServices = require('./product.services');

exports.getAllProductsController = async (req, res) => {
    try {
        const products = await productServices.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Internal Error. '});
    }
};

exports.getProductByIdController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const product = await productServices.getProductById(id);
        (product) ? res.status(200).json(product) : res.status(404).json({ message: 'produto não encontrado'});
    } catch (error) {
        res.status(500).json({ message: 'Server Internal Error. '});
    }
};

exports.createProductController = async (req, res) => {
    try {
        const {nome, preco, descricao} = req.body;
        if (!nome || !preco || !descricao) {
            res.status(400).json({message:`campos obrigatorios`})
        }
        await productServices.createProduct(nome, preco, descricao);
        res.status(201).json({ message: `produto criado com sucesso.`})
    } catch (error) {
        res.status(500).json({ message: 'Server Internal Error. ', error: error});
    }
};

exports.deleteProductController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await productServices.deleteProduct(id);
        res.status(200).json({ message: 'produto excluído com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Server Internal Error. '});
    }
};

exports.updateProductController = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { nome, preco, descricao } = req.body;
        await productServices.updateProduct(id, nome, preco, descricao);
        res.status(200).json({ message: 'produto atualizado com sucesso. '});
    } catch (error) {
        res.status(500).json({ message: 'Server Internal Error. '});
    }
};