const express = require('express');
const router = express.Router();
const supabase = require('../db');

// Rota para obter todos os tutores
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('Tutores')
            .select('*');

        if (error) {
            throw error;
        }

        if (data && data.length > 0) {
            return res.status(200).json({ tutors: data });
        } else {
            return res.status(404).json({ error: 'Nenhum tutor encontrado' });
        }
    } catch (e) {
        return res.status(500).json({ error: 'Erro ao obter tutores', details: e.message });
    }
});

// Rota para validar o login de um tutor (via POST)
router.post('/login', async (req, res) => {
    const { email, password } = req.body; // Espera que os dados sejam passados no corpo da requisição

    if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }
    console.log('email: '+email);
    console.log('password: '+password);
    try {
        const { data, error } = await supabase
            .from('Tutores')
            .select('*')
            .eq('email', email)
            .eq('password', password)
            .single();

        if (error) {
            throw error;
        }
        if (data) {
            return res.status(200).json({ message: 'Login válido', tutor: data });
        } else {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }
    } catch (e) {
        res.status(500).json({ error: 'Erro ao validar o login do tutor', error: e });
    }
});

// // Rota para cadastrar novos tutores (via POST)
 router.post('/cadastro', async (req, res) => {
     const { name, email, password } = req.body;

    //  Verifica se os campos obrigatórios estão presentes
     if (!name || !email || !password) {
         return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
     }

     try{
         const { data, error } = await supabase
         .from('Tutores')
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
        //  Insere um novo tutor
         const { data, error} = await supabase
             .from('Tutores')
             .insert([{ name, email, password }])
             .select();

         if (error) {
             return res.status(500).json({ error: 'Não foi possível cadastrar o tutor', error });
         }

        //  Verificar a estrutura do retorno
         console.log('Retorno da inserção:', data);

         return res.status(201).json({ message: 'Tutor cadastrado com sucesso', tutor: data });
     } catch (e) {
         return res.status(500).json({ error: 'Erro ao cadastrar o tutor', error: e.message });
     }
 });

//  Rota para obter dados de um aluno com base no ID
 router.get('/:id', async (req, res) => {
     const tutorId = req.params.id;

     try {
         const { data, error } = await supabase
             .from('Tutores')
             .select('*')
             .eq('id', tutorId)
             .single();

         if (error) {
             throw error;
         }

         if (data) {
             return res.status(200).json({ tutor: data });
         } else {
             return res.status(404).json({ error: 'Tutor não encontrado' });
         }
     } catch (e) {
         return res.status(500).json({ error: 'Erro ao obter informações do tutor', error: e });
     }
 });

 // Rota para atualizar os dados de um aluno com base no ID (via PATCH)
 router.patch('/:id', async (req, res) => {
     const tutorId = req.params.id;
     const { name, email, password, bio, semestre, instituicaoDeEnsino, subjects, quantidadeAlunos, avatar, linkURL, linkDiscord, linkYoutube, linkTwitter, linkInstagram } = req.body;

     const uniqueSubjects = [...new Set(subjects)];
    //  Verifica se os campos obrigatórios estão presentes
    //  if (!name || !email || !password) {
    //      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
    //  }

      try {
          const existingEmail = await supabase
              .from('Tutores')
              .select('id')
              .eq('email', email)
              .neq('id', tutorId)
              .single();

          console.log('Email já cadastrado:', existingEmail.data);
          if (existingEmail.data) {
              return res.status(400).json({ error: 'Email já cadastrado para outro tutor' });
          }
      } catch (e) {
          return res.status(500).json({ error: e.message });
      }

     try {
         const { data, error } = await supabase
             .from('Tutores')
             .update({ name, email, password, bio, semestre, instituicaoDeEnsino, subjects: uniqueSubjects, quantidadeAlunos, avatar, linkURL, linkDiscord, linkYoutube, linkTwitter, linkInstagram })
             .eq('id', tutorId)
             .select();

         if (error) {
             return res.status(500).json({ error: 'Erro ao atualizar os dados do tutor' });
         }
         if (data != null) {
             return res.status(200).json({ message: 'Dados do tutor atualizados com sucesso', tutor: data });
         } else {
             return res.status(404).json({ error: 'Tutor não encontrado' });
         }
     } catch (error) {
         return res.status(500).json({ er: 'Erro ao atualizar os dados do tutor', e: error });
     }
 });




module.exports = router;
