import { useState } from 'react';
import Action from './Actions.jsx';
import './Form.scss';

export function Form({ children, onSubmit, onCancel }) {
  // Initialisation ------------------------------
  // State ---------------------------------------
  // Handlers ------------------------------------
  // View ----------------------------------------
  return (
    <div className='Form'>
      <div className='FormTray'>{children}</div>
      <Action.Tray>
        <Action.Submit showText onClick={onSubmit} />
        <Action.Cancel showText buttonText='Cancel' onClick={onCancel} />
      </Action.Tray>
    </div>
  );
}

function Item({ children, label, advice, error }) {
  // Initialisation ------------------------------
  // State ---------------------------------------
  // Handlers ------------------------------------
  // View ----------------------------------------
  return (
    <div className='FormItem'>
      <label className='FormLabel'>{label}</label>
      {advice && <p className='FormAdvice'>{advice}</p>}
      {children}
      {error && <p className='FormError'>{error}</p>}
    </div>
  );
}

function useForm(initialRecord, { html2js }, { isValid, errorMessage }, onSubmit) {
  // Initialisation ------------------------------
  // State ---------------------------------------
  const [record, setRecord] = useState(initialRecord);
  const [errors, setErrors] = useState(
    Object.keys(isValid).reduce((accum, key) => ({ ...accum, [key]: null }), {})
  );

  const isValidRecord = (record) => {
    let isRecordValid = true;
    Object.keys(isValid).forEach((key) => {
      if (isValid[key](record[key])) {
        errors[key] = null;
      } else {
        errors[key] = errorMessage[key];
        isRecordValid = false;
      }
    });
    return isRecordValid;
  };

  // Handlers ------------------------------------
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecord({ ...record, [name]: html2js[name](value) });
  };

  const handleSubmit = () => {
    isValidRecord(record) && onSubmit(record);
    setErrors({ ...errors });
  };

  // Return --------------------------------------
  return [record, errors, handleChange, handleSubmit];
}

// Compose compound component --------------------
Form.Item = Item;
Form.useForm = useForm;

export default Form;
