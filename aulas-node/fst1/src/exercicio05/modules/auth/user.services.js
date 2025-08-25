require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const logger = require('../../shared/logger/logger');
const prisma = require('../db/prisma');

const JWT_SECRET_KEY = process.env.SECRET_KEY ;

if (!JWT_SECRET_KEY) {
    logger.error('JWT SECRET não carregado!');
    throw new Error('JWT SECRET não encontrada nas variáveis de ambiente.');
}

exports.registerUser = async ( nome, email, senha ) => {
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
        const existUser = await prisma.user.findUnique({ where: { email }})
        if (existUser) {
            logger.warn(`Usuário existente ${email}`);
            throw new Error('Usuário já cadastrado na aplicação.');
        }

        logger.info('Início do processo de cadastro do usuário.');

        // criptografando a senha do usuário.
        const cryptPassword = await bcrypt.hash(senha, 10);
        
        // adicionando o usuario
        const newUser = await prisma.user.create({
            data: {
                name: nome,
                email,
                password: cryptPassword,
            },
        });

        
        // gerando o JWT
        const token = jwt.sign(
            {id: newUser.id, email: newUser.email, nome: newUser.name},
            JWT_SECRET_KEY,
            {expiresIn: '1h'}
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

exports.getAllUsers = async () => {
    try {
        const users = await prisma.user.findMany();
        logger.info('Usuários listados com sucesso.', {count: users.lenght});
        return users;
    } catch (error) {
        logger.error('Error ao acessar os usuários', {
            error: error.message,
        });
        throw error
    }
};

exports.login = async ( email, senha ) => {
    try {
        if (!email || !senha) {
            logger.error('email e senha são obrigatórios');
            throw new Error('email ou password não encontrados.');
        }
        // procurando o usuário
        const existUser = await prisma.user.findUnique({ where: { email }})
        if (!existUser) {
            logger.error(`Usuário não encontrado ${existUser}`);
            throw new Error('Usuário não encontrado no sistema.');
        }
        // comparando as senhas
        const validPassword = await bcrypt.compare(senha, existUser.password);
        if (!validPassword) {
            logger.error(`Senha não válida!`);
            throw new Error('Senha não válida para este usuário.');
        }

        const token = jwt.sign(
            {id: existUser.id, email: existUser.email, nome: existUser.name},
            JWT_SECRET_KEY,
            {expiresIn: '1h'}
        );

        return {existUser, token};
    } catch (error) {
        logger.error('Error ao cadastrar usuário', {
            error: error.message,
            email
        });
        throw error
    }
};