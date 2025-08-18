const clientService = require('./client.service');
const logger = require('../../shared/logger');

exports.registerClientController = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({
                error: 'Campos obrigatórios: nome, email e senha'
            });
        }

        const result = await clientService.registerClient(nome, email, senha);

        res.status(201).json({
            message: 'Cliente registrado com sucesso',
            client: result.client,
            token: result.token
        });
    } catch (error) {
        logger.error('Erro ao registrar cliente', { error: error.message });
        res.status(400).json({ error: error.message });
    }
};

exports.loginClientController = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                error: 'Email e senha são obrigatórios'
            });
        }

        const result = await clientService.loginClient(email, senha);

        res.json({
            message: 'Login realizado com sucesso',
            client: result.client,
            token: result.token
        });
    } catch (error) {
        logger.error('Erro no login do cliente', { error: error.message });
        res.status(401).json({ error: error.message });
    }
};

exports.getAllClientsController = async (req, res) => {
    try {
        const clients = await clientService.getAllClients();
        res.json({ clients, count: clients.length });
    } catch (error) {
        logger.error('Erro ao listar clientes', { error: error.message });
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};