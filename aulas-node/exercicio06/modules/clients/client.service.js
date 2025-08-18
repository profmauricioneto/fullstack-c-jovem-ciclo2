require('dotenv').config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../../shared/logger");
const { PrismaClient } = require("../../generated/prisma");

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET_KEY;

if (!JWT_SECRET) {
  logger.error("JWT_SECRET_KEY não encontrada nas variáveis de ambiente");
  throw new Error("JWT_SECRET_KEY é obrigatória");
}

exports.registerClient = async (nome, email, senha) => {
  try {
    if (!nome || !email || !senha) {
      throw new Error("Nome, email e senha são obrigatórios");
    }
    if (senha.length < 6) {
      throw new Error("Senha deve ter pelo menos 6 caracteres");
    }

    const existsClient = await prisma.user.findUnique({ where: { email } });
    if (existsClient) {
      throw new Error("Cliente já registrado com este email");
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const newClient = await prisma.user.create({
      data: {
        nome,
        email,
        senha: hashedPassword,
      },
    });

    const token = jwt.sign(
      { id: newClient.id, email: newClient.email, nome: newClient.nome },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    logger.info("Cliente registrado com sucesso", { clientId: newClient.id, email: newClient.email });

    const { senha: _, ...clientData } = newClient;
    return { client: clientData, token };
  } catch (error) {
    logger.error("Erro ao registrar cliente", { error: error.message, email });
    throw error;
  }
};

exports.loginClient = async (email, senha) => {
  try {
    if (!email || !senha) {
      throw new Error("Email e senha são obrigatórios");
    }

    const client = await prisma.user.findUnique({ where: { email } });
    if (!client) {
      throw new Error("Email ou senha inválidos");
    }

    const senhaValida = await bcrypt.compare(senha, client.senha);
    if (!senhaValida) {
      throw new Error("Email ou senha inválidos");
    }

    const token = jwt.sign(
      { id: client.id, email: client.email, nome: client.nome },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    logger.info("Login realizado com sucesso", { clientId: client.id, email });

    const { senha: _, ...clientData } = client;
    return { client: clientData, token };
  } catch (error) {
    logger.error("Erro no login do cliente", { email, error: error.message });
    throw error;
  }
};

exports.getAllClients = async () => {
  try {
    const clients = await prisma.user.findMany();
    const clientsWithoutPassword = clients.map(({ senha, ...clientData }) => clientData);
    logger.info("Clientes listados com sucesso", { count: clientsWithoutPassword.length });
    return clientsWithoutPassword;
  } catch (error) {
    logger.error("Erro ao listar clientes", { error: error.message });
    throw error;
  }
};