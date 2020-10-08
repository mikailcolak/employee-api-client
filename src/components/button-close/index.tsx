import React from 'react';
import { classNameCompiler } from '../../utils';
import './button-close.css';


export const ButtonClose = ({className, ...props}: React.PropsWithChildren<any>) => {
  return <button className={classNameCompiler(className, "button-close")} {...props} />;
}
