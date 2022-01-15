import { FunctionComponent, HTMLAttributes } from 'react';

const Skeleton: FunctionComponent<HTMLAttributes<HTMLDivElement> & { type: 'box' | 'circle' }> = props => {
  if (props.type === 'circle') {
    return <div {...props} className={`animate-pulse h-6 w-full bg-slate-200 rounded-full ${props.className}`}></div>;
  }
  return <div {...props} className={`animate-pulse h-6 w-full bg-slate-200 rounded-2xl ${props.className}`}></div>;
};

export default Skeleton;
