import { FunctionComponent, InputHTMLAttributes } from 'react';

const Input: FunctionComponent<
  InputHTMLAttributes<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >
> = props => {
  const classNames = [
    'transition',
    'rounded-lg',
    'dark:bg-zinc-800',
    'dark:placeholder-zinc-400',
    'dark:caret-zinc-400',
    'border-slate-300',
    'dark:border-zinc-700',
    'focus:border-slate-400',
    'shadow',
    'hover:shadow-md',
    'focus:shadow-md',
    'focus:ring-0',
  ].join(' ');

  const { children, className, type, value, ...rest } = props;

  switch (type) {
    case 'select':
      return (
        <select {...props} className={`${classNames} ${className}`}>
          {children}
        </select>
      );

    case 'textarea':
      return (
        <textarea {...props} rows={7} className={`${classNames} ${className}`}>
          {value}
        </textarea>
      );
  }

  return <input {...props} className={`${classNames} ${className}`} />;
};

export default Input;
