import React, { EventHandler, SyntheticEvent, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Block } from '../block';
import './modal.css';

interface ModalButtonProperties {
  id?: number | string,
  disabled?: boolean,
  style?: React.StyleHTMLAttributes<HTMLButtonElement>,
  className?: string,
  onClick: EventHandler<SyntheticEvent<HTMLButtonElement, MouseEvent>>
}

interface ModalProperties {
  title?: JSX.Element,
  buttons?: JSX.Element,
}

export const Modal = ({ title, children, buttons }: React.PropsWithChildren<ModalProperties>) => {

  useEffect(() => {
    document.querySelector('html')?.classList.add('modal-visible');
    return () => {
      document.querySelector('html')?.classList.remove('modal-visible');
    }
  })

  return createPortal(
    (
      <div className="modal">
        <Block title={<>{title}</>} footer={buttons} className="modal-content">
          {children}
        </Block>
      </div>
    ),
    window.document.body
  );

}
