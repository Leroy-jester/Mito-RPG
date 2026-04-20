import { personagemRepository, campanhaRepository } from "../repository/repository";

function campoVazio(valor) {
  return !valor || !String(valor).trim();
}

function validarPersonagem(personagem) {
  if (campoVazio(personagem.nome) || campoVazio(personagem.descricao)) {
    return "Nome e descrição são obrigatórios";
  }

  if (!personagem.sistema) {
    return "Sistema não escolhido";
  }

  if (personagem.sistema === "DnD") {
    if (!personagem.nivel || Number(personagem.nivel) < 1 || Number(personagem.nivel) > 20) {
      return "Nível inválido para DnD";
    }

    if (!personagem.raca) {
      return "Raça não escolhida";
    }

    if (!personagem.classe) {
      return "Classe não escolhida";
    }

    if (!personagem.atributos) {
      return "Atributos não informados";
    }
  }

  if (personagem.sistema === "OP") {
    if (personagem.nex === undefined || personagem.nex === null || Number(personagem.nex) < 0 || Number(personagem.nex) > 99) {
      return "NEX inválido para Ordem Paranormal";
    }

    if (!personagem.origem) {
      return "Origem não escolhida";
    }

    if (!personagem.classe) {
      return "Classe não escolhida";
    }

    if (!personagem.atributos) {
      return "Atributos não informados";
    }
  }

  if (personagem.sistema === "Tor20") {
    if (!personagem.nivel || Number(personagem.nivel) < 1 || Number(personagem.nivel) > 20) {
      return "Nível inválido para Tormenta20";
    }

    if (!personagem.raca) {
      return "Raça não escolhida";
    }

    if (!personagem.classe) {
      return "Classe não escolhida";
    }

    if (!personagem.atributos) {
      return "Atributos não informados";
    }
  }

  return null;
}

export const personagemService = {
    criar(personagem) {
        try {
        const erroValidacao = validarPersonagem(personagem);
        if (erroValidacao) {
            return { ok: false, erro: erroValidacao };
        }

        const lista = personagemRepository.listar();
        const existe = lista.find(
            (p) =>
            p.nome.toLowerCase().trim() === personagem.nome.toLowerCase().trim()
        );

        if (existe) {
            return { ok: false, erro: "Personagem já existe" };
        }

        const novo = {
            id: crypto.randomUUID(),
            ...personagem,
        };

        personagemRepository.salvar(novo);

        return { ok: true, data: novo };
        } catch {
        return { ok: false, erro: "Erro ao criar personagem" };
        }
    },

    listar() {
        try {
        return personagemRepository.listar();
        } catch {
        return [];
        }
    },

    buscar(id) {
        try {
        return personagemRepository.buscarPorId(id);
        } catch {
        return null;
        }
    },

    remover(id) {
        try {
        const personagem = personagemRepository.buscarPorId(id);

        if (!personagem) {
            return { ok: false, erro: "Personagem não encontrado" };
        }

        const removido = personagemRepository.remover(id);

        if (!removido) {
            return { ok: false, erro: "Não foi possível remover o personagem" };
        }

        return { ok: true, data: personagem };
        } catch {
        return { ok: false, erro: "Erro ao remover personagem" };
        }
    },

    editar(id, dadosAtualizados) {
        try {
        const personagemExistente = personagemRepository.buscarPorId(id);

        if (!personagemExistente) {
            return { ok: false, erro: "Personagem não encontrado" };
        }

        const personagemAtualizado = {
            ...personagemExistente,
            ...dadosAtualizados,
        };

        const erroValidacao = validarPersonagem(personagemAtualizado);
        if (erroValidacao) {
            return { ok: false, erro: erroValidacao };
        }

        const lista = personagemRepository.listar();
        const nomeDuplicado = lista.find(
            (p) =>
            p.id !== id &&
            p.nome.toLowerCase().trim() === personagemAtualizado.nome.toLowerCase().trim()
        );

        if (nomeDuplicado) {
            return { ok: false, erro: "Já existe outro personagem com esse nome" };
        }

        const editado = personagemRepository.editar(id, personagemAtualizado);

        if (!editado) {
            return { ok: false, erro: "Não foi possível editar o personagem" };
        }

        return { ok: true, data: editado };
        } catch {
        return { ok: false, erro: "Erro ao editar personagem" };
        }
    },

    toggleFavorito(id) {
        const personagem = personagemRepository.buscarPorId(id);

        if (!personagem) {
            return { ok: false, erro: "Personagem não encontrado" };
        }

        const atualizado = {
            ...personagem,
            favorito: !personagem.favorito
        };

        personagemRepository.editar(id, atualizado);

        return { ok: true, data: atualizado };
    },

    listarFavoritos() {
        const lista = personagemRepository.listar();
        const favoritos = lista.filter(p => p.favorito);

        return { ok: true, data: favoritos };
    }
};

function validarCampanha(campanha) {
    if (campoVazio(campanha.nome) || campoVazio(campanha.descricao)) {
        return "Nome e descrição são obrigatórios";
    }

    if (!campanha.sistema) {
        return "Sistema não escolhido";
    }

    return null;
}

export const campanhaService = {
    criar(campanha) {
        try {
        const erroValidacao = validarCampanha(campanha);
        if (erroValidacao) {
            return { ok: false, erro: erroValidacao };
        }

        const lista = campanhaRepository.listar();
        const existe = lista.find(
            (c) =>
            c.nome.toLowerCase().trim() === campanha.nome.toLowerCase().trim()
        );

        if (existe) {
            return { ok: false, erro: "Campanha já existe" };
        }

        const nova = {
            id: crypto.randomUUID(),
            fichas: [],
            ...campanha,
        };

        campanhaRepository.salvar(nova);

        return { ok: true, data: nova };
        } catch {
        return { ok: false, erro: "Erro ao criar campanha" };
        }
    },

    adicionarFicha(idCampanha, ficha) {
        try {
            const campanha = campanhaRepository.buscarPorId(idCampanha);

            if (!campanha) {
            return { ok: false, erro: "Campanha não encontrada" };
            }

            if (!ficha) {
            return { ok: false, erro: "Ficha não encontrada" };
            }

            if (campanha.sistema !== ficha.sistema) {
            return { ok: false, erro: "A ficha precisa ser do mesmo sistema da campanha" };
            }

            const fichasAtuais = campanha.fichas || [];
            const jaExiste = fichasAtuais.find((f) => f.id === ficha.id);

            if (jaExiste) {
            return { ok: false, erro: "Essa ficha já está na campanha" };
            }

            const campanhaAtualizada = {
            ...campanha,
            fichas: [...fichasAtuais, ficha],
            };

            const editada = campanhaRepository.editar(idCampanha, campanhaAtualizada);

            if (!editada) {
            return { ok: false, erro: "Não foi possível adicionar a ficha" };
            }

            return { ok: true, data: editada };
        } catch {
            return { ok: false, erro: "Erro ao adicionar ficha na campanha" };
        }
        },

    removerFicha(idCampanha, idFicha) {
        try {
            const campanha = campanhaRepository.buscarPorId(idCampanha);

            if (!campanha) {
            return { ok: false, erro: "Campanha não encontrada" };
            }

            const fichasAtuais = campanha.fichas || [];
            const existe = fichasAtuais.find((f) => f.id === idFicha);

            if (!existe) {
            return { ok: false, erro: "Ficha não encontrada na campanha" };
            }

            const campanhaAtualizada = {
            ...campanha,
            fichas: fichasAtuais.filter((f) => f.id !== idFicha),
            };

            const editada = campanhaRepository.editar(idCampanha, campanhaAtualizada);

            if (!editada) {
            return { ok: false, erro: "Não foi possível remover a ficha" };
            }

            return { ok: true, data: editada };
        } catch {
            return { ok: false, erro: "Erro ao remover ficha da campanha" };
        }
        },

    listar() {
        try {
        return campanhaRepository.listar();
        } catch {
        return [];
        }
    },

    buscar(id) {
        try {
        return campanhaRepository.buscarPorId(id);
        } catch {
        return null;
        }
    },

    remover(id) {
        try {
        const campanha = campanhaRepository.buscarPorId(id);

        if (!campanha) {
            return { ok: false, erro: "Campanha não encontrada" };
        }

        const removida = campanhaRepository.remover(id);

        if (!removida) {
            return { ok: false, erro: "Não foi possível remover a campanha" };
        }

        return { ok: true, data: campanha };
        } catch {
        return { ok: false, erro: "Erro ao remover campanha" };
        }
    },

    editar(id, dadosAtualizados) {
        try {
        const campanhaExistente = campanhaRepository.buscarPorId(id);

        if (!campanhaExistente) {
            return { ok: false, erro: "Campanha não encontrada" };
        }

        const campanhaAtualizada = {
            ...campanhaExistente,
            ...dadosAtualizados,
        };

        const erroValidacao = validarCampanha(campanhaAtualizada);
        if (erroValidacao) {
            return { ok: false, erro: erroValidacao };
        }

        const lista = campanhaRepository.listar();
        const nomeDuplicado = lista.find(
            (c) =>
            c.id !== id &&
            c.nome.toLowerCase().trim() === campanhaAtualizada.nome.toLowerCase().trim()
        );

        if (nomeDuplicado) {
            return { ok: false, erro: "Já existe outra campanha com esse nome" };
        }

        const editada = campanhaRepository.editar(id, campanhaAtualizada);

        if (!editada) {
            return { ok: false, erro: "Não foi possível editar a campanha" };
        }

            return { ok: true, data: editada };
        } catch {
            return { ok: false, erro: "Erro ao editar campanha" };
        }
    },
};