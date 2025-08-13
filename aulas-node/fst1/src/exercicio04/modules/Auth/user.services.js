require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const users = require('../../config/data.users');
const logger = require('../../shared/logger/logger');


const JWT_SECRET_KEY = process.env.SECRET_KEY ;
let IDUser = 2;

if (!JWT_SECRET_KEY) {
    logger.error('JWT SECRET não carregado!');
    throw new Error('JWT SECRET não encontrada nas variáveis de ambiente.');
}

exports.registerUser = async (nome, email, senha) => {
    try {
        if (!nome || !email || !senha) {
            logger.error('nome, email e senha são obrigatórios');
            throw new Error('nome ou email ou password não encontrados.');
        }
        if (senha.lenght >= 6) {
            logger.error('senha deve possuir pelo menos 6 digitos');
            throw new Error('senha deve possuir pelo menos 6 digitos');
        }
        // verificar se usuário já existe na base de dados.
        const user = users.find((user) => user.email === email);
        if (user) {
            logger.warn(`Usuário existente ${user.email}`);
            throw new Error('Usuário já cadastrado na aplicação.');
        }

        logger.info('Início do processo de cadastro do usuário.');

        // criptografando a senha do usuário.
        const cryptPassword = await bcrypt.hash(senha, 10);
        
        // adicionando o usuario
        const newUser = {
            id: IDUser++,
            nome,
            email,
            senha: cryptPassword,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            status: 'active'
        };
        users.push(newUser);

        
        // gerando o JWT
        const token = jwt.sign(
            {id: newUser.id, email: newUser.email, nome: newUser.nome},
            JWT_SECRET_KEY,
            {expiresIn: '10min'}
        );

        logger.info('Usuário cadastrado com Sucesso.', {nome, email});
        
        return { newUser, token }
    } catch (error) {
        logger.error('Error ao cadastrar usuário', {
            error: error.message,
            email
        });
        throw error
    }
}

exports.getAllUsers = () => {
    try {
        return users;
    } catch (error) {
        logger.error('Error ao acessar os usuários', {
            error: error.message,
        });
        throw error
    }
};

exports.login = async (email, senha) => {
    try {
        if (!email || !senha) {
            logger.error('email e senha são obrigatórios');
            throw new Error('email ou password não encontrados.');
        }
        // procurando o usuário
        const userLogin = users.find((user) => user.email === email);
        if (!userLogin) {
            logger.error(`Usuário não encontrado ${userLogin}`);
            throw new Error('Usuário não encontrado no sistema.');
        }
        // comparando as senhas
        const validPassword = await bcrypt.compare(senha, userLogin.senha);
        if (!validPassword) {
            logger.error(`Senha não válida!`);
            throw new Error('Senha não válida para este usuário.');
        }

        const token = jwt.sign(
            {id: userLogin.id, email: userLogin.email, nome: userLogin.nome},
            JWT_SECRET_KEY,
            {expiresIn: '10min'}
        );

        return {userLogin, token};
    } catch (error) {
        logger.error('Error ao cadastrar usuário', {
            error: error.message,
            email
        });
        throw error
    }
};