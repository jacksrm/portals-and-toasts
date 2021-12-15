import { Toast } from 'components';
import { useToastPortal } from 'hooks';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { createPortal } from 'react-dom';
import { v4 } from 'uuid';

import styles from './styles.module.css';

interface IToastsPortalProps {
  autoClose?: boolean;
  autoCloseTime?: number;
}

interface IToastData {
  id: string;
  mode: TMode;
  message: string;
}

export interface IAddMessageProps {
  message: string;
  mode: TMode;
}

export const ToastPortal = forwardRef<unknown, IToastsPortalProps>(
  ({ autoClose, autoCloseTime = 5000 }, ref) => {
    const [toasts, setToasts] = useState<IToastData[]>([]);

    const { loaded, portalContainer } = useToastPortal();

    const removeToast = (id: string) => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    // const addMessage = (toast: IAddMessageProps) => {
    //   setToasts((prev) => [...prev, { ...toast, id: v4() }]);
    // };

    useImperativeHandle(ref, () => ({
      addMessage: (toast: IAddMessageProps) => {
        setToasts((prev) => [...prev, { ...toast, id: v4() }]);
      },
    }));

    if (loaded) {
      return createPortal(
        <div 
          className={styles.toastContainer}
        >
          {toasts.map((toast) => (
            <Toast
              message={toast.message}
              key={toast.id}
              mode={toast.mode}
              onClose={() => removeToast(toast.id)}
              autoClose={autoClose}
              autoCloseTime={autoCloseTime}
            />
          ))}
        </div>,
        portalContainer,
      );
    }

    return <></>;
  },
);
