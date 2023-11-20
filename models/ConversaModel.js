const supabase = require("../db");

class ConversaModel {
  static async buscarConversa(conversaId) {
    try {
      let { data: Conversas, error } = await supabase
        .from("Conversas")
        .select("*")
        .eq("id", conversaId);

      if (error) throw error;

      return Conversas;
    } catch (error) {
      console.error("Erro ao listar conversas:", error.message);
      return null;
    }
  }

  static async listarConversasAluno(alunoId) {
    try {
      let { data, error } = await supabase
        .from("Conversas")
        .select("*")
        .eq("aluno_id", alunoId);

      if (error) throw error;

      return { data, error };
    } catch (error) {
      console.error("Erro ao listar conversas:", error.message);
      return null;
    }
  }

  static async listarConversasTutor(tutorId) {
    try {
      let { data, error } = await supabase
        .from("Conversas")
        .select("*")
        .eq("tutor_id", tutorId);

      if (error) throw error;

      return { data, error };
    } catch (error) {
      console.error("Erro ao listar conversas:", error.message);
      return null;
    }
  }

  static async criarConversa(id_aluno, id_tutor) {
    try {
      let { data, error } = await supabase.from("Conversas").insert([
        {
          aluno_id: id_aluno,
          tutor_id: id_tutor,
          // Adicione outros campos necessários aqui, se houver
        },
      ]);

      if (error) throw error;

      return { data, error };
    } catch (error) {
      console.error("Erro ao criar conversa:", error.message);
      return null;
    }
  }

  static async excluirConversa(id) {
    try {
      const { data, error } = await supabase
        .from("Conversas")
        .delete()
        .eq("id", id);

      return { data, error };
    } catch (error) {
      return { error: error.message };
    }
  }
}

module.exports = ConversaModel;
