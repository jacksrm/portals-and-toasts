import { FC, useEffect, useMemo } from 'react';
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
  const classes = useMemo(() => [styles.toast, styles[mode]].join(' '), [mode]);

  useEffect(() => {
    if (autoClose) {
      setTimeout(() => {
        onClose();
      }, autoCloseTime);
    }
  }, [autoClose, autoCloseTime, onClose]);

  return (
    <div onClick={autoClose ? () => {} : onClose} className={classes}>
      {message}
    </div>
  );
};
