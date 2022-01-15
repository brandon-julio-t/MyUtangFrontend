import Link from 'next/link';
import { ButtonHTMLAttributes, FunctionComponent } from 'react';
import { Else, If, Then } from 'react-if';

interface Props {
  href?: string;
  isLoading?: boolean;
  styleType?: 'primary' | 'danger';
}

const Button: FunctionComponent<ButtonHTMLAttributes<HTMLButtonElement> & Props> = props => {
  const { children, className, href, isLoading, styleType, ...rest } = props;

  let classNamesCollection = [
    'flex',
    'justify-center',
    'items-center',
    'transition',
    'bg-locations',
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
        <button {...rest} className={`${classNames} ${className}`} disabled={isLoading}>
          <If condition={isLoading}>
            <Then>
              <svg
                className="animate-spin mr-3 h-5 w-5 text-black dark:text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </Then>
          </If>
          {children}
        </button>
      </Else>
    </If>
  );
};

export default Button;
