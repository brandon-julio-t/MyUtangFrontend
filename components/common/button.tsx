import { IconName } from '../../types/hero-icon-name';
import LoadingIcon from './loading-icon';
import dynamic from 'next/dynamic';
import {
  ButtonHTMLAttributes,
  ComponentProps,
  ComponentType,
  FunctionComponent,
} from 'react';
import { Else, If, Then } from 'react-if';

interface Props {
  isLoading?: boolean;
  styleType?: 'primary' | 'danger';
  iconName?: IconName;
  iconType?: 'solid' | 'outline';
}

const Button: FunctionComponent<
  ButtonHTMLAttributes<HTMLButtonElement> & Props
> = ({
  children,
  className,
  isLoading,
  styleType,
  iconName,
  iconType,
  onClick,
  ...rest
}) => {
  const isPrimary = !styleType || styleType === 'primary';

  let Icon: ComponentType<ComponentProps<'svg'>> = () => <></>;
  if (iconName) {
    Icon =
      iconType === 'outline'
        ? dynamic(() =>
            import('@heroicons/react/outline').then(mod => mod[iconName])
          )
        : dynamic(() =>
            import('@heroicons/react/solid').then(mod => mod[iconName])
          );
  }

  return (
    <button
      {...rest}
      className={[
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

        isPrimary ? 'bg-white' : 'bg-red-50',
        isPrimary ? 'dark:bg-zinc-700' : 'dark:bg-red-700',
        isPrimary ? 'dark:hover:bg-zinc-600' : 'dark:hover:bg-red-600',
        isPrimary ? 'dark:focus:bg-zinc-600' : 'dark:focus:bg-red-600',
        isPrimary ? 'dark:active:bg-zinc-500' : 'dark:active:bg-red-500',
        isPrimary ? 'dark:border-zinc-700' : 'dark:border-red-700',
        isPrimary ? 'hover:bg-slate-50' : 'hover:bg-red-100',
        isPrimary ? 'focus:bg-slate-50' : 'focus:bg-red-100',
        isPrimary ? 'active:bg-slate-100' : 'active:bg-red-200',
        isPrimary ? 'border-slate-300' : 'border-red-300',
        isPrimary ? 'focus:border-slate-400' : 'focus:border-red-400',

        isLoading ? 'animate-pulse' : '',
        className,
      ].join(' ')}
      disabled={isLoading}
      onClick={e => {
        e.stopPropagation();
        if (onClick) onClick(e);
      }}>
      <If condition={iconName}>
        <Then>
          <If condition={isLoading}>
            <Then>
              <LoadingIcon className='mr-2 h-5 w-5' />
            </Then>
            <Else>
              <Icon className='mr-2 h-5 w-5' />
            </Else>
          </If>
        </Then>
      </If>
      {children}
    </button>
  );
};

export default Button;
