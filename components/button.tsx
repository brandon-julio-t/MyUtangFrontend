import { ButtonHTMLAttributes, FunctionComponent } from 'react';
import { If, Then } from 'react-if';

interface Props {
  isLoading?: boolean;
}

const Button: FunctionComponent<ButtonHTMLAttributes<HTMLButtonElement> & Props> = props => {
  const { children, isLoading, ...rest } = props;

  return (
    <button
      {...rest}
      className={`flex justify-center items-center transition bg-slate-900 dark:bg-zinc-200 hover:bg-slate-800 dark:hover:bg-zinc-100 focus:bg-slate-800 dark:focus:bg-zinc-100 outline-0 active:bg-slate-700 dark:active:bg-zinc-50 text-white dark:text-black rounded px-4 py-2 shadow hover:shadow-md focus:shadow-md active:shadow-lg ${props.children}`}
      disabled={isLoading}
    >
      <If condition={isLoading}>
        <Then>
          <svg
            className="animate-spin mr-3 h-5 w-5 text-white dark:text-black"
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
  );
};

export default Button;
