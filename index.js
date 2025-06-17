const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// ROTA DE TEXTO
app.post('/texto/:acao', (req, res) => {
    const { acao } = req.params;
    const { entrada } = req.body;

    if (!entrada || typeof entrada !== 'string') {
        return res.status(400).json({ erro: 'O campo "entrada" é obrigatório e deve ser uma string.' });
    }

    let saida;

    switch (acao) {
        case 'lowercase':
            saida = entrada.toLowerCase();
            break;
        case 'uppercase':
            saida = entrada.toUpperCase();
            break;
        default:
            return res.status(400).json({ erro: 'Ação inválida. Use "lowercase" ou "uppercase".' });
    }

    res.json({ entrada, acao, saida });
});

// ROTA DE NÚMERO
app.get('/numero/:acao', (req, res) => {
    const { acao } = req.params;
    const entradaRaw = req.query.entrada;

    if (!entradaRaw) {
        return res.status(400).json({ erro: 'O parâmetro "entrada" é obrigatório na query string.' });
    }

    // Converter string "10,1,100" em array de números
    const numeros = entradaRaw.split(',').map(n => parseFloat(n.trim()));

    if (numeros.some(isNaN)) {
        return res.status(400).json({ erro: 'Todos os valores em "entrada" devem ser números válidos.' });
    }

    let saida;

    switch (acao) {
        case 'minimum':
            saida = Math.min(...numeros);
            break;
        case 'maximum':
            saida = Math.max(...numeros);
            break;
        default:
            return res.status(400).json({ erro: 'Ação inválida. Use "minimum" ou "maximum".' });
    }

    res.json({ entrada: numeros, acao, saida });
});

// INICIAR SERVIDOR
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
