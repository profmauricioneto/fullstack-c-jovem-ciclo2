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
      // console.error(`Campos obrigatórios não preenchidos`);
      // return;
    }
    if (senha.length < 6) {
      logger.error("senha deve ter o mínimo de 6 digitos.");
      throw new Error("senha deve ter o mínimo de 6 digitos.");
      // console.error(`A senha deve conter no mínimo 6 digitos`);
      // return;
    }

    // verificar se o usuário já possui cadastro
    const userExists = usersData.find((user) => user.email === email);
    if (userExists) {
      // console.log(`Usuário já cadastrado na plataforma.`);
      logger.warn("Usuário já existente no sistema");
      return userExists;
    }

    logger.info("Início do cadastro do usuário: ", {nome, email});

    // criptografando a senha
    const cryptPassword = await bcrypt.hash(senha, 10);
    // criando o novo usuário
    const newUser = {
      id: idUser++,
      nome,
      email,
      senha: cryptPassword,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "active",
    };
    usersData.push(newUser);

    // gerando a token jwt
    const token = jwt.sign(
      { id: newUser.id, nome: newUser.nome, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "10min" }
    );

    logger.info("Usuário cadastrado com sucesso ", {
      userId: newUser.id,
      userEmail: newUser.email,
    });

    return { newUser, token };
  } catch (error) {
    // console.error(`Não foi possível realizar o login`);
    logger.error("Erro ao cadastrar o usuário", {
      error: error.message,
      email,
    });
    throw error
  }
};

const getAllUsers = () => {
  try {
    return usersData;
  } catch (error) {
    // console.error(`Erro ao retorna os usuários.`);
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
      // console.error(`Campos obrigatórios estão incompletos.`);
      // return;
    }

    const userExists = usersData.find((user) => user.email === email);
    if (!userExists) {
      // console.error(`Usuário não cadastro na aplicação.`);
      // return;
      logger.warn("Usuário não cadastrado na aplicação.");
      throw new Error("Usuário não cadastrado na aplicação.");
    }

    // verficação de senha!
    const passwordValid = await bcrypt.compare(senha, userExists.senha);
    if (!passwordValid) {
      logger.error("Senha inválida.");
      throw new Error("Senha inválida.");
      // console.error(`Senha incorreta!`);
      // return;
    }

    // gerando a token jwt
    const token = jwt.sign(
      { id: userExists.id, nome: userExists.nome, email: userExists.email },
      JWT_SECRET,
      { expiresIn: "10min" }
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