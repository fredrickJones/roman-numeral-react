import React, { useState } from 'react';
import Definitions from './Definitions';
import Buttons from './Buttons';

const validateForm = (errors) => {
  console.log('ERRORS IN THE FORM ==> ', errors);
  let valid = true;
  Object.values(errors).forEach((val) => {
    console.log('EACH ERROR ==> ', val);
    val.length > 0 && (valid = false);
  });
  return valid;
};

const Translate = () => {
  const [romans, setRomans] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState('');

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (validateForm(error)) {
      const converted = convertRomanNums(romans);
      setResult(converted);
    } else {
      // this.clearForm(); // setState({...initialState});
    }
  };

  const convertRomanNums = (numerals) => {
    const romanNumerals = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000,
    };

    return [...numerals]
      .reverse()
      .reduce(
        (accum, current, index, original) =>
          !index || romanNumerals[current] >= romanNumerals[original[index - 1]]
            ? accum + romanNumerals[current]
            : accum - romanNumerals[current],
        0
      );
  };

  const onFormReset = () => {
    setRomans('');
    setResult('');
    setError('');
    console.log('RESET ROMANS ==> ', romans);
    console.log('RESET RESULTS ==> ', result);
    console.log('RESET ERROR ==> ', error);
  };

  const handleChange = (event) => {
    event.preventDefault();

    const numeralRegEx = RegExp(
      /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/
    );
    const { name, value } = event.target;

    switch (name) {
      case 'numerals':
        const capRomans = value.toUpperCase();
        const error = numeralRegEx.test(capRomans)
          ? ''
          : 'Not a valid Roman Numeral';
        setError(error);
        setRomans(capRomans);
        break;
      default:
        break;
    }
  };

  return (
    <div className="roman-numeral">
      <Definitions />

      <form onSubmit={onFormSubmit} className="roman-numeral__convert-form">
        <div>
          <label>Enter Roman Numerals</label>
          <input
            type="text"
            name="numerals"
            value={romans}
            onChange={(e) => handleChange(e)}
            className="roman-numeral__convert-form__input"
          />
          {error.length > 0 && (
            <small className="roman-numeral__convert-form__error">
              {error}
            </small>
          )}
        </div>

        <Buttons onFormSubmit={onFormSubmit} onFormReset={onFormReset} />
      </form>

      <div className="roman-numeral__result">
        {result > 0 && <span>conversion: {result}</span>}
      </div>
    </div>
  );
};

export default Translate;
