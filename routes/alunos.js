const express = require('express');
const router = express.Router();
const supabase = require('../db'); // Importe o arquivo de configuração do Supabase

// Rota para validar o login de um aluno (via POST)
router.post('/login', async (req, res) => {
    const { email, password } = req.body; // Espera que os dados sejam passados no corpo da requisição

    if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    try {
        const { data, error } = await supabase
            .from('Alunos')
            .select('*')
            .eq('email', email)
            .eq('password', password)
            .single();

        if (error) {
            throw error;
        }

        if (data) {
            return res.status(200).json({ message: 'Login válido', aluno: data });
        } else {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao validar o login do aluno' });
    }
});

// Rota para cadastrar novos alunos (via POST)
router.post('/cadastro', async (req, res) => {
    const { name, email, password } = req.body;

    // Verifica se os campos obrigatórios estão presentes
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
    }

    try{
        const { data, error } = await supabase
        .from('Alunos')
        .select('email')
        .eq('email', email)
        .single();

        if(data && !error){
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

    }
    catch (e){
        return res.status(500).json({ error: e.message });
    }

    try {
        // Insere um novo aluno
        const { data, error} = await supabase
            .from('Alunos')
            .insert([{ name, email, password }])
            .select();

        if (error) {
            return res.status(500).json({ error: 'Não foi possível cadastrar o aluno', error });
        }

        // Verificar a estrutura do retorno
        console.log('Retorno da inserção:', data);

        return res.status(201).json({ message: 'Aluno cadastrado com sucesso', aluno: data });
    } catch (e) {
        return res.status(500).json({ error: 'Erro ao cadastrar o aluno' });
    }
});

// Rota para obter dados de um aluno com base no ID
router.get('/:id', async (req, res) => {
    const alunoId = req.params.id;

    try {
        const { data, error } = await supabase
            .from('Alunos')
            .select('*')
            .eq('id', alunoId)
            .single();

        if (error) {
            throw error;
        }

        if (data) {
            return res.status(200).json({ aluno: data });
        } else {
            return res.status(404).json({ error: 'Aluno não encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao obter informações do aluno' });
    }
});



module.exports = router;
