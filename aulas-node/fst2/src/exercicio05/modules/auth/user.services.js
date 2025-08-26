require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require('../../shared/logger/logger');
const prisma = require('../db/prisma');

const JWT_SECRET = process.env.JWT_SECRET_KEY;

if (!JWT_SECRET) {
  logger.error("Chave JWT SECRET não foi carregada corretamente");
  throw new Error("JWT SECRET não carregada!");
}

const registerUser = async (nome, email, senha) => {
  try {
    // verificação de entrada de dados
    if (!nome || !email || !senha) {
      logger.error("nome, email e senha estão incompletos.");
      throw new Error("nome, email e senha são obrigatórias");
    }
  
    if (senha.length < 6) {
      logger.error("senha deve ter o mínimo de 6 digitos.");
      throw new Error("senha deve ter o mínimo de 6 digitos.");
    }

    // verificar se o usuário já possui cadastro
    const userExists = await prisma.usuario.findUnique({ where: { email }});
    if (userExists) {
      logger.warn("Usuário já existente no sistema");
      return userExists;
    }

    logger.info("Início do cadastro do usuário: ", {nome, email});

    // criptografando a senha
    const cryptPassword = await bcrypt.hash(senha, 10);
    // criando o novo usuário
    const newUser = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: cryptPassword,
      }
    });

    // gerando a token jwt
    const token = jwt.sign(
      { id: newUser.id, nome: newUser.nome, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    logger.info("Usuário cadastrado com sucesso ", {
      userId: newUser.id,
      userEmail: newUser.email,
    });

    return { newUser, token };
  } catch (error) {
    logger.error("Erro ao cadastrar o usuário", {
      error: error.message,
      email,
    });
    throw error
  }
};

const getAllUsers = async () => {
  try {
    const users = await prisma.usuario.findMany();
    // const usersNoPassword = users.map(({senha, ...users}) => users);
    logger.info('Usuarios acessados com sucesso.', {
      count: users.length,
    });
    return users;
  } catch (error) {
      logger.error("Erro ao acessar os usuários", {
      error: error.message,
    });
    throw error
  }
};

const login = async (email, senha) => {
  try {
    if (!email || !senha) {
      logger.error("email e senha estão incompletos.");
      throw new Error("email e senha são obrigatórias");
    }

    const userExists = await prisma.usuario.findUnique({ where: { email }});
    if (!userExists) {
      logger.warn("Usuário não cadastrado na aplicação.");
      throw new Error("Usuário não cadastrado na aplicação.");
    }

    // verficação de senha!
    const passwordValid = await bcrypt.compare(senha, userExists.senha);
    if (!passwordValid) {
      logger.error("Senha inválida.");
      throw new Error("Senha inválida.");
    }

    // gerando a token jwt
    const token = jwt.sign(
      { id: userExists.id, nome: userExists.nome, email: userExists.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    logger.info('Login realizado com sucesso: ', {
      userId: userExists.id,
      email
    });

    return { userExists, token }
  } catch (error) {
      logger.error("Erro ao realizad o login", {
      error: error.message,
      email,
    });
    throw error
  }
};

module.exports = {
    registerUser,
    getAllUsers,
    login
}