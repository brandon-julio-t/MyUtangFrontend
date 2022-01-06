import { FunctionComponent, InputHTMLAttributes } from 'react';

const Input: FunctionComponent<InputHTMLAttributes<HTMLInputElement>> = props => {
  return (
    <input
      {...props}
      className={`transition rounded dark:bg-zinc-800 dark:placeholder-zinc-400 dark:caret-zinc-400 dark:text-white border-slate-300 dark:border-zinc-700 focus:border-slate-400 shadow hover:shadow-md focus:shadow-md focus:ring-0 ${props.className}`}
    />
  );
};

export default Input;
