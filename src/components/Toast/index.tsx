import { FC, useEffect, useMemo, useState } from 'react';
import styles from './styles.module.css';

interface IToastProps {
  mode: TMode;
  onClose: () => void;
  message: string;
  autoClose?: boolean;
  autoCloseTime: number;
}

export const Toast: FC<IToastProps> = ({
  message,
  mode,
  onClose,
  autoClose,
  autoCloseTime,
}) => {
  const [timer, setTimer] = useState(autoCloseTime + 1000);
  const toastClasses = useMemo(() => [styles.toast, styles[mode]].join(' '), [mode]);

  useEffect(() => {
    if (autoClose) {
      const INTERVAL_TIME = 10
      const interval = setInterval(() => {
        setTimer((prev) => prev - INTERVAL_TIME)
      }, INTERVAL_TIME);

      setTimeout(() => {
        onClose();
        clearInterval(interval);
      }, autoCloseTime + 10);

      return () => {
        clearInterval(interval);
      }
    }
  }, [autoClose, autoCloseTime, onClose]);

  return (
    <div onClick={autoClose ? () => {} : onClose} className={toastClasses}>
      <span>{message}</span>
      <div 
        style={{ width: `${((timer - 1000) * 100) / autoCloseTime}%` }} 
        className={styles[`${mode}-after`]}></div>
    </div>
  );
};
