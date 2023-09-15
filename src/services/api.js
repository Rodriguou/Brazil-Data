import axios from 'axios';

export async function buscarDados(nome) {
  try {
    // Verifica se o parâmetro "nome" está vazio ou contém apenas espaços em branco
    if (nome.trim() === '') {
      // Se estiver vazio, retorna um objeto com arrays vazios para "periodosSelecionados" e uma string vazia para "resultadoNome"
      return { periodosSelecionados: [], resultadoNome: '' };
    }

    // Variável para consumir a API usando o parâmetro "nome" que vem do input
    const resposta = await axios.get(
      `https://servicodados.ibge.gov.br/api/v2/censos/nomes/${nome}`
    );

    // Verifica se a resposta da API contém dados e se os dados não estão vazios
    if (resposta.data && resposta.data.length > 0) {
      
      const dadosResposta = resposta.data[0]; // Variável que pega os dados da API
      const nomeEncontrado = dadosResposta.nome; // Variável que extrai o nome de dentro da API

      // Array com os períodos desejados
      const periodosDesejados = ["[1980,1990[", "[1990,2000[", "[2000,2010["];

      // Variável que filtra os dados para incluir apenas os itens com períodos que estão no array "periodosDesejados"
      const periodosSelecionados = dadosResposta.res.filter(item =>
        periodosDesejados.includes(item.periodo)
      );

      // Retorna um objeto contendo os períodos filtrados (periodosSelecionados) e o nome encontrado (resultadoNome)
      return { periodosSelecionados, resultadoNome: nomeEncontrado };
    } else {
      // Se não houver dados na resposta da API, retorna um objeto com arrays vazios para "periodosSelecionados" e uma string vazia para "resultadoNome"
      return { periodosSelecionados: [], resultadoNome: '' };
    }
  } catch (erro) {
    // Tratamento de erro ao tentar consumir a API
    console.error('Erro ao buscar dados:', erro);

    // Se houver um erro, retorna um objeto com arrays vazios para "periodosSelecionados" e uma string vazia para "resultadoNome"
    return { periodosSelecionados: [], resultadoNome: '' };
  }
}