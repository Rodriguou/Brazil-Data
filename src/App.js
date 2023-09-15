import React, { useState } from 'react';
import './App.css';
import brazilLogo from './images/brazil-logo.svg'; 
import lupeIcon from './images/lupe-icon.svg'; 
import brazilianNamesIcon from './images/brazilian-names-icon.svg';
import { buscarDados } from './services/api';

function App() {
  const [nome, setNome] = useState(''); // Variável de estado que é utilizada para pegar o que foi digitado no input quando o botão é apertado
  const [periodosSelecionados, setPeriodosSelecionados] = useState([]); // Variável de estado que consome os valores dos períodos desejados de dentro da API
  const [resultadoNome, setResultadoNome] = useState(''); // Variável de estado que consome o nome de dentro da API

  // Função que, ao apertar o botão, consome o nome e os valores dos períodos desejados para colocar no card
  const Botao = async () => {
    const { periodosSelecionados, resultadoNome } = await buscarDados(nome);
    setPeriodosSelecionados(periodosSelecionados);
    setResultadoNome(resultadoNome);
  };

  // Função que habilita e desabilita o modo escuro
  const darkMode = () => {
    const darkBody = document.body
    const darkHeader = document.querySelector('header')
    const darkLogo = document.querySelector("header nav .logo")
    const darkContainer = document.getElementById("light-dark-mode-container")
    const darkCircle = document.querySelector(".light-dark-mode-container .circle")
    const darkH1 = document.querySelector("#main-text")
    const darkP = document.querySelector("main div p")
    const darkModeP = document.getElementById('dark-mode')
    const lightModeP = document.getElementById('light-mode')

    const array = [darkBody, darkLogo, darkContainer, darkCircle, darkH1, darkP, darkModeP, lightModeP, darkHeader]
      array.map((elemento) => {
          elemento.classList.toggle('dark-mode')
          return null
      })
  }

  return (
    <div>
      <header>
        <nav>
          <a className="logo" href='/'>
            <img src={brazilLogo} alt="Brazil Data Logo" />
            <h2>BRAZIL DATA</h2>
          </a>
          <div className="light-dark-mode-container" id="light-dark-mode-container" onClick={darkMode}>
            <p id="light-mode">Dark Mode</p>
            <p id="dark-mode">Light Mode</p>
            <div className="circle"></div>
          </div>
        </nav>
      </header>

      <main>
        <div>
          <h1 id='main-text'>Bem-vindo(a) ao <span>Brazil Data</span></h1>
          <p>Pesquise os registros de nomes no Brasil entre 1980 e 2010.</p>

          <div className="search-container">
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)} // Função que contém um evento que muda o valor da variável de estado "nome" à medida que o usuário digita
              placeholder="Nome"
              maxLength={11}
            />
            <button onClick={Botao}>
              <img src={lupeIcon} alt="lupe icon" id="lupe" />
            </button>
          </div>
        </div>

        <img src={brazilianNamesIcon} alt="Nomes Brasileiros" />
      </main>

      <div className="cardsss">
        <div className="card-container">
          <div className="card">
            <div className="front">
              {periodosSelecionados.length > 0 && ( // Apenas mostra o nome se houver dados de pelo menos um dos períodos desejados
                <p className="title">{resultadoNome}</p>
              )}
              <p className="text">Descubra quantas pessoas compartilham este nome entre 1980 e 2010.</p>
            </div>

            <div className="back">
              <div>
                {periodosSelecionados.some(periodoSelecionado => periodoSelecionado.periodo === "[1980,1990[") && ( // Verifica se há dados sobre o período "[1980,1990[" na API
                  <p>1980-1990: {periodosSelecionados.find(periodoSelecionado => periodoSelecionado.periodo === "[1980,1990[").frequencia}</p> // Caso haja dados, consome o valor da frequência desse período
                )}
              </div>
              <div>
                {periodosSelecionados.some(periodoSelecionado => periodoSelecionado.periodo === "[1990,2000[") && ( // Verifica se há dados sobre o período "[1990,2000[" na API
                  <p>1990-2000: {periodosSelecionados.find(periodoSelecionado => periodoSelecionado.periodo === "[1990,2000[").frequencia}</p> // Caso haja dados, consome o valor da frequência desse período
                )}
              </div>
              <div>
                {periodosSelecionados.some(periodoSelecionado => periodoSelecionado.periodo === "[2000,2010[") && ( // Verifica se há dados sobre o período "[2000,2010[" na API
                  <p>2000-2010: {periodosSelecionados.find(periodoSelecionado => periodoSelecionado.periodo === "[2000,2010[").frequencia}</p> // Caso haja dados, consome o valor da frequência desse período
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;