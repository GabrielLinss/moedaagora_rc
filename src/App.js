import React, { useState, useEffect } from 'react';
import logo from './assets/icon.png';
import arg_flag from './assets/arg_flag.jpg';
import aus_flag from './assets/aus_flag.jpg';
import btc_image from './assets/btc_image.jpg';
import can_flag from './assets/can_flag.jpg';
import chi_flag from './assets/chi_flag.jpg';
import eth_image from './assets/eth_image.jpg';
import eur_flag from './assets/eur_flag.png';
import jap_flag from './assets/jap_flag.jpg';
import ltc_image from './assets/ltc_image.jpg';
import usa_flag from './assets/usa_flag.jpg';
import u_king_flag from './assets/un_king.jpg';
import suica_flag from './assets/suica.jpg';
import israel_flag from './assets/israel.jpg';
import ripple_flag from './assets/ripple.jpg';
import api from './services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    async function loadCurrencies() {
      try {

        const exchangeConfig = 'USD-BRL,EUR-BRL,ARS-BRL,ETH-BRL,LTC-BRL,BTC-BRL,CNY-BRL,JPY-BRL,USDT-BRL,CAD-BRL,AUD-BRL,GBP-BRL,CHF-BRL,ILS-BRL,XRP-BRL';

        const response = await api.get(exchangeConfig);

        const dolar = response.data["USD"];
        dolar.image = usa_flag;

        const dolarT = response.data["USDT"];
        dolarT.image = usa_flag;

        const dolarC = response.data["CAD"];
        dolarC.image = can_flag;

        const dolarA = response.data["AUD"];
        dolarA.image = aus_flag;

        const euro = response.data["EUR"];
        euro.image = eur_flag;

        const peso = response.data["ARS"];
        peso.image = arg_flag;

        const ethereum = response.data["ETH"];
        ethereum.image = eth_image;

        const litecoin = response.data["LTC"];
        litecoin.image = ltc_image;

        const bitcoin = response.data["BTC"];
        bitcoin.image = btc_image;

        const yuan = response.data["CNY"];
        yuan.image = chi_flag;

        const iene = response.data["JPY"];
        iene.image = jap_flag;

        const libraEsterlina = response.data["GBP"];
        libraEsterlina.image = u_king_flag;

        const francoSuico = response.data["CHF"];
        francoSuico.image = suica_flag;

        const novoShekel = response.data["ILS"];
        novoShekel.image = israel_flag;

        const ripple = response.data["XRP"];
        ripple.image = ripple_flag;

        setCurrencies([dolar, dolarT, dolarC, dolarA, euro, peso, ethereum, litecoin, bitcoin, yuan, iene, libraEsterlina, francoSuico, novoShekel, ripple]);
      } catch (error) {
        toast.error('Erro ao carregar cotações')
      }
    }

    loadCurrencies();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
        <a className="navbar-brand" href="/">
          <img
            src={logo}
            width="30" height="30" alt="" />
          Moeda Agora
        </a>
        <span className="navbar-text ml-auto">
          Atualizado a cada 3 min
        </span>
      </nav>
      <div className="container-fluid">
        <center>
          <div className="row my-5">
            {currencies.map(currency => (
              <div key={currency.name} className="col-lg-4 col-md-4 col-xs-12 col-sm-6 col-xl-3 mb-3">
                <div className="card" style={{ width: '20rem' }}>
                  <img
                    src={currency.image}
                    className="card-img-top"
                    height="150"
                    alt="" />
                  <div className="card-body">
                  <p className="card-text">Código: {currency.code}</p>
                  <p className="card-text">{currency.name}</p>
                  <p className="card-text">Mais alto: R$ {new Intl.NumberFormat('pt-BR').format(currency.high)}</p>
                  <p className="card-text">Mais Baixo: R$ {new Intl.NumberFormat('pt-BR').format(currency.low)}</p>
                  {currency.pctChange > 0 && <p className="card-text text-success">Última variação: {currency.pctChange}%</p>}
                  {currency.pctChange === '0' && <p className="card-text">Última variação: {currency.pctChange}%</p>}
                  {currency.pctChange < 0 && <p className="card-text text-danger">Última variação: {currency.pctChange}%</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </center>
      </div>

      <footer className="container">
        <div className="row">
          <div className="col">
            <center>
              <span>
                Desenvolvido por&nbsp;
                <strong>
                  <a href="https://github.com/GabrielLinss" target="_blank" rel="noopener noreferrer">
                    Gabriel Lins
                  </a>
                </strong>
              </span>
            </center>
          </div>
        </div>
      </footer>

      <ToastContainer />
    </>
  );
}

export default App;
