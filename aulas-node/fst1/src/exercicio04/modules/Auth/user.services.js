const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const users = require('../../config/data.users');

const JWT_SECRET_KEY = process.env.JWT_SECRET;
let IDUser = 2;

exports.registerUser = async (nome, email, senha) => {
    try {
        if (!nome || !email || !senha) {
            console.error(`nome, email e senha são obrigatórios`);
            return;
        }
        if (senha.lenght >= 6) {
            console.error(`A senha tem que ter no mínimo 6 digitos`);
            return;
        }
        // verificar se usuário já existe na base de dados.
        const user = users.find((user) => user.email === email);
        if (user) {
            console.log(`Usuário existente ${user.email}`);
            return;
        }
        // criptografando a senha do usuário.
        const cryptPassword = await bcrypt.hash(senha, 10);
        
        // adicionando o usuario
        const newUser = {
            id: IDUser++,
            nome,
            email,
            senha: cryptPassword,
            createAt: new Date().toISOString(),
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

        console.log(`Usuário cadastrado com sucesso.`);

        return {newUser, token}
    } catch (error) {
        console.error(`Error ao cadastrar usuário`);
    }
}

exports.getAllUsers = () => {
    try {
        return users;
    } catch (error) {
        console.error(`Error ao acessar a base de dados de usuários`);
    }
};

exports.login = async (email, senha) => {
    try {
        if (!email || !senha) {
            console.error(`Email e senha são obrigatórios`);
            return;
        }
        // procurando o usuário
        const userLogin = users.find((user) => user.email === email);
        if (!userLogin) {
            console.error(`Usuário não encontrado.`);
            return;
        }
        // comparando as senhas
        const validPassword = await bcrypt.compare(senha, userLogin.senha);
        if (!validPassword) {
            console.error(`Senha não válida!`);
            return;
        }

        const token = jwt.sign(
            {id: userLogin.id, email: userLogin.email, nome: userLogin.nome},
            JWT_SECRET_KEY,
            {expiresIn: '10min'}
        );

        return {userLogin, token};
    } catch (error) {
        console.error(`Error ao fazer o login da aplicação.`);
    }
};