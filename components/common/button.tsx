import Link from 'next/link';
import { ButtonHTMLAttributes, FunctionComponent } from 'react';
import { Else, If, Then } from 'react-if';

interface Props {
  href?: string;
  isLoading?: boolean;
  styleType?: 'primary' | 'danger';
}

const Button: FunctionComponent<ButtonHTMLAttributes<HTMLButtonElement> & Props> = props => {
  const { children, className, href, isLoading, styleType, onClick, ...rest } = props;

  let classNamesCollection = [
    'flex',
    'justify-center',
    'items-center',
    'transition',
    'cursor-pointer',
    'outline-0',
    'border',
    'rounded',
    'px-4',
    'py-2',
    'shadow',
    'hover:shadow-md',
    'focus:shadow-md',
    'active:shadow-lg',
  ];

  if (!styleType || styleType === 'primary') {
    classNamesCollection = [
      ...classNamesCollection,
      'bg-white',
      'dark:bg-zinc-700',
      'dark:hover:bg-zinc-600',
      'dark:focus:bg-zinc-600',
      'dark:active:bg-zinc-500',
      'dark:border-zinc-700',
      'hover:bg-slate-50',
      'focus:bg-slate-50',
      'active:bg-slate-100',
      'border-slate-300',
      'focus:border-slate-400',
    ];
  } else {
    classNamesCollection = [
      ...classNamesCollection,
      'bg-red-50',
      'dark:bg-red-700',
      'dark:hover:bg-red-600',
      'dark:focus:bg-red-600',
      'dark:active:bg-red-500',
      'dark:border-red-700',
      'hover:bg-red-100',
      'focus:bg-red-100',
      'active:bg-red-200',
      'border-red-300',
      'focus:border-red-400',
    ];
  }

  const classNames = classNamesCollection.join(' ');

  return (
    <If condition={href}>
      <Then>
        <Link {...rest} href={href ?? ''} passHref>
          <a href={href} className={`${classNames} ${className}`}>
            {children}
          </a>
        </Link>
      </Then>
      <Else>
        <button
          {...rest}
          className={`${classNames} ${className} ${isLoading ? 'animate-pulse' : ''}`}
          disabled={isLoading}
          onClick={e => {
            e.stopPropagation();
            if (onClick) onClick(e);
          }}
        >
          {children}
        </button>
      </Else>
    </If>
  );
};

export default Button;
