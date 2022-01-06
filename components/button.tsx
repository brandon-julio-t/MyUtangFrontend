import { ButtonHTMLAttributes, FunctionComponent } from 'react';

const Button: FunctionComponent<ButtonHTMLAttributes<HTMLButtonElement>> = props => {
  return (
    <button
      {...props}
      className={`transition bg-slate-900 dark:bg-slate-200 hover:bg-slate-800 dark:hover:bg-slate-100 focus:bg-slate-800 dark:focus:bg-slate-100 outline-0 active:bg-slate-700 dark:active:bg-slate-50 text-white dark:text-black rounded px-4 py-2 shadow hover:shadow-md focus:shadow-md active:shadow-lg ${props.children}`}
    >
      {props.children}
    </button>
  );
};

export default Button;