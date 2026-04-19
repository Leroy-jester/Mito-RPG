function criarRepository(KEY) {
  function carregar() {
    try {
      const dados = localStorage.getItem(KEY);
      return dados ? JSON.parse(dados) : [];
    } catch {
      return [];
    }
  }

  function salvarLista(lista) {
    localStorage.setItem(KEY, JSON.stringify(lista));
  }

  return {
    salvar(item) {
      const lista = carregar();
      lista.push(item);
      salvarLista(lista);
      return item;
    },

    listar() {
      return carregar();
    },

    buscarPorId(id) {
      return carregar().find((item) => item.id === id);
    },

    remover(id) {
      const lista = carregar();
      const existe = lista.some((item) => item.id === id);

      if (!existe) return false;

      const novaLista = lista.filter((item) => item.id !== id);
      salvarLista(novaLista);
      return true;
    },

    editar(id, dadosAtualizados) {
      const lista = carregar();
      const index = lista.findIndex((item) => item.id === id);

      if (index === -1) return false;

      lista[index] = { ...lista[index], ...dadosAtualizados };
      salvarLista(lista);
      return lista[index];
    },
  };
}

export const personagemRepository = criarRepository("personagens");
export const campanhaRepository = criarRepository("campanhas");