require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                error: 'Token não encontrada na requisição!'
            })
        }

        jwt.verify(token, SECRET_KEY, (error, user) => {
            if (error) {
                return res.status(403).json({
                    error: 'Token não é válida ou expirou!'
                });
            }

            req.user = user;
            next();
        })
    } catch (error) {
        res.status(500).json({
            error: 'Erro interno do servidor.'
        })
    }
}

module.exports = authenticateToken;

// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwibm9tZSI6Im1hdXJpY2lvIG1vcmVpcmEiLCJlbWFpbCI6Im1hdXJpY2lvQGVtYWlsLmNvbSIsImlhdCI6MTc1NTAyMTMzNSwiZXhwIjoxNzU1MDIxOTM1fQ.2GtpL_Im1U0EkaGStRMJsaVeok_ZAV0a0BCIHm22-h0