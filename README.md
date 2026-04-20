# Sistema de Fichas e Campanhas RPG

Aplicação web desenvolvida em React para criação, gerenciamento e organização de fichas de personagens e campanhas de RPG.

---

## Funcionalidades

### Fichas de Personagem
- Criar, editar e remover fichas
- Visualização detalhada com:
  - Nome, descrição
  - Classe, raça, nível, etc.
  - Atributos dinâmicos
- Upload de imagem do personagem
- Suporte a múltiplos sistemas:
  - DnD
  - Ordem Paranormal (OP)
  - Tormenta20

---

### Favoritos
- Marcar fichas como favoritas
- Botão de estrela ⭐ na ficha
- Página dedicada `/favoritos`
- Persistência via localStorage

---

### Campanhas
- Criar e gerenciar campanhas
- Associar fichas à campanha
- Filtro automático por sistema (DnD, OP, Tor20)
- Adicionar/remover fichas da campanha
- Interface dedicada para cada campanha

---

### Interface dinâmica por sistema
Cada sistema possui um estilo visual próprio:

- **DnD / Tormenta20**
  - Visual estilo papel antigo
  - Tons quentes e textura

- **Ordem Paranormal**
  - Estilo terminal retrô
  - Fonte monospace
  - Cores verdes neon

---

### Busca e Filtros
- Busca por nome de ficha ou campanha
- Filtro por sistema
- Interface responsiva e amigável

---

## Arquitetura

O projeto segue uma separação em camadas:

```
components/
├── controller
├── service
├── repository

```


### Repository
- Responsável pelo acesso ao `localStorage`
- CRUD básico

### Service
- Regras de negócio
- Validações
- Lógica de favoritos e campanhas

### Controller
- Intermedia entre UI e Service
- Retorna `{ ok, data, erro }`

---

## Persistência

- Utiliza `localStorage`
- Dados salvos automaticamente no navegador
- Estrutura baseada em JSON

---

## Tecnologias

- React
- React Router DOM
- JavaScript (ES6+)
- CSS puro

---

## Estrutura do Projeto

```
src/
├── components/
│   ├── NavBar
│   ├── card
│   ├── modal
│   ├── controller/
│   ├── service/
│   └── repository/
│
├── pages/
│   ├── home
│   ├── ficha
│   ├── fichas
│   ├── campanhas
│   ├── campanha
│   └── favoritos
│
├── styles/
│   └── css files
```

---

## Como rodar o projeto

```bash
# instalar dependências
npm install

# rodar projeto
npm run dev