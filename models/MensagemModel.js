const supabase = require("../db");

class MensagemModel {
  static async listarMensagens(conversaId) {
    try {
      let { data, error } = await supabase
        .from("Mensagens")
        .select("*")
        .eq("conversa_id", conversaId);

      if (error) throw error;

      return { data, error };
    } catch (error) {
      console.error("Erro ao listar mensagens:", error.message);
      return null;
    }
  }

  static async criarMensagem(conversaId, senderId, senderType, messageText) {
    try {
      let { data, error } = await supabase.from("Mensagens").insert([
        {
          conversa_id: conversaId,
          sender_id: senderId,
          sender_type: senderType,
          message_text: messageText,
        },
      ]);

      if (error) throw error;

      return { data, error };
    } catch (error) {
      console.error("Erro ao criar mensagem:", error.message);
      return null;
    }
  }

  static async editarMensagem(mensagemId, novosDados) {
    try {
      let { data, error } = await supabase
        .from("Mensagens")
        .update(novosDados)
        .eq("id", mensagemId);

      if (error) throw error;

      return { data, error };
    } catch (error) {
      console.error("Erro ao editar mensagem:", error.message);
      return null;
    }
  }

  static async deletarMensagem(mensagemId) {
    try {
      let { data, error } = await supabase
        .from("Mensagens")
        .delete()
        .eq("id", mensagemId);

      if (error) throw error;

      return { data, error };
    } catch (error) {
      console.error("Erro ao deletar mensagem:", error.message);
      return null;
    }
  }
}

module.exports = MensagemModel;
