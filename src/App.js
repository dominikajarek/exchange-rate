import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Currency from './Currency';

import './App.css';

const url = 'https://cors-anywhere.herokuapp.com/https://api.exchangeratesapi.io/latest';

function App() {

  const [currencies, setCurrency] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchange, setExchange] = useState();
  const [amountInFrom, setAmountInFrom] = useState(true);
  const [lastUpdate, setLastUpdate] = useState();

  let fromAmount;
  let toAmount;

  if (amountInFrom) {
    fromAmount = amount;
    toAmount = amount * exchange;
  } else {
    fromAmount = amount / exchange;
    toAmount = amount;
  }

  useEffect(() => {
    axios.get(url)
      .then(response => {
        const result = response.data;
        const firstCurrency = Object.keys(result.rates)[0];
        setCurrency([result.base, ...Object.keys(result.rates)]);
        setFromCurrency(result.base);
        setToCurrency(firstCurrency);
        setExchange(result.rates[firstCurrency]);
        setLastUpdate(result.date);
      })
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      axios.get(`${url}?base=${fromCurrency}&symbols=${toCurrency}`)
      .then(response => {
        const result = response.data;
        setExchange(result.rates[toCurrency]);
      })

    return () => {
      console.log('Cleaning up');
    }
    }
  }, [fromCurrency, toCurrency]);

  const handleFromAmountChange = ((event) => {
    setAmount(event.target.value);
    setAmountInFrom(true);
  })

  const handleToAmountChange = ((event) => {
    setAmount(event.target.value);
    setAmountInFrom(false);
  })

  return (
        <div className='container'>
          <p className="text">CURRENCY CONVERTER</p>
            <Currency 
            currencies={ currencies }
            selectedCurrency={ fromCurrency }
            amount={ fromAmount } 
            onChangeCurrency={ event => setFromCurrency(event.target.value) } 
            onChangeAmount={ handleFromAmountChange }
             />
            <Currency 
            currencies={ currencies }
            selectedCurrency={ toCurrency }
            amount={ toAmount } 
            onChangeCurrency={ event => setToCurrency(event.target.value) }
            onChangeAmount={ handleToAmountChange }
              />
            <p className='text1'>Last updated: { lastUpdate }</p>
        </div>
    );
}

export default App;
