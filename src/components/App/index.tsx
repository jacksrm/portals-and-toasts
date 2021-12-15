import { FC, useRef, useState } from 'react';

import { IAddMessageProps, ToastPortal } from 'components';

import styles from './styles.module.css';

export const App: FC = () => {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<TMode>(
    'info',
  );
  const [autoClose, setAutoClose] = useState(false);

  const toastPortalRef =
    useRef<{ addMessage: (props: IAddMessageProps) => void }>();

  const addToast = () => {
    toastPortalRef.current?.addMessage({
      mode,
      message: text,
    });
  };

  return (
    <div className={styles.main}>
      <h1>Portals and Toast</h1>
      <div className={styles.content}>
        <img
          alt="toaster"
          src="/assets/toaster.svg"
          // className={styles.toaster}
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (text) {
              addToast();
              setText('');
            }
          }}>
          <div className={styles.autoClose}>
            <input
              type="checkbox"
              checked={autoClose}
              onChange={(e) => setAutoClose(e.target.checked)}
            />
            <label>Auto Close</label>
          </div>

          <select value={mode} onChange={(e) => setMode(e.target.value as TMode)}>
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>

          <input
            type="text"
            value={text}
            placeholder="Toast Value"
            onChange={(e) => setText(e.target.value)}
          />

          <button type="submit">Submit</button>
        </form>
      </div>

      <ToastPortal
        autoClose={autoClose}
        ref={toastPortalRef}
      />
    </div>
  );
};
