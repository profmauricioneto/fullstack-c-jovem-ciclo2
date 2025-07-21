require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET_KEY;

console.log("JWT_SECRET carregada:", JWT_SECRET ? "✅ Sim" : "❌ Não");

let produtos = require('./data');
let idContador = 6;
let userIdContador = 2;

let usuarios = [
  {
    id: 1,
    email: "test@email.com",
    senha: "$2a$10$Ql3.oqBu.nF5X0P3X0P3XezMYqO.nF5X0P3X0P3X",
    nome: "test",
  },
];

// função que apresenta o log da requisição
const logMiddleware = (req, res, next) => {
  console.log(`[${new Date()}] ${req.method} ${req.url}`);
  next();
};

// Middleware de verificação de token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      error: "Acesso não autorizado! Token não encontrado!",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuarios = decoded;
    next();
  } catch (error) {
    return res.status(400).json({
      error: "Token não válido!",
    });
  }
};

//middleware
app.use(express.json());
app.use(logMiddleware);

// ROTAS SEM VERIFICACAO DE TOKEN!

// rota do registro 
app.post("/auth/register", async (req, res) => {
  try {
    const { email, senha, nome } = req.body;

    if (!email || !senha || !nome) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
    }

    const usuarioExiste = usuarios.find((user) => user.email === email);
    if (usuarioExiste) {
      return res.status(400).json({ error: "usuário já cadastrado!" });
    }
    
    const senhaCripto = await bcrypt.hash(senha, 10);

    const novoUsuario = {
      id: userIdContador++,
      email,
      senha: senhaCripto,
      nome,
    };

    usuarios.push(novoUsuario);

    const token = jwt.sign(
      { id: novoUsuario.id, email: novoUsuario.email },
      JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso",
      token,
      usuario: {
        id: novoUsuario.id,
        email: novoUsuario.email,
        nome: novoUsuario.nome,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno do servidor." });
  }
});

// rota do login
app.post("/auth/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: "Email e senha são obrigatórios!" });
    }

    const usuario = usuarios.find((user) => user.email === email);
    if (!usuario) {
      return res.status(400).json({ error: "Credenciais inválidas" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(400).json({ error: "Senha inválida" });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.json({
      mensagem: "Login realizado com sucesso",
      token,
      usuario: {
        id: usuario.id,
        email: usuario.email,
        nome: usuario.nome,
      },
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro interno do servidor" });
  }
});

// ROTAS COM VERIFICACAO DE TOKEN!

// criar um produto
app.post("/produtos", verifyToken, (req, res) => {
  const { nome, preco, descricao } = req.body;
  
  if (!nome || !preco || !descricao) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
  }
  
  const produto = { id: idContador++, nome, preco, descricao };
  produtos.push(produto);
  res.status(201).json(produto);
});

// listas todos os produtos
app.get("/produtos", verifyToken, (req, res) => {
  res.json(produtos);
});

// buscar produto por id
app.get("/produtos/:id", verifyToken, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const produto = produtos.find((prod) => prod.id === id);
  if (!produto)
    return res.status(404).json({ mensagem: "Produto não encontrado" });
  res.json(produto);
});

// atualizar um produto pelo id
app.put("/produtos/:id", verifyToken, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const produto = produtos.find((p) => p.id === id);
  if (!produto)
    return res.status(404).json({ mensagem: "Produto não encontrado" });

  const { nome, preco, descricao } = req.body;
  produto.nome = nome || produto.nome;
  produto.preco = preco || produto.preco;
  produto.descricao = descricao || produto.descricao;

  res.json(produto);
});

// deletar um produto pelo id
app.delete("/produtos/:id", verifyToken, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = produtos.findIndex((p) => p.id === id);
  if (index === -1)
    return res.status(404).json({ mensagem: "Produto não encontrado" });
  produtos.splice(index, 1);
  res.json({ mensagem: "Produto removido com sucesso" });
});

// executando uma mensagem na raiz
app.get("/", (req, res) => {
  res.send("<h1>Executando a API</h1>");
});

// servidor
app.listen(PORT, () => {
  console.log(`Servidor executando em: http://localhost:${PORT}`);
});
