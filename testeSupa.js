// Importe a instância do Supabase
const supabase = require('./db');

// Função para testar a conexão com o Supabase
async function testSupabaseConnection() {
    try {
        // Consulta para buscar alguns dados de uma tabela (substitua 'nome_da_tabela' pelo nome da sua tabela)
        const { data, error } = await supabase.from('Materias').select('*');

        if (error) {
            throw error;
        }

        console.log('Conexão com o Supabase bem-sucedida!');
        console.log('Dados retornados:', data);
    } catch (error) {
        console.error('Erro ao conectar ao Supabase:', error);
    }
}

// Chama a função para testar a conexão
testSupabaseConnection();
