import React from 'react';

const Buttons = ({ onFormSubmit, onFormReset }) => {
  return (
    <div className="roman-numeral__convert-form__actions">
      <button
        type="submit"
        className={'button roman-numeral__convert-form__actions__submit'}
        onClick={onFormSubmit}
      >
        Convert
      </button>
      <button
        type="button"
        className="button roman-numeral__convert-form__actions__reset"
        onClick={onFormReset}
      >
        Reset
      </button>
    </div>
  );
};

export default Buttons;
