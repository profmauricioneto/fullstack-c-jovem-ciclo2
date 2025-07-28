const clientService = require('./client.service');
const logger = require('../../shared/logger');

exports.registerClientController = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;   
        
        if (!nome || !email || !senha) {
            return res.status(400).json({
                error: 'Required fields: name, email e password'
            });
        }

        const client = await clientService.registerClient(nome, email, senha);

        res.status(201).json({
            message: 'Client registered with success',
            client
        });
    } catch (error) {
        logger.error('Error to register client', {
            error: error.message
        });
    }

    res.status(400).json({
        error: error.message
    });
}

exports.loginClientController = async (req, res) => {
    try {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios' });
        }

        const result = await clientService.loginClient(email, senha);

        res.json({
            message: 'Login realizado com sucesso',
            client: result.client,
            token: result.token
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};