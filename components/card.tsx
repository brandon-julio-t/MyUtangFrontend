import { FunctionComponent, HTMLAttributes } from 'react';

const Card: FunctionComponent<HTMLAttributes<HTMLDivElement>> = props => {
  return (
    <div {...props} className={`transition border bg-white dark:bg-zinc-800 border-slate-300 dark:border-zinc-700 rounded-2xl p-6 shadow hover:shadow-md ${props.className}`}>
      {props.children}
    </div>
  );
};

export default Card;
