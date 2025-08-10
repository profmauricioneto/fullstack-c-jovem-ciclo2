// middlewares/auth.js
const jwt = require('jsonwebtoken');
const logger = require('../../shared/logger');

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            logger.warn('Token não fornecido', { 
                url: req.url, 
                method: req.method,
                ip: req.ip 
            });
            return res.status(401).json({ 
                error: 'Token de acesso obrigatório' 
            });
        }

        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                logger.warn('Token inválido', { 
                    error: err.message,
                    url: req.url,
                    ip: req.ip
                });
                return res.status(403).json({ 
                    error: 'Token inválido ou expirado' 
                });
            }

            req.user = user; // Adiciona dados do usuário à requisição
            logger.info('Usuário autenticado', {
                userId: user.id,
                email: user.email,
                url: req.url,
                method: req.method
            });
            next();
        });
    } catch (error) {
        logger.error('Erro na autenticação', {
            error: error.message,
            stack: error.stack
        });
        return res.status(500).json({ 
            error: 'Erro interno do servidor' 
        });
    }
};

module.exports = { authenticateToken };