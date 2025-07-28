const path = require('path');

require("dotenv").config({
  path: path.resolve(__dirname, "../../config/.env"),
});
const clients = require("../../config/data.clients");
const bcrypt = require("bcrypt");
const logger = require("../../shared/logger");
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET_KEY;
let idClient = 2;

if (!JWT_SECRET) {
  logger.error("JWT_SECRET_KEY não encontrada nas variáveis de ambiente");
  throw new Error("JWT_SECRET_KEY é obrigatória");
}

exports.registerClient = async (nome, email, senha) => {
  try {
    // Validação de entrada
    if (!nome || !email || !senha) {
      logger.error("name, email and password required");
      throw new Error("name, email and password required");
    }

    if (senha.length < 6) {
      logger.error('Password must be have until 6 characteres');
      throw new Error("Password must be have until 6 characteres");
    }

    logger.info("Start client registration", { nome, email });

    const existsClient = clients.find((client) => client.email === email);
    if (existsClient) {
      logger.warn("Trying to register with already email", { email });
      throw new Error("Client already register with this email");
    }

    const criptPassword = await bcrypt.hash(senha, 10);

    const newClient = {
      id: idClient++, 
      nome,
      email,
      senha: criptPassword,
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString(),
      status: "active",
    };

    clients.push(newClient);

    // Gerar token JWT para o novo cliente
    const token = jwt.sign(
      { id: newClient.id, email: newClient.email, nome: newClient.nome },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    logger.info("Client register with success", {
      clientId: newClient.id,
      email: newClient.email,
    });

    // Retornar cliente sem senha + token
    const { senha: _, ...clientData } = newClient;
    return { client: clientData, token };

  } catch (error) {
    logger.error("Error to register a client", {
      error: error.message,
      email,
    });
    throw error;
  }
};

exports.getAllClients = () => {
  try {
    logger.info("Recovering all clients");

    const getClients = clients.map((client) => {
      const { senha, ...clientData } = client;
      return clientData;
    });

    logger.info("Recovering clients with success", {
      count: getClients.length,
    });

    return getClients;
  } catch (error) {
    logger.error("Erro ao listar clientes", { error: error.message });
    throw error;
  }
};

exports.loginClient = async (email, senha) => {
    try {
        // Validação de entrada
        if (!email || !senha) {
            throw new Error("Email e senha são obrigatórios");
        }

        logger.info('Tentativa de login de cliente', { email });

        const client = clients.find(c => c.email === email);
        if (!client) {
            logger.warn('Login falhou: cliente não encontrado', { email });
            throw new Error('Email ou senha inválidos');
        }

        const senhaValida = await bcrypt.compare(senha, client.senha);
        if (!senhaValida) {
            logger.warn('Login falhou: senha inválida', { email });
            throw new Error('Email ou senha inválidos');
        }

        const token = jwt.sign(
            { id: client.id, email: client.email, nome: client.nome },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        logger.info('Login realizado com sucesso', { clientId: client.id, email });

        const { senha: _, ...clientData } = client;
        return { client: clientData, token };

    } catch (error) {
        logger.error('Erro no login do cliente', { email, error: error.message });
        throw error;
    }
};