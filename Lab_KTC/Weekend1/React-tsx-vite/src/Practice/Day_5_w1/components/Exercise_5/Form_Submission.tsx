import React, { useState } from 'react'; 
import styles from './Form_Submission.module.css';

const FormSubmission: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  const [submissionMessage, setSubmissionMessage] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (submissionMessage) {
      setSubmissionMessage(null);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const submittedValue = inputValue.trim(); 

    const message = submittedValue === ''
      ? 'Bạn đã gửi: không có gì'
      : `Bạn đã gửi: ${submittedValue}`;

    setSubmissionMessage(message);

    setInputValue('');

    setTimeout(() => {
      setSubmissionMessage(null);
    }, 3000); 
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Gửi biểu mẫu</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          className={styles.inputField}
          placeholder="Nhập gì đó vào đây..."
          value={inputValue} 
          onChange={handleInputChange}
        />

        <button type="submit" className={styles.submitButton}>
          Gửi
        </button>
      </form>

      {submissionMessage && ( 
        <div className={styles.messageBox}>
          <p>{submissionMessage}</p>
        </div>
      )}
    </div>
  );
};

export default FormSubmission; 