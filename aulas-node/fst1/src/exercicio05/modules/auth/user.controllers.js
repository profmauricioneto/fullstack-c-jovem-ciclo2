const userServices = require('./user.services');

exports.registerUserController = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({
                error: 'campos obrigatórios incompletos'
            });
        }

        const newUser = await userServices.registerUser(nome, email, senha);

        res.status(200).json({
            message: 'Usuário registrado com sucesso!',
            newUser
        });
    } catch (error) {
        console.error(`Erro ao tentar registrar um cliente.`);
        res.status(500).json('Erro Interno do Servidor.')
    }
};

exports.loginController = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                error: 'campos obrigatórios incompletos - email ou senha'
            });
        };

        const result = await userServices.login(email, senha);

        res.status(200).json({
            message: 'login realizado com sucesso.',
            user: result.existUser,
            token: result.token
        });
    } catch (error) {
        console.error(`Erro ao tentar se logar na aplicação.`);
        res.status(500).json('Erro Interno do Servidor.');
    }
};

exports.getAllUsersController = async (req, res) => {
    try {
        const users = await userServices.getAllUsers();
        res.status(200).json({
            users
        });
    } catch (error) {
        console.error(`Erro ao acessar os usuários.`);
        res.status(500).json('Erro Interno do Servidor.');
    }
};