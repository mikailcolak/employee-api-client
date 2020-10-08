import React from 'react';
import { classNameCompiler } from '../../utils';
import './button-delete.css';


export const ButtonDelete = ({className, ...props}: React.PropsWithChildren<any>) => {
  return <button className={classNameCompiler(className, "button-delete")} {...props} />;
}
