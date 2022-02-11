import { FunctionComponent, HTMLAttributes } from 'react';

const Skeleton: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={`h-6 w-full animate-pulse rounded-2xl bg-slate-200 ${className}`}></div>
  );
};

export default Skeleton;
