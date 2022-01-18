import { FunctionComponent, HTMLAttributes } from 'react';

const Skeleton: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({ className, ...rest }) => {
  return <div {...rest} className={`animate-pulse h-6 w-full bg-slate-200 rounded-2xl ${className}`}></div>;
};

export default Skeleton;
