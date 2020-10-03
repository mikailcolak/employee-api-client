import React from 'react';
import { classNameCompiler } from '../../utils';
import './block.css';

interface BlockProperties {
  title?: string,
  className?: Array<string> | string,
  footer?: React.ReactNode
}

export const Block = ({title, className, children, footer}: React.PropsWithChildren<BlockProperties>) => (
  <div className={classNameCompiler(className, "block")}>
    {title && (
      <div className="block-header">
      <span>{title}</span>
    </div>
    )}
    {children}
    {footer}
  </div>
);
