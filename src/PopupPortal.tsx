import {ReactNode, useEffect, useId, useState} from 'react';
import {createPortal} from 'react-dom';

const POPUP_CONTAINER_URL = '/popup.html';

interface PopupPortalProps {
  children: ReactNode;
  height?: number;
  width?: number;
  onClose?: () => void;
}

export function PopupPortal({
  children,
  height = 400,
  width = 400,
  onClose,
}: PopupPortalProps): JSX.Element | null {
  const id = useId();
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const popup = window.open(
      POPUP_CONTAINER_URL,
      id,
      `width=${width},height=${height}`,
    );
    popup?.addEventListener('DOMContentLoaded', () => {
      const container = popup?.document.getElementById('popup-root');
      container != null && setContainer(container);
    });

    const beforeunloadListener = () => onClose && onClose();
    popup?.addEventListener('beforeunload', beforeunloadListener);

    return () => {
      popup?.removeEventListener('beforeunload', beforeunloadListener);
      popup?.close();
    };
  }, [height, id, onClose, width]);

  return container != null ? createPortal(children, container) : null;
}
