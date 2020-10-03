import React, { EventHandler, SyntheticEvent } from 'react';
import { createPortal } from 'react-dom';
import { classNameCompiler } from '../../utils';
import { Block } from '../block';

interface ModalButtonProperties {
  id: number | string,
  disabled: boolean,
  style: React.StyleHTMLAttributes<HTMLButtonElement>,
  className?: string,
  onClick: EventHandler<SyntheticEvent<HTMLButtonElement, MouseEvent>>
}

interface ModalProperties {
  title?: string,
  buttons?: Array<typeof ModalButton>,
}

export const ModalButton = ({ id, children, disabled, style, className, onClick }: React.PropsWithChildren<ModalButtonProperties>) => {
  return (
    <button onClick={onClick} disabled={disabled} style={style} className={classNameCompiler(className)}>
      {children}
    </button>
  );
}

export const Modal = ({ title, children, buttons }: React.PropsWithChildren<ModalProperties>) => {

  return createPortal(
    <Block title={title} footer={buttons}>
      {children}
    </Block>,
    window.document.body
  );

}

Modal.prototype.activeModalStack = [] as Array<typeof Modal>;
