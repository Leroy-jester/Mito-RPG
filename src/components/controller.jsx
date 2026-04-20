import { personagemService, campanhaService } from "./service";

export const personagemController = {
  criarPersonagem(personagem) {
    return personagemService.criar(personagem);
  },

  listarPersonagens() {
    const lista = personagemService.listar();
    return { ok: true, data: lista };
  },

  buscarPersonagem(id) {
    const personagem = personagemService.buscar(id);

    if (!personagem) {
      return { ok: false, erro: "Personagem não encontrado" };
    }

    return { ok: true, data: personagem };
  },

  removerPersonagem(id) {
    return personagemService.remover(id);
  },

  editarPersonagem(id, dadosAtualizados) {
    return personagemService.editar(id, dadosAtualizados);
  },
  
  toggleFavorito(id) {
    return personagemService.toggleFavorito(id);
  },

  listarFavoritos() {
      return personagemService.listarFavoritos();
  }
};

export const campanhaController = {
  criarCampanha(campanha) {
    return campanhaService.criar(campanha);
  },

  listarCampanhas() {
    const lista = campanhaService.listar();
    return { ok: true, data: lista };
  },

  buscarCampanha(id) {
    const campanha = campanhaService.buscar(id);

    if (!campanha) {
      return { ok: false, erro: "Campanha não encontrada" };
    }

    return { ok: true, data: campanha };
  },

  removerCampanha(id) {
    return campanhaService.remover(id);
  },

  editarCampanha(id, dadosAtualizados) {
    return campanhaService.editar(id, dadosAtualizados);
  },
  adicionarFichaNaCampanha(idCampanha, ficha) {
    return campanhaService.adicionarFicha(idCampanha, ficha);
  },

  removerFichaDaCampanha(idCampanha, idFicha) {
    return campanhaService.removerFicha(idCampanha, idFicha);
  },
};