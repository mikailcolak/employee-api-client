import React from 'react';
import { classNameCompiler } from '../../utils';
import './block.css';

interface BlockProperties {
  title?: JSX.Element,
  className?: Array<string> | string,
  footer?: JSX.Element
}

export const Block = ({title, className, children, footer}: React.PropsWithChildren<BlockProperties>) => (
  <div className={classNameCompiler(className, "block")}>
    {title && (
      <div className="block-header">
        {title}
      </div>
    )}
    <div className="block-body">
      {children}
    </div>
    {footer && (
      <div className="block-footer">
        {footer}
      </div>
    )}
  </div>
);
