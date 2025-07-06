import React, { useState } from 'react';
import styles from './Calculator.module.css';

// Định nghĩa các loại nút để dễ quản lý và tạo kiểu
type ButtonType = 'digit' | 'operator' | 'clear' | 'equals' | 'decimal';

// Cấu trúc của mỗi nút bấm
interface CalculatorButton {
  label: string; // Chữ hiển thị trên nút
  type: ButtonType; // Loại nút (số, phép toán, xóa, bằng, thập phân)
  value: string; // Giá trị thực tế của nút
  gridColumn?: string; // Để nút "=" chiếm nhiều cột
}

// Định nghĩa các nút bấm của máy tính
const calculatorButtons: CalculatorButton[] = [
  { label: '7', type: 'digit', value: '7' },
  { label: '8', type: 'digit', value: '8' },
  { label: '9', type: 'digit', value: '9' },
  { label: '÷', type: 'operator', value: '/' },
  { label: '4', type: 'digit', value: '4' },
  { label: '5', type: 'digit', value: '5' },
  { label: '6', type: 'digit', value: '6' },
  { label: '×', type: 'operator', value: '*' },
  { label: '1', type: 'digit', value: '1' },
  { label: '2', type: 'digit', value: '2' },
  { label: '3', type: 'digit', value: '3' },
  { label: '-', type: 'operator', value: '-' },
  { label: '0', type: 'digit', value: '0' },
  { label: '.', type: 'decimal', value: '.' },
  { label: 'C', type: 'clear', value: 'C' },
  { label: '+', type: 'operator', value: '+' },
  { label: '=', type: 'equals', value: '=', gridColumn: 'span 4' }, // Nút "=" chiếm 4 cột
];

// Hàm thực hiện các phép tính cơ bản
const calculate = (num1: number, num2: number, operator: string): number | 'Error' => {
  switch (operator) {
    case '+': return num1 + num2;
    case '-': return num1 - num2;
    case '*': return num1 * num2;
    case '/':
      if (num2 === 0) return 'Error'; // Chia cho 0
      return num1 / num2;
    default: return 0; // Trường hợp không xác định
  }
};

const Calculator: React.FC = () => {
  // Trạng thái hiển thị trên màn hình máy tính (chuỗi)
  const [displayValue, setDisplayValue] = useState('0');
  // Giá trị số đầu tiên hoặc số đang được nhập
  const [currentValue, setCurrentValue] = useState<string | null>(null);
  // Giá trị số trước đó (số hạng thứ nhất)
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  // Phép toán đang chờ thực hiện
  const [operator, setOperator] = useState<string | null>(null);
  // Cờ báo hiệu có đang chờ nhập số hạng thứ hai không
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  // Cờ báo hiệu có lỗi không
  const [isError, setIsError] = useState(false);

  // Hàm xử lý khi bấm các nút số (0-9) và dấu thập phân (.)
  const handleDigitClick = (digit: string) => {
    if (isError) return; // Không làm gì nếu đang có lỗi

    // Nếu đang chờ số hạng thứ hai hoặc màn hình đang hiển thị '0'
    if (waitingForOperand || displayValue === '0') {
      setDisplayValue(digit);
      setCurrentValue(digit);
      setWaitingForOperand(false);
    } else {
      // Nếu là dấu thập phân và đã có dấu thập phân rồi thì không cho nhập nữa
      if (digit === '.' && displayValue.includes('.')) {
        return;
      }
      // Nối thêm số/dấu thập phân vào chuỗi hiện tại
      setDisplayValue(prev => prev + digit);
      setCurrentValue(prev => (prev ? prev + digit : digit));
    }
  };

  // Hàm xử lý khi bấm các nút phép toán (+, -, *, /)
  const handleOperatorClick = (nextOperator: string) => {
    if (isError) return;

    // Nếu chưa có số nào được nhập, coi số đầu tiên là 0
    const inputNum = parseFloat(currentValue || displayValue);

    // Nếu đã có số hạng trước và phép toán, thì tính toán kết quả tạm thời
    if (previousValue !== null && operator !== null && !waitingForOperand) {
      const result = calculate(previousValue, inputNum, operator);
      if (result === 'Error') {
        setDisplayValue('Error');
        setIsError(true);
        resetCalculator(); // Xóa trạng thái sau khi hiển thị lỗi
        return;
      }
      setPreviousValue(result as number);
      setDisplayValue(result.toString());
    } else {
      setPreviousValue(inputNum);
    }

    setOperator(nextOperator);
    setWaitingForOperand(true); // Báo hiệu đang chờ nhập số hạng thứ hai
    setCurrentValue(null); // Xóa giá trị hiện tại để chuẩn bị cho số mới
  };

  // Hàm xử lý khi bấm nút "="
  const handleEqualsClick = () => {
    if (isError) return;

    // Nếu chưa có số hạng thứ hai hoặc chưa có phép toán thì không làm gì
    if (previousValue === null || operator === null || currentValue === null) {
      return;
    }

    const inputNum = parseFloat(currentValue);
    const result = calculate(previousValue, inputNum, operator);

    if (result === 'Error') {
      setDisplayValue('Error');
      setIsError(true);
    } else {
      setDisplayValue(result.toString());
      setPreviousValue(result as number); // Kết quả trở thành số hạng đầu tiên cho phép tính tiếp theo
      setOperator(null); // Xóa phép toán
      setWaitingForOperand(true); // Báo hiệu đang chờ nhập số mới
    }
    setCurrentValue(null); // Xóa giá trị hiện tại
  };

  // Hàm xử lý khi bấm nút "C" (Clear)
  const handleClearClick = () => {
    resetCalculator();
  };

  // Hàm đặt lại tất cả trạng thái của máy tính
  const resetCalculator = () => {
    setDisplayValue('0');
    setCurrentValue(null);
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setIsError(false);
  };

  return (
    <div className={styles.calculator}>
      {/* Màn hình hiển thị */}
      <div className={`${styles.display} ${isError ? styles.error : ''}`}>
        {displayValue}
      </div>

      {/* Các nút bấm */}
      <div className={styles.buttonsGrid}>
        {calculatorButtons.map((button) => (
          <button
            key={button.label} // Key duy nhất cho mỗi nút
            className={`${styles.button} ${styles[button.type]}`} // Thêm class theo loại nút
            style={button.gridColumn ? { gridColumn: button.gridColumn } : {}} // Áp dụng style cho nút "="
            onClick={() => {
              if (button.type === 'digit' || button.type === 'decimal') {
                handleDigitClick(button.value);
              } else if (button.type === 'operator') {
                handleOperatorClick(button.value);
              } else if (button.type === 'equals') {
                handleEqualsClick();
              } else if (button.type === 'clear') {
                handleClearClick();
              }
            }}
            disabled={isError && button.type !== 'clear'} // Vô hiệu hóa nút khi có lỗi (trừ nút C)
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator; // Cho phép các file khác sử dụng component này