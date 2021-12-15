import { useState, useEffect } from 'react';
import { v4 } from 'uuid';

export const useToastPortal = () => {
  const [loaded, setLoaded] = useState(false);
  const [portalId] = useState(`toast-portal-${v4()}`);
  const [portalContainer] = useState<HTMLDivElement>(
    () => {
      const div = document.createElement('div')
      div.id = portalId;
      div.setAttribute('style', 'position: fixed; top: 10px; right: 10px;');
      return div;
    }
  );

  useEffect(() => {
    document.getElementsByTagName('body')[0].prepend(portalContainer);

    setLoaded(true);
    return () => {
      document.getElementsByTagName('body')[0].removeChild(portalContainer);
    };
  }, [portalId, portalContainer]);

  return {
    loaded,
    portalId,
    portalContainer,
  };
};
