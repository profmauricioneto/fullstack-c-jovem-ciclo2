require("dotenv").config();
const usersData = require("../../config/data.users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let idUser = 2;

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const registerUser = async (nome, email, senha) => {
  try {
    // verificação de entrada de dados
    if (!nome || !email || !senha) {
      console.error(`Campos obrigatórios não preenchidos`);
      return;
    }
    if (senha.length < 6) {
      console.error(`A senha deve conter no mínimo 6 digitos`);
      return;
    }

    // verificar se o usuário já possui cadastro
    const userExists = usersData.find((user) => user.email === email);
    if (userExists) {
      console.log(`Usuário já cadastrado na plataforma.`);
      return userExists;
    }

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

    return { newUser, token };
  } catch (error) {
    console.error(`Não foi possível realizar o login`);
  }
};

const getAllUsers = () => {
  try {
    return usersData;
  } catch (error) {
    console.error(`Erro ao retorna os usuários.`);
  }
};

const login = async (email, senha) => {
  try {
    if (!email || !senha) {
      console.error(`Campos obrigatórios estão incompletos.`);
      return;
    }

    const userExists = usersData.find((user) => user.email === email);
    if (!userExists) {
      console.error(`Usuário não cadastro na aplicação.`);
      return;
    }

    // verficação de senha!
    const passwordValid = await bcrypt.compare(senha, userExists.senha);
    if (!passwordValid) {
      console.error(`Senha incorreta!`);
      return;
    }

    // gerando a token jwt
    const token = jwt.sign(
      { id: userExists.id, nome: userExists.nome, email: userExists.email },
      JWT_SECRET,
      { expiresIn: "10min" }
    );

    return { userExists, token }
  } catch (error) {
    console.error(`Erro ao fazer o login na aplicação.`);
  }
};

module.exports = {
    registerUser,
    getAllUsers,
    login
}