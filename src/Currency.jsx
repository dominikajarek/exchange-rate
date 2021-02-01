import React from "react";

import "./App.css";

const Currency = (props) => {
    const {
        currencies,
        selectedCurrency,
        amount,
        onChangeCurrency,
        onChangeAmount,
    } = props;

    return (
        <div className="inputs">
            <input
                type="number"
                className="input"
                value={amount}
                onChange={onChangeAmount}
            />
            <select
                className="select"
                value={selectedCurrency}
                onChange={onChangeCurrency}
            >
                {currencies.map((currency) => (
                    <option className="option" key={currency} value={currency}>
                        {currency}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Currency;
