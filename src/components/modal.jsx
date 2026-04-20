import { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./modal.css";
import { personagemController, campanhaController } from "./controller";
import dado from "../assets/d20.png";

export function Modal({ fechar }) {
    const { register, handleSubmit, watch, setValue } = useForm();

    const sistema = watch("sistema");
    const raca = watch("raca");
    const imagem = watch("imagem");

    const STR = Number(watch("STR")) || 0;
    const DES = Number(watch("DES")) || 0;
    const CON = Number(watch("CON")) || 0;
    const INT = Number(watch("INT")) || 0;
    const WIS = Number(watch("WIS")) || 0;
    const CAR = Number(watch("CAR")) || 0;
    const AGI = Number(watch("AGI")) || 0;
    const FOR = Number(watch("FOR")) || 0;
    const PRE = Number(watch("PRE")) || 0;
    const VIG = Number(watch("VIG")) || 0;

    const TFOR = Number(watch("TFOR")) || 0;
    const TDES = Number(watch("TDES")) || 0;
    const TCON = Number(watch("TCON")) || 0;
    const TINT = Number(watch("TINT")) || 0;
    const TSAB = Number(watch("TSAB")) || 0;
    const TCAR = Number(watch("TCAR")) || 0;

    function bonusRacialDnd(raca) {
        return {
        STR: raca === "humano" ? 1 : 0,
        DES:
            (raca === "humano" ? 1 : 0) +
            (raca === "elfo" || raca === "halfling" ? 2 : 0),
        CON: (raca === "humano" ? 1 : 0) + (raca === "anao" ? 2 : 0),
        INT: raca === "humano" ? 1 : 0,
        WIS: raca === "humano" ? 1 : 0,
        CAR: raca === "humano" ? 1 : 0,
        };
    }

    const bonus = bonusRacialDnd(raca);

    const atributosOP = {
        AGI,
        FOR,
        INT,
        PRE,
        VIG,
    };

    const atributosTor20 = {
        FOR: TFOR,
        DES: TDES,
        CON: TCON,
        INT: TINT,
        SAB: TSAB,
        CAR: TCAR,
    };

    const atributosFinais = {
        STR: STR + bonus.STR,
        DES: DES + bonus.DES,
        CON: CON + bonus.CON,
        INT: INT + bonus.INT,
        WIS: WIS + bonus.WIS,
        CAR: CAR + bonus.CAR,
    };

    function calcularMod(valor) {
        return Math.floor((valor - 10) / 2);
    }

    function formatMod(mod) {
        return mod >= 0 ? `+${mod}` : mod;
    }

  function rolarAtributo() {
    const rolls = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 6) + 1
    );

    rolls.sort((a, b) => a - b);
    rolls.shift();

    return rolls.reduce((a, b) => a + b, 0);
  }

  function rolarAtributoOP() {
    return Math.floor(Math.random() * 5) + 1;
  }

  function gerarAtributosOP() {
    setValue("AGI", rolarAtributoOP());
    setValue("FOR", rolarAtributoOP());
    setValue("INT", rolarAtributoOP());
    setValue("PRE", rolarAtributoOP());
    setValue("VIG", rolarAtributoOP());
  }

  function gerarAtributosTor20() {
    setValue("TFOR", rolarAtributo());
    setValue("TDES", rolarAtributo());
    setValue("TCON", rolarAtributo());
    setValue("TINT", rolarAtributo());
    setValue("TSAB", rolarAtributo());
    setValue("TCAR", rolarAtributo());
  }

  function gerarAtributos() {
    setValue("STR", rolarAtributo());
    setValue("DES", rolarAtributo());
    setValue("CON", rolarAtributo());
    setValue("INT", rolarAtributo());
    setValue("WIS", rolarAtributo());
    setValue("CAR", rolarAtributo());
  }

    function onSubmit(data) {
        let personagem = {
            ...data,
            nivel: data.nivel ? Number(data.nivel) : undefined,
        };

        if (data.sistema === "DnD") {
            personagem = {
            ...personagem,
            atributos: atributosFinais,
            };
        }

        if (data.sistema === "OP") {
            personagem = {
            ...personagem,
            nex: data.nex ? Number(data.nex) : undefined,
            atributos: atributosOP,
            };
        }

        if (data.sistema === "Tor20") {
            personagem = {
            ...personagem,
            nivel: data.nivel ? Number(data.nivel) : undefined,
            atributos: atributosTor20,
            };
        }

        const resultado = personagemController.criarPersonagem(personagem);

        if (!resultado.ok) {
            alert(resultado.erro);
            return;
        }

        fechar();
    }

  return (
    <div className="overlay" onClick={fechar}>
      <form
        className="modal"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label>
          Nome
          <input
            type="text"
            placeholder="ponha aqui o nome da sua ficha"
            {...register("nome")}
          />
        </label>

        <label>
          Descrição
          <input
            type="text"
            placeholder="ponha aqui a descrição da sua ficha"
            {...register("descricao")}
          />
        </label>

        <label>
          Imagem (URL)
          <input
            type="text"
            placeholder="URL da imagem"
            {...register("imagem")}
          />
        </label>

        {imagem && (
          <img
            src={imagem}
            alt="preview"
            width={150}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}

        <label>
          Sistema
          <select {...register("sistema")}>
            <option value="">Selecione</option>
            <option value="DnD">DnD</option>
            <option value="OP">OP</option>
            <option value="Tor20">Tor20</option>
          </select>
        </label>

        {sistema === "DnD" && (
          <div>
            <h2>Atributos</h2>

            <button type="button" onClick={gerarAtributos}>
              <img src={dado} width={18} alt="dado" /> Gerar atributos
            </button>

            <table>
              <tbody>
                {["STR", "DES", "CON", "INT", "WIS", "CAR"].map((attr) => (
                  <tr key={attr}>
                    <td>
                      {attr}: [
                      <input
                        type="number"
                        className="atributo_input"
                        {...register(attr)}
                      />
                      ]
                    </td>

                    <td>Total: {atributosFinais[attr]}</td>

                    <td>
                      MOD: {formatMod(calcularMod(atributosFinais[attr]))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2>Nível</h2>
            <input type="number" min={1} max={20} {...register("nivel")} />

            <h2>Raça</h2>
            <select {...register("raca")}>
              <option value="">Selecione</option>
              <option value="humano">Humano</option>
              <option value="anao">Anão</option>
              <option value="elfo">Elfo</option>
              <option value="halfling">Halfling</option>
            </select>

            <h2>Classe</h2>
            <select {...register("classe")}>
              <option value="">Selecione</option>
              <option value="mago">Mago</option>
              <option value="guerreiro">Guerreiro</option>
              <option value="clerigo">Clérigo</option>
              <option value="ladino">Ladino</option>
            </select>
          </div>
        )}

        {sistema === "OP" && (
            <div>
                <h2>Ordem Paranormal</h2>

                <button type="button" onClick={gerarAtributosOP}>
                <img src={dado} width={18} alt="dado" /> Gerar atributos
                </button>

                <table>
                <tbody>
                    {["AGI", "FOR", "INT", "PRE", "VIG"].map((attr) => (
                    <tr key={attr}>
                        <td>
                        {attr}: [
                        <input
                            type="number"
                            className="atributo_input"
                            {...register(attr)}
                        />
                        ]
                        </td>
                        <td>Total: {atributosOP[attr]}</td>
                    </tr>
                    ))}
                </tbody>
                </table>

                <h2>NEX</h2>
                <input type="number" min={0} max={99} {...register("nex")} />

                <h2>Origem</h2>
                <select {...register("origem")}>
                <option value="">Selecione</option>
                <option value="acadêmico">Acadêmico</option>
                <option value="agente de saúde">Agente de Saúde</option>
                <option value="artista">Artista</option>
                <option value="atleta">Atleta</option>
                <option value="policial">Policial</option>
                <option value="religioso">Religioso</option>
                </select>

                <h2>Classe</h2>
                <select {...register("classe")}>
                <option value="">Selecione</option>
                <option value="combatente">Combatente</option>
                <option value="especialista">Especialista</option>
                <option value="ocultista">Ocultista</option>
                </select>

                <h2>Trilha</h2>
                <input type="text" placeholder="Digite a trilha" {...register("trilha")} />
            </div>
        )}

        {sistema === "Tor20" && (
            <div>
                <h2>Tormenta 20</h2>

                <button type="button" onClick={gerarAtributosTor20}>
                <img src={dado} width={18} alt="dado" /> Gerar atributos
                </button>

                <table>
                <tbody>
                    {["TFOR", "TDES", "TCON", "TINT", "TSAB", "TCAR"].map((attr) => (
                    <tr key={attr}>
                        <td>
                        {attr.replace("T", "")}: [
                        <input
                            type="number"
                            className="atributo_input"
                            {...register(attr)}
                        />
                        ]
                        </td>
                        <td>
                        Total: {
                            {
                            TFOR: atributosTor20.FOR,
                            TDES: atributosTor20.DES,
                            TCON: atributosTor20.CON,
                            TINT: atributosTor20.INT,
                            TSAB: atributosTor20.SAB,
                            TCAR: atributosTor20.CAR,
                            }[attr]
                        }
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>

                <h2>Nível</h2>
                <input type="number" min={1} max={20} {...register("nivel")} />

                <h2>Raça</h2>
                <select {...register("raca")}>
                <option value="">Selecione</option>
                <option value="humano">Humano</option>
                <option value="anão">Anão</option>
                <option value="elfo">Elfo</option>
                <option value="goblin">Goblin</option>
                <option value="lefou">Lefou</option>
                <option value="qareen">Qareen</option>
                </select>

                <h2>Classe</h2>
                <select {...register("classe")}>
                <option value="">Selecione</option>
                <option value="arcanista">Arcanista</option>
                <option value="bárbaro">Bárbaro</option>
                <option value="bardo">Bardo</option>
                <option value="clérigo">Clérigo</option>
                <option value="guerreiro">Guerreiro</option>
                <option value="ladino">Ladino</option>
                <option value="paladino">Paladino</option>
                </select>

                <h2>Divindade</h2>
                <input
                type="text"
                placeholder="Digite a divindade"
                {...register("divindade")}
                />
            </div>
        )}

        <br />
        <br />
        <button type="submit">Salvar ficha</button>
      </form>
    </div>
  );
}

export function ModalCampanha({ fechar }) {
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    const resultado = campanhaController.criarCampanha(data);

    if (!resultado.ok) {
      alert(resultado.erro);
      return;
    }

    fechar();
  }

  return (
    <div className="overlay" onClick={fechar}>
      <form
        className="modal"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="nomeCampanha">
          Nome:
          <input
            id="nomeCampanha"
            type="text"
            placeholder="ponha aqui o nome da sua campanha"
            {...register("nome")}
          />
        </label>

        <label htmlFor="descricaoCampanha">
          Descrição:
          <input
            id="descricaoCampanha"
            type="text"
            placeholder="escreva aqui a descrição para sua campanha"
            {...register("descricao")}
          />
        </label>

        <label>
          Sistema:
          <select {...register("sistema")}>
            <option value="">Selecione</option>
            <option value="DnD">DnD</option>
            <option value="OP">OP</option>
            <option value="Tor20">Tor20</option>
          </select>
        </label>

        <br />
        <br />
        <button type="submit">Salvar campanha</button>
      </form>
    </div>
  );
}

export function ModalEditar({ fechar, id }) {
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const resultado = personagemController.buscarPersonagem(id);

    if (resultado.ok) {
        setValue("nome", resultado.data.nome);
        setValue("descricao", resultado.data.descricao);
    } else {
        alert(resultado.erro);
        fechar();
    }
  }, [id, setValue, fechar]);

  function onSubmit(data) {
    const resultado = personagemController.editarPersonagem(id, data);

    if (!resultado.ok) {
      alert(resultado.erro);
      return;
    }

    fechar();
  }

  return (
    <div className="overlay" onClick={fechar}>
      <form
        className="modal"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="nomeFEditar">
          Nome:
          <input
            id="nomeFEditar"
            type="text"
            placeholder="coloque aqui o novo nome do seu personagem"
            {...register("nome")}
          />
        </label>

        <label htmlFor="descricaoFEditar">
          Descrição:
          <input
            id="descricaoFEditar"
            type="text"
            placeholder="escreva aqui a descrição do seu personagem"
            {...register("descricao")}
          />
        </label>

        <br />
        <br />
        <button type="submit">Editar ficha</button>
      </form>
    </div>
  );
}


export function ModalEditarCampanha({ fechar, id }) {
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const resultado = campanhaController.buscarCampanha(id);

    if (resultado.ok) {
        setValue("nome", resultado.data.nome);
        setValue("descricao", resultado.data.descricao);
    } else {
        alert(resultado.erro);
        fechar();
    }
  }, [id, setValue, fechar]);

  function onSubmit(data) {
    const resultado = campanhaController.editarCampanha(id, data);

    if (!resultado.ok) {
      alert(resultado.erro);
      return;
    }

    fechar();
  }

  return (
    <div className="overlay" onClick={fechar}>
      <form
        className="modal"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="nomeEditar">
          Nome:
          <input
            id="nomeEditar"
            type="text"
            placeholder="coloque aqui o novo nome para sua campanha"
            {...register("nome")}
          />
        </label>

        <label htmlFor="descricaoEditar">
          Descrição:
          <input
            id="descricaoEditar"
            type="text"
            placeholder="escreva aqui a descrição para sua campanha"
            {...register("descricao")}
          />
        </label>

        <br />
        <br />
        <button type="submit">Editar ficha</button>
      </form>
    </div>
  );
}